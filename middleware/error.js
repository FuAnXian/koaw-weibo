/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-08 09:28:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-11 14:17:40
 */

const { ModelError } = require("../routes/model/Response");

//错误
const middlewareError = async (ctx, next) => {

  //判断是否api
  let isApi = ctx.url.indexOf("/api") > -1;

  try {
    await next()
  } catch (err) {
    //处理异常
    ctx.response.status = err.statusCode || err.status || 500;
    if(isApi){
      ctx.body = new ModelError({data:err,msg:"服务器出现问题！"})
    }else{
      await ctx.render("template/error", {
        msg: err
      })
    }
  }

  //处理404
  if(ctx.status === 404){
    if(isApi){
        ctx.body = new ModelError({msg:"对不起！此接口地址不存在"})
    }else{
      await ctx.render("template/404", {
        msg: ""
      })
    }  
  }
  
  if(ctx.status === 500){
    if(isApi){
       ctx.body = new ModelError({data:ctx.response.message,msg:"服务器出现错误！"})
    }else{
      await ctx.render("template/error", {
        msg: ctx.response.message
      })
    }
  }
}



module.exports = {
  middlewareError,
}
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-08 09:28:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 16:54:48
 */

//错误
const middlewareError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    //处理异常
    ctx.response.status = err.statusCode || err.status || 500;
    await ctx.render("template/error", {
      msg: err
    })
  }
  
  //处理404
  if(ctx.status === 404){
    await ctx.render("template/404", {
      msg: ""
    })
  }
  
  if(ctx.status === 500){
    await ctx.render("template/error", {
      msg: ctx.response.message
    })
  }
}



module.exports = {
  middlewareError,
}
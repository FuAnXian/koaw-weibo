const {ModelError} = require("../routes/model/Response");

//排除登录和注册页校验
const exclude = ["/login","/register","/isExistUser"];

/**
 * 检查api接口是否登录
 * @param {object} ctx 
 * @param {function} next 
 */
const apiLoginCheck = async (ctx,next)=>{

  let length = ctx.url.indexOf("?");
  let url = length != -1 ? ctx.url.substring(0,length) : ctx.url;

  url = url.replace("/api/users","")

  if(exclude.includes(url) || ctx.session.userInfo){
    await next()
  }else{
    ctx.body = new ModelError({msg:"您还未登录！"})
  }
}

/**
 * 检查页面跳转是否登录
 * @param {object} ctx 
 * @param {function} next 
 */
const viewLoginCheck= async (ctx,next)=>{
  let length = ctx.url.indexOf("?");
  let url = length != -1 ? ctx.url.substring(0,length) : ctx.url;
  if(exclude.includes(url) || ctx.session.userInfo){
    await next()
  }else{
    ctx.redirect("/login")
  }
};

module.exports = {
  apiLoginCheck,
  viewLoginCheck
}
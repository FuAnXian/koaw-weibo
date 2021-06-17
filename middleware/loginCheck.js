/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-11 09:06:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-17 13:57:39
 */
const {ModelError} = require("../routes/model/Response");

//排除登录和注册页校验
const Apiexclude = ["/api/users/login","/api/users/register","/api/users/isExistUser"];
const viewexclude = ["/login","/register","/isExistUser","/detail"];


/**
 * 检查api接口是否登录
 * @param {object} ctx 
 * @param {function} next 
 */
const apiLoginCheck = async (ctx,next)=>{
  let length = ctx.url.indexOf("?");
  let url = length != -1 ? ctx.url.substring(0,length) : ctx.url;
  if(Apiexclude.includes(url) || ctx.session.userInfo){
    await next()
  }else{
    ctx.body = new ModelError({msg:"您还未登录！",code:0})
  }
}

/**
 * 检查页面跳转是否登录
 * @param {object} ctx 
 * @param {function} next 
 */
const viewLoginCheck = async (ctx,next)=>{
  console.log(new Date().toTimeString(),ctx.url,ctx.session.userInfo)
   await next();
};

module.exports = {
  apiLoginCheck,
  viewLoginCheck
}
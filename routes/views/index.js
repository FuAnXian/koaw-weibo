/*
 * @Descripttion: 用户页面路由
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-11 15:50:21
 */


const router = require('koa-router')();
const {viewLoginCheck} = require("../../middleware/loginCheck");
const citys = require("../../dataJson/city");
const {
  registerUser,
  isExistUser
}  = require("../../contorller/users");

//登录校验
router.use("/",viewLoginCheck);

router.get('/',async (ctx, next)=> {
  await ctx.render("index",{})
})

router.get('/login', async (ctx, next)=> {
  await ctx.render("views/login",{})
})

router.get('/register', async (ctx, next)=> {
  await ctx.render("views/register",{})
})

router.get('/userInfo', async (ctx, next)=> {
  console.log(ctx.session.userInfo)
  await ctx.render("views/userInfo",{
    userInfo:ctx.session.userInfo || false,
    citys,
    genders:["男","女","保密"]
  })
})


module.exports = router

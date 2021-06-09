/*
 * @Descripttion: 用户页面路由
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 10:37:38
 */


const router = require('koa-router')()
const {
  registerUser,
  isExistUser
}  = require("../../contorller/users");



router.get('/login', async (ctx, next)=> {
  await ctx.render("views/login",{})
})

router.get('/register', async (ctx, next)=> {
  await ctx.render("views/register",{})
})

module.exports = router

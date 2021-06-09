/*
 * @Descripttion: 用户api路由
 * @Author: fax
 * @Date: 2021-06-09 10:26:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 17:23:03
 */

const router = require('koa-router')()
const {
  registerUser,
  isExistUser
}  = require("../../contorller/users");

router.prefix("/api/users")

//登录
router.post('/login', async (ctx, next)=> {
  let {userName,password} = ctx.request.body;
  await ctx.render("views/login",{})
})

//注册
router.post('/register', async (ctx, next)=> {
  const data = ctx.request.body;
  console.log(data)
  ctx.body = await registerUser(data);
})

//用户是否存在
router.post('/isExistUser', async (ctx, next)=> {
    let {userName} = ctx.request.body;
    console.log(ctx.request.body)
    
    ctx.body = await isExistUser(userName);
  })

module.exports = router

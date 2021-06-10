/*
 * @Descripttion: 用户api路由
 * @Author: fax
 * @Date: 2021-06-09 10:26:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-10 16:49:44
 */

const router = require('koa-router')();
const {decrypt,encrypto} = require("../../utils/encrypt");
const {apiLoginCheck} = require("../../middleware/loginCheck")
const {
  registerUser,
  isExistUser,
  userLogin
}  = require("../../contorller/users");

router.prefix("/api/users")

//加密密码
router.use("/",apiLoginCheck,async(ctx,next)=>{
  let password = ctx.request.body.password
  if(password){
    ctx.request.body.password = encrypto(password)
  }
  await next()
})

//登录
router.post('/login', async (ctx, next)=> {
  let {userName,password} = ctx.request.body;
  ctx.body = await userLogin(ctx,userName,password);
})

//注册
router.post('/register', async (ctx, next)=> {
  const data = ctx.request.body;
  ctx.body = await registerUser(data);
})

//用户是否存在
router.post('/isExistUser', async (ctx, next)=> {
    let {userName} = ctx.request.body;
    ctx.body = await isExistUser(userName);
})

//退出登录
router.post("/signOut",async (ctx,next)=>{
      
})

//编辑用户
router.post("/updateUser",async (ctx,next)=>{
      
})

module.exports = router

/*
 * @Descripttion: 用户页面路由
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-11 15:50:21
 */


const router = require('koa-router')();
const { viewLoginCheck } = require("../../middleware/loginCheck");
const citys = require("../../dataJson/city");
const {createdTime} = require("../../utils/time")
const {
  registerUser,
  isExistUser
} = require("../../contorller/users");
const {
  getBlogs,
  getAllBlogs,
  getCountBlogs
} = require("../../contorller/blogs")

//登录校验
router.use("/", viewLoginCheck);

router.get('/', async (ctx, next) => {
  let {data} = await getAllBlogs({
    where: {},
  });
  data = data.map(item => item.dataValues);
  data.map(item => {
   item.createdAt =  createdTime(item.createdAt)
  })
  await ctx.render("index", {
    data
  })
})

router.get('/login', async (ctx, next) => {
  await ctx.render("views/login", {})
})

router.get('/register', async (ctx, next) => {
  await ctx.render("views/register", {})
})

router.get('/userInfo', async (ctx, next) => {
  console.log(ctx.session.userInfo)
  await ctx.render("views/userInfo", {
    userInfo: ctx.session.userInfo || false,
    citys,
    genders: ["男", "女", "保密"]
  })
})

//关注
router.get('/article', async (ctx, next) => {
  console.log(ctx.session.userInfo)
  await ctx.render("views/article", {
    userInfo: ctx.session.userInfo || false,
  })
})

//创造
router.get('/creation', async (ctx, next) => {
  await ctx.render("views/creation", {
    userInfo: ctx.session.userInfo || false,
  })
})

//详情
router.get("/detail/:id",async (ctx,next)=>{
  const id = ctx.params.id;

  let {data} = await getBlogs(id);

  let content = data.dataValues;
  content.count = await  getCountBlogs(content.userInfo.id);

  content.createdAt = createdTime(content.createdAt);
  
  // ctx.body = content
  await ctx.render("views/detail",{
    data:content
  })
})



module.exports = router

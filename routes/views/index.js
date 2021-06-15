/*
 * @Descripttion: 用户页面路由
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-15 17:07:40
 */


const router = require('koa-router')();
const { viewLoginCheck } = require("../../middleware/loginCheck");
const citys = require("../../dataJson/city");
const {createdTime} = require("../../utils/time")
const {formattingPage} = require("../../utils/paging")
const {
  getBlogs,
  getAllBlogs,
  getCountBlogs
} = require("../../contorller/blogs")

//登录校验
router.use("/", viewLoginCheck);

router.get('/', async (ctx, next) => {
  const {pageIndex}  = ctx.query;

  let {data} = await getAllBlogs({
    where: {},
    offset:0,
    limit:10
  });
  console.log(pageIndex)
  let page = formattingPage({
    count:data.count,
    limit:10,
    pageNum:5,
    current:pageIndex*1
  });
  
  console.log(page)
  
  await ctx.render("index", {
    data:data.rows,
    page
  })
})

router.get('/login', async (ctx, next) => {
  await ctx.render("views/login", {})
})

router.get('/register', async (ctx, next) => {
  await ctx.render("views/register", {})
})

router.get('/userInfo', async (ctx, next) => {
  await ctx.render("views/userInfo", {
    userInfo: ctx.session.userInfo || false,
    citys,
    genders: ["男", "女", "保密"]
  })
})

//关注
router.get('/article', async (ctx, next) => {
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
    data:content,
  })
})



module.exports = router

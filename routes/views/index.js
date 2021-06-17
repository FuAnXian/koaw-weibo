/*
 * @Descripttion: 用户页面路由
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-16 18:16:00
 */


const router = require('koa-router')();
const citys = require("../../dataJson/city");
const {createdTime} = require("../../utils/time")
const {formattingPage} = require("../../utils/paging")
const {
  getBlogs,
  getAllBlogs,
  getCountBlogs
} = require("../../contorller/blogs")



router.get('/', async (ctx, next) => {
  const pageIndex  = ctx.query.pageIndex || 1;
  const limit = 5;
  let {data} = await getAllBlogs({
    where: {},
    offset:(pageIndex -1) * limit,
    limit
  });
  let page = formattingPage({
    count:data.count,
    limit,
    pageNum:5,
    current:pageIndex*1
  });
  
  await ctx.render("index", {
    data:data.rows.map(item =>{item.createdAt = createdTime(item.createdAt);return item}  ),
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
  const id = ctx.params.id.match(/\d+/)[0];
  let {data} = await getBlogs(id);
  let content = data.dataValues;
  content.count = await  getCountBlogs(content.userInfo.id);
  content.createdAt = createdTime(content.createdAt);
  await ctx.render("views/detail",{
    data:content,
  })
})



module.exports = router

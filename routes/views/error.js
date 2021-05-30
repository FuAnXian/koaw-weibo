const router = require("koa-router")();

//错误页
router.get("/error",async (ctx,next)=>{
  await ctx.render("template/error",{
    error:e
  })
})

//404页 (放在路由注册最后面，这样前面都没有匹配到就是404了)
router.get("*",async (ctx,next)=>{
  await ctx.render('template/404', {
    title: 'Hello Koa 2! 你的页面被外星人偷走了！'
  })
})

module.exports = router;
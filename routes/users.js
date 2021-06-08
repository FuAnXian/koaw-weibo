const router = require('koa-router')()




//用户相关页面
router.get('/login', async (ctx, next)=> {
  await ctx.render("views/login",{})
})

router.get('/register', async (ctx, next)=> {
  await ctx.render("views/register",{})
})

module.exports = router

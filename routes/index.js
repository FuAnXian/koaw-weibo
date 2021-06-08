const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  let num = ++ctx.session.num || 0 
  console.log(ctx.session)
  console.log(ctx.cookie)
  ctx.body = 'koa2 string'+ num

})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json get'
  }
})

router.post('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json post'
  }
})

module.exports = router

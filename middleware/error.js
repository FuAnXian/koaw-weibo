
//错误
const middlewareError  = async (ctx,next)=>{
  try{
    await next()
  }catch(e){
    await ctx.render("template/error",{
      error:e
    })
  }
}

//404页面
const middleware404  = async (ctx,next)=>{
    await next()
    if(ctx.status === 404){
      await ctx.render('template/404', {
        title: 'Hello Koa 2!'
      })
    }
}

module.exports = {
  middlewareError,
  middleware404
}
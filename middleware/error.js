
//错误
const middlewareError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    //处理异常
    ctx.response.status = err.statusCode || err.status || 500;
    await ctx.render("template/error", {
      msg: err
    })
  }
  
  //处理404
  if(ctx.status === 404){
    await ctx.render("template/404", {
      msg: ""
    })
  }
}



module.exports = {
  middlewareError,
}
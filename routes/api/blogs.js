const router = require("koa-router")();

const {
  createdBlogs
} = require("../../contorller/blogs");
router.prefix("/api/blogs");

router.post("/created",async (ctx,next)=>{
  let body = ctx.request.body;
  body.userId = ctx.session.userInfo.id;
  ctx.body = await createdBlogs(body);
})

module.exports = router
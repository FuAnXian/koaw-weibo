const {
 createComments
} = require("../../contorller/comments");
const router = require("koa-router")();

router.prefix("/api/comments");

router.post("/created",async (ctx,next)=>{
   const {id,userName,proFile} = ctx.session.userInfo;
   let body =  ctx.request.body;
   body.userId = id;
   body.userName = userName
   body.proFile = proFile;
  ctx.body = await createComments(body);
})

module.exports = router;

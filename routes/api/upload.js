/*
 * @Descripttion: 上传文件
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-11 14:02:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-11 14:45:16
 */

const router = require("koa-router")();
const {ModelSuccess,ModelError} = require("../model/Response")
const {uploadsFlie} = require("../../middleware/upload");

router.post("/api/uploads",uploadsFlie(),async(ctx,next)=>{
    const files = ctx.request.files.file;
    if(files){
        ctx.body = new ModelSuccess({msg:"上传成功",data:files.currentPath})
    }else{
        ctx.body = new ModelError({msg:"上传失败",data:files||""})
    }
   
})

module.exports = router
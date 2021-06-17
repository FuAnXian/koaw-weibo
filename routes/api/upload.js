/*
 * @Descripttion: 上传文件
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-11 14:02:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-17 13:39:07
 */

const router = require("koa-router")();
const { ModelSuccess, ModelError } = require("../model/Response")
const { uploadsFlie } = require("../../middleware/upload");


//通用上传文件
router.post("/api/uploads", uploadsFlie(), async (ctx, next) => {
    const files = ctx.request.files.file;
    if (files) {
        ctx.body = new ModelSuccess({ msg: "上传成功", data: files.currentPath })
    } else {
        ctx.body = new ModelError({ msg: "上传失败", data: files || "" })
    }
})

//富文本上传文件
router.post("/api/editorUpload", uploadsFlie(), async (ctx, next) => {
    const files = ctx.request.files;
    const data = Object.keys(ctx.request.files).map(item => {
       return {
            url: files[item].currentPath,
            alt: files[item].name,
            href: "https://www.baidu.com"
        };
    });
    console.log(data)
    if (data.length) {
        ctx.body = {
            errno: 0,
            data: data,
            code: 1
        }
    } else {
        ctx.body = {
            code: -1,
            error: -1,
            msg: "传失败"
        }
    }
})
module.exports = router
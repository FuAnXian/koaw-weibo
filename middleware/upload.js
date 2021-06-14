/*
 * @Descripttion: 上传文件
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-10 10:47:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-11 14:23:09
 */
const koaBody = require("koa-body");
const fs = require("fs");
const path = require("path");
const uuid = require("node-uuid")
const filePath = path.resolve(__dirname, "../public/uploads");
const {
  static
} = require("../config/index")
//不存在则创建
if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath)
};
let fileType = [".gif",".png",".jpg",".jpeg",".tif",".psd"];

/**
 *  获取文件后缀名 
 * @param {string} name 文件名称
 * @return {string} 后缀名
 */
const getUploadFileExt = (name)=>{
    if (typeof name == "string") {
       let suffix = name.substr(name.lastIndexOf("."));
       let is = fileType.includes(suffix.toLocaleLowerCase());
       return is ? suffix : "jpg"
    }
    return name
};


/**
 *  根据文件类型随机生成地址 
 * @param {string} type 文件类型
 * @return {string} 图片地址
 */
const getUploadFileName = (type)=>{
      if(typeof type == "string"){
        return uuid.v1()+type;
      }
      return type
}

const fileConf = {
    multipart: true,
    formidable: {
        uploadDir: filePath,
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        onFileBegin: (name, file) => {
            // 获取文件后缀
            const ext = getUploadFileExt(file.name);
            // 重新覆盖 file.path 属性
            let fliename = getUploadFileName(ext);
            file.path = `${filePath}\\${fliename}`;
            file.currentPath = "/uploads/"+fliename;
        },
        onError: (err) => {
            console.log(err);
        }
    }
};
const uploadsFlie = () => {
    return koaBody(fileConf);
}
module.exports = {
    uploadsFlie
}
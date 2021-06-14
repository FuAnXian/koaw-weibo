const  {Comments} = require("../db/model/index");

const {
  ModelError,
  ModelSuccess,
  ModelSeqError
} = require("../routes/model/Response")
/**
 * 创建评论
 * @param {string} userName 用户昵称 
 * @param {number} userId 用户id
 * @param {string} proFile 用户头像
 * @param {string} text 评论内容 
 * @param {number} blogsId 博客id
 */
const createComments = async ({userName,userId,proFile,text,blogsId})=>{
  try{
    let res = await Comments.create({userName,userId,proFile,text,blogsId});
    return new ModelSuccess({msg:"评论成功",data:res})
  }catch(e){
    return new ModelSeqError(e)
  }
}

module.exports = {
  createComments
}
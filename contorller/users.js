/*
 * @Descripttion: 
 * @version: 
 * @Author: fax
 * @Date: 2021-06-09 09:24:45
 * @LastEditTime: 2021-06-09 17:28:55
 */
const {Users} = require("../db/model/index");
const {ModelError,ModelSuccess} = require("../routes/model/Response");
const {static} = require("../config/index")
const {
    existUser,
    suc
} = require("../routes/model/code");


/**
 *  获取用户信息
 * @param {Object} 查找条件
 * @password {string}   用户密码
 * @nicKname {string}  用户别名
 * @userName {string}  用户姓名
 * @return {Object} 用户信息 | null
 */
const getUserInfo = async({userName,password="",nickName=""})=>{
    return await Users.findOne({
        attributes:{exclude: ['id']},
        where:{userName,password,nickName}
    })
}

/**
 * 是否已经存在相同用户
 * @param {string} userName 用户姓名
 * @return {*}
 */
const isExistUser = async (userName)=>{
  let info = await  getUserInfo({userName})
  if(info){
      return new ModelError(isExistUser);
  }
  console.log("info",info)
  console.log(new ModelSuccess())
  return new ModelSuccess()
};

/**
 * 注册用户
 * @param {object} 用户信息
 * @username {string}  用户名称
 * @password {string}  用户密码
 * @gender {number}  用户性别 1 男，2 女， 3 保密
 * @return {body} ModelSuccess
 */
const registerUser = async({userName,password,gender=3})=>{
   let params = Object.assign({
        proFile:static.PROFLE, //默认头像
   },{userName,password,gender});
   
    try{
        let res = await Users.create(params);
        return new ModelSuccess(suc)
    }catch(e){
        return new ModelError({msg:e})
    }
}

module.exports = {
    isExistUser,
    getUserInfo,
    registerUser
}
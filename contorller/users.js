/*
 * @Descripttion: 
 * @version: 
 * @Author: fax
 * @Date: 2021-06-09 09:24:45
 * @LastEditTime: 2021-06-11 16:58:30
 */
const { Users } = require("../db/model/index");
const { ModelError, ModelSuccess , ModelSeqError} = require("../routes/model/Response");
const { static } = require("../config/index");

/**
 *  获取用户信息
 * @param {Object} 查找条件
 * @password {string}   用户密码
 * @nicKname {string}  用户别名
 * @userName {string}  用户姓名
 * @return {Object} 用户信息 | null
 */
const getUserInfo = async (where) => {
    return await Users.findOne({
        attributes: { exclude: ['password'] },
        where: where,
        raw: true
    })
}

/**
 * 是否已经存在相同用户
 * @param {string} userName 用户姓名
 * @return {*}
 */
const isExistUser = async (userName) => {
    let info = await getUserInfo({ userName })
    if (info) {
        return new ModelError({code:0,msg:"此用户已经存在！"});
    }
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
const registerUser = async ({ userName, password, gender = 3 }) => {
    let params = Object.assign({
        proFile: static.PROFLE, //默认头像
    }, { userName, password, gender });
    try {
        await Users.create(params);
        return new ModelSuccess({ msg: "注册成功！" })
    } catch (e) {          
        return new ModelSeqError(e)
    }
}

/**
 * 用户登录
 * @ctx {Object} 中间件上下文
 * @userName {string} 用户账号
 * @password {string} 用户密码
 */
const userLogin = async (ctx, userName, password) => {
    if (userName == "" && password == "") {
        return new ModelError({ msg: userName ? "密码不能为空" : "账号不能为空" });
    }
    let info = await getUserInfo({ userName, password });
   
    if (info != null) {
        ctx.session.userInfo = info;
        return new ModelSuccess({ msg: "登录成功" ,data:info.proFile})
    }
    return new ModelError({ msg: "账号或密码不正确！" });
}


/**
 * 修改用户信息
 * @param {object} ctx 上下文对象 
 * @param {string} userName 用户账号
 * @param {string} nickName 用户昵称
 * @param {Number} gender 用户性别
 * @param {string} proFile 用户头像
 * @param {string} city 用户城市
 * @param {string} password 用户密码
 */
 const updateUserInfo = async (ctx,{userName,nickName,gender,proFile,city,password})=>{
     let data = {
        userName,
        nickName,
        gender:+gender,
        proFile,
        city,
        password
      };

    if(userName == "" || !userName){
      return new ModelError({msg:"账号不能为空！"})
    };
    
    //密码为空则不修改
    if(!password || password==""){
      delete data.password
    };

    if(city == "" || !city){
        delete data.city
    }
    
    try{
       await Users.update(data,{
            where:{id:ctx.session.userInfo.id}
        })
        ctx.session.userInfo = await getUserInfo({userName});
        return new ModelSuccess({msg:"修改成功！",data:proFile})
    }catch(e){
      return new ModelSeqError(e)
    }
  };
  
  //退出登录
  const signOut = (ctx)=>{
      ctx.session.userInfo = null;
      return new ModelSuccess({
          msg:"退出成功"
      })
  };
module.exports = {
    isExistUser,
    getUserInfo,
    registerUser,
    userLogin,
    updateUserInfo,
    signOut
}
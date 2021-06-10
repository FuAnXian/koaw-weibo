/*
 * @Descripttion: 
 * @version: 
 * @Author: fax
 * @Date: 2021-06-09 09:24:45
 * @LastEditTime: 2021-06-10 17:03:36
 */
const { Users } = require("../db/model/index");
const { ModelError, ModelSuccess , ModelSeqError} = require("../routes/model/Response");
const { static } = require("../config/index")
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
        return new ModelError(isExistUser);
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
        let res = await Users.create(params);
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
        return new ModelSuccess({ msg: "登录成功" })
    }
    return new ModelError({ msg: "账号或密码不正确！" });
}

/**
 * 修改用户信息
 * @param {object} 修改内容
 * @return {*} Model
 */
const updateUser = async (params) => {
    if (typeof params == "object" && !params.id) {
        try {
            await Users.update(params, {
                where: {
                    id: params.id
                }
            })
            return new ModelSuccess({msg:"编辑成功！"})
        } catch (e) {
            return new ModelSeqError(e)
        }
    } else {
        return new ModelError({ msg: "缺少参数！" })
    }
}
module.exports = {
    isExistUser,
    getUserInfo,
    registerUser,
    userLogin,
    updateUser
}
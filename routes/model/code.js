/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-09 09:26:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 10:07:03
 */

module.exports = {
    suc: {
        code: 1000,
        msg: "成功"
    },
    fail: {
        code: 1001,
        msg: "失败"
    },
    eor: {
        code: -1,
        msg: "发生错误"
    },
    existUser:{
        code:1002,
        msg:"用户已存在"
    },
    registerFail:{
        code:1003,
        msg:"注册失败"
    },
    loginFail:{
        code:1004,
        msg:"登录失败"
    },
    articleFail:{
        code:1005,
        msg:"发布文章失败"
    }
}
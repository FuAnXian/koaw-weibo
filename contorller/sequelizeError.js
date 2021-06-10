/*
 * @Descripttion: sequlize 验证错误
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-10 11:43:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-10 14:43:00
 */
const { ModelError } = require("../routes/model/Response");
const {
    ValidationError,
    DatabaseError,
    TimeoutError,
    UniqueConstraintError,
    ConnectionRefusedError,
    AccessDeniedError,
    Sequelize
} = require("sequelize")



/**
 * 处理sequlize错误对象 
 * @param {object} e 错误对象
 * @return {*}
 */
const sequlizeError = (e) => {

    let msg = e.errors ? (e.errors[0] ? e.errors[0].message : (e.name || "出现未知错误！")) : e;

    if(e  instanceof UniqueConstraintError){
        return new ModelError({msg:"此用户已存在！"})
    }
    return new ModelError({msg})
}
module.exports = {
    sequlizeError
}
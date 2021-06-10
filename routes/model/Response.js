/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-10 17:00:02
 */
const {
  ValidationError,
  DatabaseError,
  TimeoutError,
  UniqueConstraintError,
  ConnectionRefusedError,
  AccessDeniedError,
} = require("sequelize")
class BaseModel {
  constructor({data="",code=1,msg=""})
  {
      this.data = data;
      this.code = code,
      this.msg = msg;
  }
}

class ModelSuccess extends BaseModel{
  constructor(obj={}){
   let params = Object.assign({
      code:1,
      data:"",
      msg: "获取成功"
    },obj);
    super(params);
  }
}

class ModelError extends BaseModel{
  constructor(obj={}){
   let params = Object.assign({
    code:-1,
    data:"",
    msg: "获取失败"
  },obj);
    super(params);
  }
}





/**
 * 处理sequlize错误对象 
 * @param {object} e 错误对象
 * @return {*}
 */
class ModelSeqError extends BaseModel{
  constructor(e){
    let msg = e.errors ? (e.errors[0] ? e.errors[0].message : (e.name || "出现未知错误！")) : e;
    if(e  instanceof UniqueConstraintError){
        return new ModelError({msg:"此用户已存在！"})
    }
   super({msg,code:-1,data:""})
  }
}

module.exports = {
  ModelError,
  ModelSuccess,
  ModelSeqError
}
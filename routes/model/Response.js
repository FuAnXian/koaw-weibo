/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 17:35:15
 */



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

module.exports = {
  ModelError,
  ModelSuccess
}
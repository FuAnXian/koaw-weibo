
const codes = {
  1:"获取成功",
  0:"出现错误"
}

class BaseModel {
  constructor(data=null,code=1,msg="")
  {
      this.data = data;
      this.code = code,
      this.msg = msg;
  }
}

class ModelSuccess extends BaseModel{
  constructor(data,code,msg = "获取成功"){
    super(data,code,msg);
  }
}

class ModelError extends BaseModel{
  constructor(data,code,msg = "获取失败"){
    super(data,code,msg);
  }
}

module.exports = {
  ModelError,
  ModelSuccess
}
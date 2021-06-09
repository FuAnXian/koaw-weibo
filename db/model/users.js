/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 17:24:58
 */
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../db");

class Users extends Model {}


Users.init({
  //定义字段
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate:{
      len:[2,20]
    },
    comment:"用户名称 (唯一)"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      is:/^\w{6,16}/i
    },
    comment:"用户密码"
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: true,
    comment:"别名",
    validate:{
      len:[2,20]
    }
  },
  gender:{
    type:DataTypes.DECIMAL(10,0),
    defaultValue:3,
    allowNull:true,
    comment:"用户性别",
    validate:{
      max:10,
      min:0
    }
  },
  proFile:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"用户头像"
  },
  city:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"用户城市",
    validate:{
      len:[2]
    }
  }
}, {
  sequelize,
  tableName: "users" //数据表名
})

module.exports = Users;
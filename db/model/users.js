/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-10 14:43:26
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
      len:{
        args:[2,20],
        msg:"请输入2到20位数的账号"
      },
      notNull: {
        msg: '请输入你的账号'
      },
    },
    comment:"用户名称 (唯一)"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      is:{
        args:[/[0-9a-zA-z]{6,16}/],
        msg:"请输入6到16数字或者字母的密码"
      },
      notNull: {
        msg: '请输入你的密码'
      }
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
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../db");

class Users extends Model { }

Users.init({
  //定义字段
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    comment:"用户名称 (唯一)"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:"用户密码"
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: true,
    comment:"别名"
  },
  gender:{
    type:DataTypes.DECIMAL(10,0),
    defaultValue:3,
    allowNull:true,
    comment:"用户性别"
  },
  proFile:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"用户头像"
  },
  city:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"用户城市"
  }
}, {
  sequelize,
  tableName: "users" //数据表名
})

module.exports = Users;
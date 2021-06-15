/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-15 09:58:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-15 10:28:22
 */
const sequelize = require("../db");
const {createdTime} = require("../../utils/time")
const {Model,DataTypes} = require("sequelize");
const { model } = require("../db");

class Blogs extends Model{}

Blogs.init({
   contentText:{
     type:DataTypes.STRING(350),
     allowNull:false,
     comment:"博客内容文字"
   },
   contentHtml:{
    type:DataTypes.TEXT,
    allowNull:false,
    comment:"博客内容html"
   },
   image:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"博客图片"
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:"标题"
  },
  userId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    comment:"创建用户id"
  },
  createdAt:{
    type:DataTypes.DATE,
    get(){
      let time = this.getDataValue("createdAt");
      return createdTime(time)
    }
  }
},{
  sequelize
})

module.exports = Blogs
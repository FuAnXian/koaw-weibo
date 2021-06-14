/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 11:00:40
 */
const Users = require("./users");
const Blogs = require("./blogs");
const Comments = require("./comment");

const sequelize = require("../db");

//外键关联
Blogs.belongsTo(Users,{
  foreignKey:"userId",
  as:"userInfo"
})

//外键关联
Blogs.hasMany(Comments,{
    foreignKey:"blogsId",
    as:"comments"
  })

Comments.belongsTo(Blogs,{
    foreignKey:"blogsId",
    as:"comments"
})

//同步表
!(async ()=>{
    await sequelize.sync({
        force:false
    })
})()

module.exports = {
    Users,
    Comments,
    Blogs
}
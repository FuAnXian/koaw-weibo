/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-09 08:59:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 11:00:40
 */
const Users = require("./users");
const sequelize = require("../db");


//同步表
!(async ()=>{
    await sequelize.sync({
        force:true
    })
})()

module.exports = {
    Users
}
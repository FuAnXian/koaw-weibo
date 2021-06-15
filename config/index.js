/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-08 09:28:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-15 15:00:16
 */

const isProdcution = process.env.NODE_ENV == 'production';

let MYSQL = {
  password: "329285015",
  user: "fax",
  database: "koa2weibo",
  conf: {
    dialectOptions:{ //时间格式化
        dateStrings: true,
        typeCast: true
    },
    timezone: '+08:00', //改为标准时区
    host: "localhost",
    dialect: "mysql",// 数据库类型,
    logging:(log)=>{
      
    } //不打印sql语句日志
  }
};
let REDIS = {
  port:6379,
  host:"127.0.0.1",
  expire: 1000 * 60 *60 *24
};

let static = {
  CRYPTOKEY:"SD%$DSDS_())DDSSD!",
  PROFLE:"/img/touxiang.jpg",
  HOST:"127.0.0.1:3000"
};
//生产环境
if (isProdcution) {
  MYSQL.conf = {
    host: "https://haihai.xyz", //主机
    dialect: "mysql",// 数据库类型,
    //连接池 
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  };
  static.HOST = "https://haihai.xyz"
}


module.exports = {
  MYSQL,
  REDIS,
  isProdcution,
  static
}
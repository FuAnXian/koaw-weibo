
const isProdcution = process.env.NODE_ENV == 'production';

let MYSQL = {
  password: "329285015",
  user: "fax",
  database: "koa2-weibo",
  conf: {
    dialectOptions:{ //时间格式化
        dateStrings: true,
        typeCast: true
    },
    timezone: '+08:00', //改为标准时区
    host: "localhost",
    dialect: "mysql",// 数据库类型,
    logging:()=>{} //不打印sql语句日志
  }
}

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
  }
}

let REDIS = {
   port:6379,
   host:"127.0.0.1",
   expire: 1000 * 60 *60 *24
}


module.exports = {
  MYSQL,
  REDIS,
  isProdcution
}
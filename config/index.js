
const isProdcution = process.env.NODE_ENV == 'production';


let MYSQL = {
  password: "123456",
  user: "root",
  database: "koa2-weibo",
  conf: {
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

}


module.exports = {
  MYSQL,
  REDIS
}
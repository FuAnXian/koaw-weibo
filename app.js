/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-08 09:28:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 17:02:02
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const koaRedis = require("koa-redis");
const session = require("koa-generic-session");

//路由
const index = require('./routes/index')
const users = require('./routes/views/users')
const {middlewareError} = require("./middleware/error")


//api
const ApiUsers = require('./routes/api/users')

//配置
const {REDIS} = require("./config/index")

//发生错误跳到error路由
let errconfig = {
  redirect:"/error"
}
//错误处理和404
onerror(app)
app.use(middlewareError)

// middlewares post json
app.use(koaBody())
app.keys = ["HSFS$_dd##@@sddssd155"];
app.use(session({
  key:"sid", //客户端cookie属性
  prefix:"weibo:", //redis key前缀
  cookie:{
    path:"/",
    httpOnly:true, //只能服务端修改cookie
    maxAge:REDIS.expire
  },
  ttl:REDIS.expire, // REdis 过期时间
  store:koaRedis({
    all:REDIS.host + ":"+REDIS.port,
  })
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(ApiUsers.routes(),ApiUsers.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

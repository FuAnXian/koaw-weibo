const redis = require("redis");
const {REDIS} = require("../config/index")

let redisClient = redis.createClient(REDIS);

redisClient.on("error",err =>{
  console.log(err)
})

/**
 * 设置redis数据
 * @param {string} 属性 
 * @param {any} value 
 * @param {number} 过期时间 秒 
 */
const set = (key,value,timeout = 60 * 60)=>{
  if(value.constructor.name === 'Object'){
    value = JSON.stringify(value)
  }
   redisClient.set(key,value);
   redisClient.expire(key,timeout)
}

/**
 * 获取redis缓存数据
 * @param {string} key 
 */
const get = (key)=>{
  return new Promise((resolve,reject)=>{
     redisClient.get("key",(err,value)=>{
       if(err){
         reject(err)
       }
       resolve(value)
     });
  })
}

module.exports = {
  set,
  get
}
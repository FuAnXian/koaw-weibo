/*
 * @Descripttion: 加密 密码
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-10 09:03:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-10 10:29:23
 */
var crypto;
const { static } = require("../config/index");

try {
  crypto = require('crypto');
} catch (err) {
  console.log('不支持 crypto');
}


//加密
const encrypto = (data) => {
    try{
        var cipher = crypto.createCipher('aes192', static.CRYPTOKEY);//使用aes192加密
        var enc = cipher.update(data, "utf8", "hex");//编码方式从utf-8转为hex;
        return enc += cipher.final('hex');//编码方式转为hex;
    }catch(e){
        return new Error("加密错误"+JSON.stringify(e))
    }
  
}


//解密
const decrypt = (data) => {
    try {
        //AES对称解密
        var decipher = crypto.createDecipher('aes192', static.CRYPTOKEY);
        var dec = decipher.update(data, "hex", "utf8");
        return dec += decipher.final("utf8");
    } catch(e) {
        return new Error("解密错误!"+JSON.stringify(e))
    }

}

module.exports = {
    encrypto,
    decrypt
}
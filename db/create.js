const {Users,Blgos} = require("./model.js");

!(async ()=>{
 
  //添加数据
  let res = await  Users.create({  
    userName:"王五",
    password:"555",
    nicName:"wangwu"
  })
  
  console.log(res.data())

})()





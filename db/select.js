
const { Users, Blgos, Blogs } = require("./model.js");



!(async _ => {
  //查询所有
  let res = await Users.findAll();
  // console.log(res.map(item => item.dataValues))

  //连表查询 ，必须先关联外键关系
  //查询每个用户下面的博客
  let {rows:userBlogsRows,count} = await Users.findAndCountAll({
    attributes: ["userName", "nickName"],
    include: [
      {
        model: Blogs //关联
      }
    ]
  });

  //相反也可以查询博客的用户
  let {rows:blogsUsersRows,count:count1} = await Blogs.findAndCountAll({
    attributes: ["userName", "nickName"],
    include: [
      {
        model: Users, //关联,

      }
    ]
  });

  try {
    userBlogsRows.map(item => {
      let data = item.dataValues;
      let blogs  = data.Blogs.map(item => item.dataValues);
     
      console.log("data:",data)
      console.log("blogs",blogs)
    })
  } catch (e) {
    console.log(userBlogsRows)
  }
})()




const { Blogs, Users,Comments } = require("../db/model/index");
const { ModelError, ModelSuccess , ModelSeqError} = require("../routes/model/Response");
const { static } = require("../config/index");
const {Sequelize} = require("sequelize");
/**
 *  创建博客
 * @param {integer} usersId 用户id
 * @param {string} content 内容
 * @param {integer} image 图片
 * @param {string} title  标题
 * @returns Model
 */
const createdBlogs = async({userId,contentText,contentHtml,image,title})=>{
  if(contentText == "" || !contentText){
    return new ModelError({msg:"内容为空"});
  }
  if(title == "" || !title){
    return new ModelError({msg:"标题为空"});
  }

    try{
      await Blogs.create({
        userId,
        contentHtml,contentText:contentText.substring(0,350),
        image: image || "",
        title:title || "",
      })
      return new ModelSuccess({msg:"创建成功"})
    }catch(e){
      return new ModelSeqError(e)
    }
}

/**
 * 获取全部博客
 * @param {*} params 查询条件 
 * @returns 
 */
const getAllBlogs = async ({where={},offset=0,limit=10})=>{

  let { count, rows }  = await Blogs.findAndCountAll({
    where,
    offset,
    limit,
    order:[
      ['createdAt', 'DESC'],
    ],
    include:[
      {
        model:Users,
        as:"userInfo",
        attributes:{
          exclude:["nickName","id","password","city"]
        },     
      }
    ]
  })

  return new ModelSuccess({msg:"获取成功",data:{count,rows:rows.map(item => item.dataValues)}})
}

/**
 * 获取博客内容
 * @prams {number} id 博客id 
 * @returns 
 */
const getBlogs = async (id)=>{
  try{
    let data = await Blogs.findOne({
      where:{id},
      order:[
        ["contentHtml","asc"],
    ],
      include:[
        {
          model:Comments,
          as:"comments",
          limit:5,
          attributes:{
            exclude:["id","updatedAt"]
          },
        },
        {
          model:Users,
          as:"userInfo",
          attributes:{
            exclude:["nickName","password","city"]
          },
        }
      ]
    })
    return new ModelSuccess({msg:"获取成功",data:data})
  }catch(e){
    console.log(e)
    return new ModelSeqError(e)
  }

};


/**
 * 获取用户当前有多少博客
 * @param {*} userId  用户id
 * @returns 
 */
const getCountBlogs = async (userId)=>{
  return  Blogs.count({
    where: {
      userId
    }
  });
}
module.exports = {
  createdBlogs,
  getBlogs,
  getAllBlogs,
  getCountBlogs
}
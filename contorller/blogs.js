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
const createdBlogs = async({userId,content,image,title})=>{
  if(content == "" || !content){
    return new ModelError({msg:"内容为空"});
  }
  if(title == "" || !title){
    return new ModelError({msg:"标题为空"});
  }

    try{
      await Blogs.create({
        userId,
        content,
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
const getAllBlogs = async ({where,})=>{

  let data = await Blogs.findAll({
    where,
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
  return new ModelSuccess({msg:"获取成功",data:data})
}

/**
 * 获取博客内容
 * @prams {number} id 博客id 
 * @returns 
 */
const getBlogs = async (id)=>{

  let data = await Blogs.findOne({
    where:{id},
    order:[['comments', 'createdAt', 'desc']],
    include:[
      {
        model:Users,
        as:"userInfo",
        attributes:{
          exclude:["nickName","password","city"]
        },
      },
      {
        model:Comments,
        as:"comments",
        attributes:{
          exclude:["id","updatedAt"]
        },
      }
    ]
  })
  return new ModelSuccess({msg:"获取成功",data:data})
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
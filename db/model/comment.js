
const {Model,DataTypes} = require("sequelize");
const sequelize = require("../db");
const {createdTime} = require("../../utils/time")
class Comments extends Model{}
Comments.init({
  text:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull: {
        msg: '请输入你的评论内容'
      },
      len:{
        args:[1,255],
        msg:"超出最大评论长度255个字符！"
      }
    },
    comment:"评论内容"
  },
  userId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull: {
        msg: '评论人id不能为空'
      }
    }
  },
  blogsId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull: {
        msg: '博客id不能为空'
      }
    }
  },
  userName:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull: {
        msg: '评论人名称不能为空'
      }
    },
    comment:"评论人名称"
  },
  proFile:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull: {
        msg: '评论人头像不能为空'
      }
    },
    comment:"评论人头像"
  },
  time: {
    type: DataTypes.VIRTUAL,
    get() {
      return createdTime(this.createdAt);
    },
    set(value) {
      throw new Error('不要尝试设置 `fullName` 的值!');
    }
  }
},{
  sequelize
});

module.exports = Comments;
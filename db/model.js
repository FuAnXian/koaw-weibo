const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

//两种创建模型对象方式
//users模型
const Users = sequelize.define("users",{
  //定义字段
   userName:{
       type:DataTypes.STRING,
       allowNull:false
   },
   password:{
     type:DataTypes.STRING,
     allowNull:false
   },
   nickName:{
     type:DataTypes.STRING,
     allowNull:true
   }
},{
  tableName: 'users' //表名
});

//blogs
class Blogs extends Model{}
Blogs.init({
  title:{
    type:DataTypes.STRING,
    defaultValue:"暂无标题",
    allowNull:false
  },
  titleImage:{
    type:DataTypes.STRING,
    allowNull:true
  },
  content:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  userId:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
},{
  sequelize:sequelize //注意这里要连接实列
});

//关联表 为Blogs创建外键
Blogs.belongsTo(Users,{
  foreignKey:"userId" //BLogs模型userID关联users模型id
});

//和上面等效 (谁在前面定义方法，就先查到那个模型)
Users.hasMany(Blogs,{
  foreignKey:"userId"
});

//不加！号就错误 =>同步模型
(async ()=>{
  await sequelize.sync()
})();


module.exports = {
  Users,
  Blogs,
  sequelize
};
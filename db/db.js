const { Sequelize } = require("sequelize");
const { MYSQL } = require("../config/index")

// 数据库名称 / 用户 / 密码 
const sequelize = new Sequelize(MYSQL.database, MYSQL.user, MYSQL.password,MYSQL.conf)

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
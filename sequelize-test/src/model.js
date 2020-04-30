/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-20 09:34:44
 * @LastEditTime : 2020-04-27 19:34:28
 * @FilePath     : \projecte:\codeFile\sina-code\sequelize-test\src\model.js
*/
const Sequelize = require('sequelize')
const seq = require('./seq')

//创建user模型 数据表的名字最终会是users
const User = seq.define('user', {
  //id会自动创建，并设为主键，自增
  //还会自动创建createTime updateTime 字段
  userName: {
    type:　Sequelize.STRING,  //varchar（255）
    allowNull: false  //对应not null
  },
  password: {
    type:　Sequelize.STRING,  //varchar（255）
    allowNull: false
  },
  nickName: {
    type:　Sequelize.STRING,  //varchar（255）
    comments: '昵称' //注释
  },
})
//创建blog 模型
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT, //存的多
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
//外键关联  关联表查询 子牵引父 父牵引子 需要两种关联都写
Blog.belongsTo(User, { //多对一
  //创建外键 Blog.userId => User.id
  //默认情况是关联id 
  foreignKey: 'userId'
})
//外键关联  
User.hasMany(Blog, { //一对多
  //创建外键 Blog.userId => User.id
  //默认情况是关联id 
  foreignKey: 'userId'
})
module.exports = {
  User,
  Blog
}
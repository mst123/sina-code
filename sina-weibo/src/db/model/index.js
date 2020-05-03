/**
 * @Descripttion  : 数据模型入口文件
 * @Author        : 马识途
 * @Date          : 2020-04-20 13:36:38
 * @LastEditTime: 2020-05-03 12:33:39
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\db\model\index.js
 */
const User =  require('./user');
const Blog =  require('./blog');
const UserRelation = require('./UserRelation');

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, { //User主 Userrelation 从
  foreignKey: 'followerId'

  // UserRelation.followerId => User.id
})

User.hasMany(UserRelation, { //User主 Userrelation 从
  // UserRelation.userId => User.id
  foreignKey: 'userId'
})

//数据库并没有体现，并不影响查询
Blog.belongsTo(UserRelation, { //UserRelation 主 Blog 从
  foreignKey: 'userId',
  target: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelation
};

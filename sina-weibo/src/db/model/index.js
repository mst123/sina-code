/**
 * @Descripttion  : 数据模型入口文件
 * @Author        : 马识途
 * @Date          : 2020-04-20 13:36:38
 * @LastEditTime: 2020-05-02 16:42:18
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\db\model\index.js
 */
const User =  require('./user');
const Blog =  require('./blog');
const UserRelation = require('./UserRelation');

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'

  // UserRelation.followerId => User.id
})

User.hasMany(UserRelation, {
  // UserRelation.userId => User.id
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation
};

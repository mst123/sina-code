/**
 * @Descripttion  : 数据模型入口文件
 * @Author        : 马识途
 * @Date          : 2020-04-20 13:36:38
 * @LastEditTime: 2020-04-22 19:32:51
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\db\model\index.js
 */
const User =  require('./user');
const Blog =  require('./blog');

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
};

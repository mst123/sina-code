/**
 * @Descripttion  : 用户数据模型 users表
 * @Author        : 马识途
 * @Date          : 2020-04-20 13:23:18
 * @LastEditTime: 2020-04-20 13:36:27
 * @FilePath      : \projecte:\codeFile\sina-code\sina-weibo\src\db\model\user.js
 */
const seq = require('../seq');
const { STRING, DECIMAL } = require('../type');
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,      //唯一
    comment: '用户名唯一' //注释
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1 男 2 女 3 保密）'
  },
  picture: {
    type: STRING,
    comment: '头像图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  },
})

module.exports = User

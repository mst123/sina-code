/**
 * @Descripttion  : 
 * @Author        : 马识途
 * @Date          : 2020-05-02 15:20:47
 * @LastEditTime: 2020-05-02 15:25:00
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\db\model\UserRelation.js
*/
const seq = require('../seq');
const { INTEGER } = require('../type');

const UserRelation = seq.define('userRelation',{
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的id'
  }
})
module.exports = UserRelation

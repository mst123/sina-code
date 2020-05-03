/**
 * @Descripttion  : 用户关系
 * @Author        : 马识途
 * @Date          : 2020-05-02 16:09:39
 * @LastEditTime: 2020-05-03 13:16:34
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\services\userRelation.js
*/
const { User, UserRelation } = require('../db/model/index');
const { formatUser } = require('../services/_format');
const Sequelize = require('sequelize');
/**
 * 根据被关注人id获取粉丝信息，即该用户的粉丝
 * @param {Number} followerId 被关注人id
 */
async function getUsersByFollower(followerId){
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId, // 被关注人id 
          userId: {
            [Sequelize.Op.ne]: followerId //不等于
          }
          // User include userRelation 对应
          // User.hasMany(UserRelation) 外键是 userRelation.userId
          // userRelation.followerId => userRelation.userId => user.id 
        }
      }
    ]
  })
  //result.count 总数
  //result.rows 查询结果 数组
  //格式化
  /* let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList) */

  return {
    count: result.count,
    userList: formatUser(result.rows)
  }
}

/**
 * 添加关注关系
 * @param {Number} userId  用户id
 * @param {Number} followerId   被关注用户id
 */
async function addFollower(userId, followerId){
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 删除关注关系
 * @param {Number} userId  用户id
 * @param {Number} followerId   被关注用户id
 */
async function deleteFollower(userId, followerId){
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

/**
 * 根据用户id获取被关注人列表信息
 * @param {Number} userId 用户id
 */
async function getFollowersByUser(userId){
  const result = await UserRelation.findAndCountAll({
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId //不等于
      }
    },
    include: {
      model: User,
      attributes: ['id', 'userName', 'nickName', 'picture'],
      order: [
        ['id', 'desc']
      ]
    }
  })
  //格式化
  let followerList = result.rows.map(row => row.user)
  followerList = formatUser(followerList)
  return {
    count: result.count,
    followerList
  }
}

module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser
};

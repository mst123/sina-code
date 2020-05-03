/**
 * @Descripttion  : 用户关系
 * @Author        : 马识途
 * @Date          : 2020-05-02 16:09:39
 * @LastEditTime: 2020-05-03 09:11:09
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\services\userRelation.js
*/
const { User, UserRelation } = require('../db/model/index');
const { formatUser } = require('../services/_format');
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
          followerId // 被关注人id 
          // User include userRelation 对应
          // User.hasMany(UserRelation) 外键是 userRelation.userId
          // userRelation.followerId => userRelation.userId => user.id 
        }
      }
    ]
  })
  //result.count 总数
  //result.rows 查询结果 数组
  console.log(result);
  //格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUsersByFollower
};

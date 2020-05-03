/**
 * @Descripttion  : 用户关系 controller
 * @Author        : 马识途
 * @Date          : 2020-05-02 16:07:18
 * @LastEditTime: 2020-05-02 17:06:19
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\controller\user-relation.js
*/
const { getUsersByFollower } = require('../services/userRelation');
const { SuccessModel,errorModel } = require('../resModel/ResModel');
/**
 * 根据 userId 获取粉丝列表
 * @param {Number} userId 用户id
 */
async function getFans(userId){
  const { count, userList } = await getUsersByFollower(userId)
  return new SuccessModel({
    count, 
    userList
  })
}

module.exports = {
  getFans
};

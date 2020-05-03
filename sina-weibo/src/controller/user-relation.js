/**
 * @Descripttion  : 用户关系 controller
 * @Author        : 马识途
 * @Date          : 2020-05-02 16:07:18
 * @LastEditTime: 2020-05-03 11:41:41
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\controller\user-relation.js
*/
const { getUsersByFollower, addFollower, deleteFollower, getFollowersByUser } = require('../services/userRelation');
const { SuccessModel,errorModel } = require('../resModel/ResModel');
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../resModel/errorInfo');
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
/**
 * 关注
 * @param {Number} myUserId   登陆用户id
 * @param {Number} curUserId  需要被关注的用户id
 */
async function follow(myUserId, curUserId){
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    return new errorModel(addFollowerFailInfo)
  }
}
/**
 * 取消关注
 * @param {Number} myUserId   登陆用户id
 * @param {Number} curUserId  需要被取消关注的用户id
 */
async function unFollow(myUserId, curUserId){
  const result = await deleteFollower(myUserId, curUserId)
  if(result){
    return new SuccessModel()
  }else{
    return new errorModel(deleteFollowerFailInfo)
  }
}
/**
 * 根据 userId 获取粉丝列表
 * @param {Number} userId 用户id
 */
async function getFollows(userId){
  const { count, followerList } = await getFollowersByUser(userId)
  return new SuccessModel({
    count, 
    followerList
  })
}

module.exports = {
  getFans,
  follow,
  unFollow,
  getFollows
};

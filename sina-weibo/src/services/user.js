/**
 * @Descripttion : user service
 * @Author       : 马识途
 * @Date         : 2020-04-20 14:34:28
 * @LastEditTime: 2020-04-25 15:32:58
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\services\user.js
*/

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');
/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  //查询条件
  const whereOpt = {
    userName
  }
  if(typeof password !=='undefined'){
    whereOpt.password = password
  }
  //查询
  const result = await User.findOne({
    attribute: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if(result == null) {
    return result
  }
  //格式化处理
  return formatUser(result.dataValues)
}
/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 1男 2女 3 保密
 * @param {string} nickName 昵称
 */
async function createUser({userName, password, gender = 3, nickName}){
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
}

/**
 * 删除用户
 * @param {String} userName 
 */

async function deleteUser(userName){
  const result = await User.destroy({
    where: {
      userName
    }
  })
  //result 返回删除行数
  return result > 0
}
/**
 * 更新用户信息
 * @param {String} newPassword 新密码
 * @param {String} newNickName 新昵称
 * @param {String} newPicture 新头像
 * @param {String} newCity 新城市
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
){
  // 拼接修改内容
  let updateData = {}
  if(newPassword){
    updateData.password = newPassword
  }
  if(newNickName){
    updateData.nickName = newNickName
  }
  if(newPicture){
    updateData.picture = newPicture
  }
  if(newCity){
    updateData.city = newCity
  }
  //拼接查询条件
  const whereData = {
    userName
  }
  if(password){
    whereData.password = password
  }
  console.log(updateData);
  console.log(whereData);
  //执行修改
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0 // 修改的行数
  //
}
module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
};
 

/**
 * @Descripttion : user service
 * @Author       : 马识途
 * @Date         : 2020-04-20 14:34:28
 * @LastEditTime: 2020-04-20 20:06:33
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\services\user.js
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
module.exports = {
  getUserInfo,
  createUser
};
 

/**
 * @Descripttion : user service
 * @Author       : 马识途
 * @Date         : 2020-04-20 14:34:28
 * @LastEditTime: 2020-04-20 18:37:04
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

module.exports = {
  getUserInfo
};
 

/**
 * @Descripttion  : user controller
 * @Author        : 马识途
 * @Date          : 2020-04-20 14:18:02
 * @LastEditTime: 2020-04-21 13:32:37
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\controller\user.js
*/
const { getUserInfo, createUser } = require('../services/user');
const { SucessModel, ErrorModel } = require('../resModel/ResModel');
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo, 
  registerFailInfo 
} = require('../resModel/errorInfo');
const doCrypto = require('../utils/cryp');

async function isExist(userName){
  const userInfo = await getUserInfo(userName)
  if(userInfo){ //用户名已存在
    return new SucessModel(userInfo)
  }else{
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}
/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 1男 2女 3 保密
 */
async function register({userName, password, gender}){ //解构方式 可以不在意参数顺序，避免第二个参数不传，第三个参数无法传递
  const userInfo = await getUserInfo(userName)
  if(userInfo){ //用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password), 
      gender
    })
    return new SucessModel()
  } catch (error) {
    console.error(error);
    console.error(error.message, error.stack);
    return ErrorModel(registerFailInfo)
  }
}
module.exports = {
  isExist,
  register
};


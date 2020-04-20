/**
 * @Descripttion  : user controller
 * @Author        : 马识途
 * @Date          : 2020-04-20 14:18:02
 * @LastEditTime: 2020-04-20 18:29:40
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\controller\user.js
*/
const { getUserInfo } = require('../services/user');
const { SucessModel,  ErrorModel } = require('../resModel/ResModel');
const { registerUserNameNotExistInfo } = require('../resModel/errorInfo');

async function isExist(userName){
  const userInfo = await getUserInfo(userName)
  if(userInfo){ //用户名已存在
    return new SucessModel(userInfo)
  }else{
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
};


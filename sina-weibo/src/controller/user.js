/**
 * @Descripttion  : user controller
 * @Author        : 马识途
 * @Date          : 2020-04-20 14:18:02
 * @LastEditTime: 2020-04-25 15:57:48
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\controller\user.js
*/
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../resModel/ResModel');
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo, 
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../resModel/errorInfo');
const doCrypto = require('../utils/cryp');

async function isExist(userName){
  const userInfo = await getUserInfo(userName)
  if(userInfo){ //用户名已存在
    return new SuccessModel(userInfo)
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
    return new SuccessModel()
  } catch (error) {
    console.error(error);
    console.error(error.message, error.stack);
    return ErrorModel(registerFailInfo)
  }
}
/**
 * 登陆
 * @param {Object} ctx 
 * @param {Sring} userName 用户名
 * @param {Sring} password 密码
 */
async function login({ctx, userName, password}){ 
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if(!userInfo){
    return new ErrorModel(loginFailInfo)
  }
  //登陆成功
  if(ctx.session.userInfo == null){
    //每一个用户的session都是唯一的，通过cookie携带
    ctx.session.userInfo = userInfo 
  }
  return new SuccessModel()
}
/**
 * 删除当前用户 仅测试环境下
 * @param {Sting} userName 
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if(result){
    return new SuccessModel()
  }else{
    return new ErrorModel(deleteUserFailInfo)
  }
}
/**
 * 修改个人信息
 * @param {Object} ctx 为了修改session内用户信息
 * @param {Sring} nickName 昵称
 * @param {Sring} city 所在地
 * @param {Sring} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }){
  const { userName } = ctx.session.userInfo
  nickName = nickName ? nickName : userName
  const result = await updateUser(
    { 
      newNickName: nickName,
      newPicture: picture,
      newCity: city 
    },
    { userName }
  )
  if(result){
    //执行成功
    Object.assign(ctx.session.userInfo, { //合并 并且更新
      nickName, 
      city, 
      picture
    })
    return new SuccessModel()
  }else{
    return new ErrorModel(changeInfoFailInfo)
  }
}
/**
 * 修改密码
 * @param {String} userName
 * @param {String} password 
 * @param {String} newPassword
 */
async function changePassword ({ userName, password, newPassword }){
  const result = await updateUser(
    { newPassword: doCrypto(newPassword)},
    { userName, password: doCrypto(password) }
  )
  if(result){
    return new SuccessModel()
  }else{
    return new ErrorModel(changePasswordFailInfo)
  }
}
/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx){
  delete ctx.session.userInfo
  return new SuccessModel()
} 
module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
};


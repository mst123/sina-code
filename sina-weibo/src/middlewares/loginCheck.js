/**
 * @Descripttion : 登陆验证的中间件
 * @Author       : 马识途
 * @Date         : 2020-04-21 19:56:41
 * @LastEditTime: 2020-04-21 20:08:57
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\middlewares\loginCheck.js
*/

const { ErrorModel } = require('../resModel/ResModel');
const { jsonSchemaFileInfo } = require('../resModel/errorInfo');

/**
 * api 登陆验证
 * @param {Object} ctx 
 * @param {Function} next 
 */
async function loginCheck(ctx, next) {
  //已登录
  if(ctx.session && ctx.session.userInfo){
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}
/**
 * 页面登陆验证
 * @param {Object} ctx 
 * @param {Function} next 
 */
async function loginRedirect(ctx, next) {
  //已登录
  if(ctx.session && ctx.session.userInfo){
    await next()
    return
  }
  //未登录
  //如参数出现空格这样的特殊字段，后台只可以读取到空格前的内容，
  //后面内容丢失，造成数据读取失败
  //如果用encodeURIComponent()包裹一下，那会将这些特殊字符进行转义
  ctx.redirect('/login?url=' + encodeURIComponent(ctx.url))
  
}
module.exports = {
  loginCheck,
  loginRedirect
};


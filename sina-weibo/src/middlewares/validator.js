/**
 * @Descripttion : json schema 验证中间件
 * @Author       : 马识途
 * @Date         : 2020-04-21 16:03:22
 * @LastEditTime: 2020-04-21 16:25:29
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\middlewares\validator.js
*/

const { ErrorModel } = require('../resModel/ResModel');
const { jsonSchemaFileInfo } = require('../resModel/errorInfo');
/**
 * 生成 json schema 验证的中间件
 * @param {Function} validateFn 验证函数
 */
function genValidator(validateFn){ //generate 产出
  //定义中间件函数
  return async (ctx, next) => {
    const data = ctx.request.body
    const error = validateFn(data)
    if(error) { //验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return 
    }
    await next()
  }
}
module.exports = {
  genValidator
};

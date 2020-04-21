/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-21 13:57:02
 * @LastEditTime: 2020-04-21 14:07:19
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\validator\validate.js
*/

const Ajv = require('ajv');
const ajv = new Ajv({
  // allErrors: true //输出所有错误
})
/**
 * 
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if(!valid){
    return ajv.errors[0]
  }
}

module.exports = validate

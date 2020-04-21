/**
 * @Descripttion : user数据格式校验
 * @Author       : 马识途
 * @Date         : 2020-04-21 13:49:28
 * @LastEditTime: 2020-04-21 16:30:00
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\validator\user.js
*/

const _validate = require('./_validate');
// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

/**
 * 校验用户数据
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
  return _validate(SCHEMA, data)
}

module.exports = userValidate

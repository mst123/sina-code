/**
 * @Descripttion  : blog 数据格式校验
 * @Author        : 马识途
 * @Date          : 2020-04-25 20:23:01
 * @LastEditTime: 2020-04-25 20:28:29
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\validator\blog.js
*/
const _validate = require('./_validate');
// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验微博数据
 * @param {Object} data 用户数据
 */
function blogValidate(data = {}) {
  return _validate(SCHEMA, data)
}

module.exports = blogValidate
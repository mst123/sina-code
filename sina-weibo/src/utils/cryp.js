/**
 * @Descripttion : 加密方法
 * @Author       : 马识途
 * @Date         : 2020-04-20 20:24:11
 * @LastEditTime: 2020-04-21 13:31:04
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\utils\cryp.js
*/
const crypto = require('crypto');//nodejs 自带加密模块
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys');
//密钥
const SECRET_KEY = CRYPTO_SECRET_KEY
/**
 * 
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') //hex 16进制
}

function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto

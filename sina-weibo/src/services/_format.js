/**
 * @Descripttion : _ 内部使用 数据格式化
 * @Author       : 马识途
 * @Date         : 2020-04-20 14:51:26
 * @LastEditTime: 2020-05-02 16:50:19
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\services\_format.js
*/

const { DEFAULT_PICTURE } = require('../conf/constant');
/**
 * 默认图片处理
 * @param {obj} obj 
 */
function _formatUserPicture(obj){
  if(obj.picture == null){
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}
/**
 * 格式化用户信息
 * @param {Array|Object} list 用户对象或者是用户数组 
 */
function formatUser(list) {
  if(list ==null ){
    return list
  }
  if(list instanceof Array){
    //数组 用户列表
    return list.map(_formatUserPicture) //效果相同
    return list.map( item => _formatUserPicture(item))
  }
  //单个对象
  return _formatUserPicture(list)
}

module.exports = {
  formatUser
};

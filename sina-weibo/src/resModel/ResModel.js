/**
 * @Descripttion : res 的数据模型 一般文件名大写 表示要输出一个class
 * @Author       : 马识途
 * @Date         : 2020-04-20 15:21:53
 * @LastEditTime: 2020-04-25 11:59:03
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\resModel\ResModel.js
*/

/**
 * 基本模块
*/

class BaseModel {
  constructor({errno, data, message}) {
    this.errno = errno
    if(typeof data !== 'undefined'){
      this.data = data
    }
    if(typeof message !== 'undefined'){
      this.message = message
    }
  }
}
//成功
class SucessModel extends BaseModel{
  constructor(data = {}){
    super({
      errno: 0,
      data
    })
  }
}
//失败
class ErrorModel extends BaseModel{
  constructor({ errno, message}){
    super({
      errno,
      message
    })
  }
}
module.exports = {
  SucessModel,
  ErrorModel
};

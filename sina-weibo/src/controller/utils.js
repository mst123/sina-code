/**
 * @Descripttion  : utils controller
 * @Author        : 马识途
 * @Date          : 2020-04-25 09:43:42
 * @LastEditTime: 2020-04-25 13:24:20
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\controller\utils.js
*/
const { ErrorModel, SucessModel } = require('../resModel/ResModel');
const { uploadFileSizeFailInfo } = require('../resModel/errorInfo');
const fse = require('fs-extra');
const path = require('path');
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '../', '../', 'uploadFiles')
// 文件最大体积 1mb
const MIX_SIZE = 1024 * 1024 * 1024   //b->kb->mb

//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if(!exist){
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})
/**
 * 保存文件
 * @param {*} name 文件名称 
 * @param {*} type 文件类型
 * @param {*} size 文件大小 b
 * @param {*} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath}) {
  if( size > MIX_SIZE){ //如果文件体积过大，将文件删除
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  //移动文件
  const fileName = Date.now() + '.' + name //防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) //目的地
  await fse.move(filePath, distFilePath)

  //返回信息
  return new SucessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
};

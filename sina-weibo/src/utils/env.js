/*
 * @Descripttion: 环境变量
 * @version: 
 * @Author: 马识途
 * @Date: 2020-04-19 12:33:28
 * @LastEditTime: 2020-04-19 15:29:49
 * @FilePath: \hnswc-webg:\codeFile\nodeJS\sina-code\src\utils\env.js
 */
const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}
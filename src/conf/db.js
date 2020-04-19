/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-19 12:20:26
 * @LastEditTime: 2020-04-19 16:04:18
 * @FilePath     : \hnswc-webg:\codeFile\nodeJS\sina-code\src\conf\db.js
 */

const { isProd } = require('../utils/env')
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'clannad123',
  port: '3306', //默认端口
  database: 'koa2_weibo_db'
}

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: 'localhost',
    user: 'root',
    password: 'clannad123',
    port: '3306',
    database: 'koa2_weibo_db'
  }

}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
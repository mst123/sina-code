/*
 * @Descripttion: sequelize 初始化
 * @version: 
 * @Author: 马识途
 * @Date: 2020-04-19 12:03:31
 * @LastEditTime: 2020-04-19 14:17:44
 * @FilePath: \hnswc-webg:\codeFile\nodeJS\sina-code\src\db\seq.js
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF, MYSQL_CONF: {host, user, password, database} } = require('../conf/db');
const conf = {
  host: host,
  dialect: 'mysql'
}
if(isProd){ //线上使用连接池
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000, //如果一个连接池 10s之内没有被使用，就会被释放
  }
}
if(isTest){ //测试环境 禁止sequelize控制台打印
  conf.logging = () => {}
}
const seq = new Sequelize(database, user, password, conf)

//测试连接
seq.authenticate().then(() => {
  console.log(111111);
}).catch((err) => {
  console.log(err);
})

module.exports = seq
/**
 * @Descripttion : sequelize 初始化 连接数据库
 * @Author       : 马识途
 * @Date         : 2020-04-20 09:34:44
 * @LastEditTime: 2020-04-20 18:39:45
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\db\seq.js
*/

const Sequelize = require('sequelize');
const { isProd, isTest } = require('../utils/env');
const { MYSQL_CONF, MYSQL_CONF: {host, user, password, database} } = require('../conf/db');
const conf = {
  host: host,
  dialect: 'mysql' //数据库类型
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
  console.log('成功连接至数据库');
}).catch((err) => {
  console.log(err);
})

module.exports = seq
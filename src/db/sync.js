/*
 * @Descripttion: sequelize 同步数据库
 * @version: 
 * @Author: 马识途
 * @Date: 2020-04-19 12:56:12
 * @LastEditTime: 2020-04-19 13:58:43
 * @FilePath: \hnswc-webg:\codeFile\nodeJS\sina-code\src\db\sync.js
 */
const seq = require('./seq')
require('./model')
//测试连接
seq.authenticate().then(() => {
  console.log(111111);
}).catch((err) => {
  console.log(err);
})

//执行同步 自动创建数据库表 ,一旦同步,数据表会被清空 force 的原因
seq.sync({ force: true }).then(() => {  //force 强制同步 
  console.log('sync ok');
  process.exit()
})
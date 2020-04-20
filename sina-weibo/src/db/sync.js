/**
 * @Descripttion : sequelize 同步数据库
 * @Author       : 马识途
 * @Date         : 2020-04-19 12:56:12
 * @LastEditTime: 2020-04-20 18:43:48
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\db\sync.js
*/
const seq = require('./seq')
require('./model/index')

//执行同步 自动创建数据库表 ,一旦同步,数据表会被清空 force 的原因
seq.sync({ force: true }).then(() => {  //force 强制同步 
  console.log('同步成功 sync ok');
  process.exit()
})
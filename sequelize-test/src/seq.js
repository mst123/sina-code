const Sequelize = require('sequelize')
const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

//连接池
conf.pool = {
  max: 5,
  min: 0,
  idle: 10000, //如果一个连接池 10s之内没有被使用，就会被释放
}
const seq = new Sequelize('koa2_weibo_db', 'root', 'clannad123', conf)

//测试连接
/* seq.authenticate().then(() => {
  console.log(111111);
}).catch((err) => {
  console.log(err);
})
 */
module.exports = seq
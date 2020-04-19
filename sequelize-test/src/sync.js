const seq = require('./seq')
require('./model')
//测试连接
seq.authenticate().then(() => {
  console.log(111111);
}).catch((err) => {
  console.log(err);
})

//执行同步 自动创建数据库表 ,一旦同步， 数据表会被清空
seq.sync({ force: true }).then(() => {  //force 强制同步 
  console.log('sync ok');
  process.exit()
})
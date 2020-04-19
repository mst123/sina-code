const router = require('koa-router')()
const jwt = require('jsonwebtoken'); //加密 解密依赖
const util = require('util'); //nodejs 自身的模块
const verify = util.promisify(jwt.verify)
const { SECRET } = require('../conf/constants');
router.prefix('/users')
//模拟登陆
router.post('/login', function (ctx, next) { //postman模拟时需要注意content-type application/json  xxx-form
  const { userName, password } = ctx.request.body
  let userInfo
  if(userName==='zhangsan'&&password==="123"){
    //登陆获取用户信息，模拟数据库获取
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1
    }
  }
  let token 
  if(userInfo){
    token =  jwt.sign(userInfo, SECRET, {
      expiresIn: '1h'
    })
  }
  if(userInfo == null){
    ctx.body = {
      errno: 01,
      msg: '登录失败'
    }
    return
  }
  
  ctx.body = {
    errno: 0,
    data: token
  }
})

//获取用户信息,请求需要带上请求头 header 
// [{"key":"Authorization","value":"Bearer eyJhb......""}]
router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (error) {
    console.error(error);
    ctx.body = {
      errno: -1,
      msg: 'verify token failed'
    }
  }
  
})

module.exports = router

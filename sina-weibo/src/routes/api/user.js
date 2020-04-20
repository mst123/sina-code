/**
 * @Descripttion  : user api router
 * @Author        : 马识途
 * @Date          : 2020-04-20 14:03:12
 * @LastEditTime: 2020-04-20 20:14:25
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\routes\api\user.js
 */
const router = require('koa-router')();
const { isExist, register } = require('../../controller/user');
//前缀
router.prefix('/api/user')
//注册
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName, 
    password, 
    gender
  })
})
// 检查用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router

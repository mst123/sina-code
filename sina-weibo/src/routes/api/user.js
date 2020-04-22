/**
 * @Descripttion  : user api router
 * @Author        : 马识途
 * @Date          : 2020-04-20 14:03:12
 * @LastEditTime: 2020-04-21 20:32:31
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\routes\api\user.js
 */
const router = require('koa-router')();
const { isExist, register, login, deleteCurUser } = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');
const { isTest } = require('../../utils/env');
const { loginCheck, loginRedirect } = require('../../middlewares/loginCheck');

//前缀
router.prefix('/api/user')
//注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
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
//登陆
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login({ctx, userName, password})
})
//测试环境下删除自己
router.post('/delete', loginCheck, async (ctx, next) => {
  if(isTest) {
    //测试环境下，测试账号登陆后 删除自己
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router

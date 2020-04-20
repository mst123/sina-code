/**
 * @Descripttion  : 用户页面渲染相关路由
 * @Author        : 马识途
 * @Date          : 2020-04-20 11:13:16
 * @LastEditTime: 2020-04-20 11:17:03
 * @FilePath      : \projecte:\codeFile\sina-code\sina-weibo\src\routes\view\user.js
 */

const router = require('koa-router')();

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router;
 
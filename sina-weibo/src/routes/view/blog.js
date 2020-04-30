/**
 * @Descripttion : 微博 view 路由
 * @Author       : 马识途
 * @Date         : 2020-04-23 20:45:45
 * @LastEditTime: 2020-04-26 20:00:19
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\routes\view\blog.js
*/
const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginCheck');

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index',{ })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const userName = ctx.session.userInfo
  ctx.redirect('/profile/' + userName)
})
// 个人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  await ctx.render('profile', {
    //参数展示不写
  })
})

module.exports = router;

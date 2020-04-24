/**
 * @Descripttion : 微博 view 路由
 * @Author       : 马识途
 * @Date         : 2020-04-23 20:45:45
 * @LastEditTime: 2020-04-23 20:52:02
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\routes\view\blog.js
*/
const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginCheck');

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('blog',{ })
})

module.exports = router;

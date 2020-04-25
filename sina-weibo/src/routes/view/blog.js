/**
 * @Descripttion : 微博 view 路由
 * @Author       : 马识途
 * @Date         : 2020-04-23 20:45:45
 * @LastEditTime: 2020-04-25 19:09:43
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\view\blog.js
*/
const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginCheck');

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index',{ })
})

module.exports = router;

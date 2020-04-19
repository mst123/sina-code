/**
 * @Descripttion : error 404 路由
 * @Author       : 马识途
 * @Date         : 2020-04-19 18:00:17
 * @LastEditTime: 2020-04-19 18:10:08
 * @FilePath     : \hnswc-webg:\codeFile\nodeJS\sina-code\src\routes\view\error.js
 */

const router = require('koa-router')()

//error
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

//404 一定要注册到最下边
router.get('/*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router

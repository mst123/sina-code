/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-18 13:08:37
 * @LastEditTime: 2020-04-19 17:03:21
 * @FilePath     : \hnswc-webg:\codeFile\nodeJS\sina-code\src\routes\index.js
 */
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: false,
    blogList: [{
      id:1,
      title:'aaaaaaa'
    },{
      id:2,
      title:'bbbbbbb'
    },{
      id:3,
      title:'ccccccc'
    }]
  })
})

router.get('/profile/:username', async (ctx, next) => {
  const { username } = ctx.params
  ctx.body = {
    title: 'this a profile page',
    username
  }
})

router.get('/loadMore/:username/:pageIndex', async (ctx, next) => {
  const { username,pageIndex } = ctx.params
  ctx.body = {
    title: 'this a loadMore API',
    username,
    pageIndex
  }
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session //可以获取当前用户的session
  if(session.viewNum == null){
    session.viewNum
  }
  session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    session
  }
})

module.exports = router

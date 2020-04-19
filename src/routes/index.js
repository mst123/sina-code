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
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

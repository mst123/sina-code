/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-18 13:08:37
 * @LastEditTime: 2020-04-20 14:09:16
 * @FilePath      : \projecte:\codeFile\sina-code\sina-weibo\src\app.js
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { isProd } = require('./utils/env');
//session和redis
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db');
//加密
app.keys = ['sadfah@#$#@2131ASD'] //密匙
app.use(session({
  key: 'weibo.sid',//cookie 的名字 默认是koa.sid
  prefix: 'weibo:sess:', //redis  session值的前缀 默认是 koa:sess:
  cookie: {
    path: '/', 
    httpOnly: true, //不允许客户端更改
    maxAge: 24*60*60*1000, //cookie过期时间
  },
  ttl: 24*60*60*1000, //redis过期时间 此行不写默认和maxAge一样的时间
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
//浏览器中 Set-Cookie: weibo.sid= qpuGnOP_q4YguBbkDNnatYrv6rGZDq0x; path=/; expires=Mon, 20 Apr 2020 09:04:09 GMT; httponly
//redis-cli中  key     weibo:sess : qpuGnOP_q4YguBbkDNnatYrv6rGZDq0x
//           value   "{\"cookie\":{\"path\":\"/\",\"httpOnly\":true,\"maxAge\":86400000,\"overwrite\":true,\"signed\":true},\"viewNum\":1}" 
//------------------------- viewNum --------------------------------
// router.get('/json', async (ctx, next) => {
//   const session = ctx.session //可以获取当前用户的session
//   if(session.viewNum == null){
//     session.viewNum
//   }
//   session.viewNum++
//   ctx.body = {
//     title: 'koa2 json',
//     session
//   }
// })

//redis和session结束
//引入路由 包括view和api两种

// api路由
const index = require('./routes/index');
const user = require('./routes/api/user');
// view路由
const userViewRouter = require('./routes/view/user');
const errorViewRouter = require('./routes/view/error');

// error handler 线上环境重定向至error
onerror(app, isProd ? { redirect: '/error' }: {})

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public')) //根目录静态化

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger 中间件的演示
/* app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log (`${ctx.method} ${ctx.url} - ${ms}ms`)
}) */

// 使用路由 包括view和api两种
//api
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
//view
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //始终需要放在最后一列

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

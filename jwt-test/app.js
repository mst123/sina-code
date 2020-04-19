/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-19 19:35:35
 * @LastEditTime: 2020-04-19 20:29:49
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\jwt-test\app.js
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt');

const index = require('./routes/index')
const users = require('./routes/users')

const { SECRET } = require('./conf/constants')

// error handler
onerror(app)

//jwt验证 权限
app.use(
  jwtKoa({
    secret: SECRET
  }).unless({ //自定义哪些目录忽略 jwt 验证
    path: [/^\/users\/login/] 
  })
)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

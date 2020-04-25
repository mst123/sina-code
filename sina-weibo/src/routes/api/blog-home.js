/**
 * @Descripttion  : blog 首页 api 路由
 * @Author        : 马识途
 * @Date          : 2020-04-25 19:43:02
 * @LastEditTime: 2020-04-25 20:34:32
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\api\blog-home.js
*/
const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginCheck');
const { create } = require('../../controller/blog-home'); 
const { genValidator } = require('../../middlewares/validator');
const blogValidate = require('../../validator/blog');
router.prefix('/api/blog')

//创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async(ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId, content, image})
})


module.exports = router
 
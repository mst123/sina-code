/**
 * @Descripttion  : 个人主页api路由
 * @Author        : 马识途
 * @Date          : 2020-05-01 11:12:22
 * @LastEditTime: 2020-05-02 10:58:57
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\api\blog-profile.js
*/
const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginCheck');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getBlogListStr } = require('../../utils/blog');
router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async(ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  //渲染为html返回
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})


module.exports = router
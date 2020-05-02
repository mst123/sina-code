/**
 * @Descripttion : 微博 view 路由
 * @Author       : 马识途
 * @Date         : 2020-04-23 20:45:45
 * @LastEditTime: 2020-05-02 11:03:02
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\view\blog.js
*/
const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginCheck');
const { getProfileBlogList } = require('../../controller/blog-profile');
//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index',{ })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect('/profile/' + userName)
})
// 个人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const { userName: currentUserName } = ctx.params
  // 获取微博第一页数据
  const result = await getProfileBlogList(currentUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  await ctx.render('profile', {
    blogData: { 
      isEmpty, 
      blogList, 
      pageSize, 
      pageIndex, 
      userName: currentUserName,
      count 
    }
  })
})

module.exports = router;

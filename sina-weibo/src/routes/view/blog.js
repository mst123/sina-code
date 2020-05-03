/**
 * @Descripttion : 微博 view 路由
 * @Author       : 马识途
 * @Date         : 2020-04-23 20:45:45
 * @LastEditTime: 2020-05-03 09:59:43
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\view\blog.js
 */
const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginCheck');
const { isExist } = require('../../controller/user');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getSquareBlogList } = require('../../controller/blog-square');
const { getFans } =  require('../../controller/user-relation');
//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const {
    userName
  } = ctx.session.userInfo
  ctx.redirect('/profile/' + userName)
})
// 个人主页(自己或者他人)
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  //已登陆用户
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  let curUserInfo
  const { userName: currentUserName } = ctx.params
  const isMe = currentUserName === myUserName
  if(isMe){
    //是当前登陆用户
    curUserInfo = myUserInfo
  }else {
    //不是当前登陆用户
    const existResult = await isExist(currentUserName)
    if(existResult.errno!==0){
      //用户名不存在
      return
    }
    //用户名存在
    curUserInfo = existResult.data
  }
  // 获取微博第一页数据
  const result = await getProfileBlogList(currentUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  //获取粉丝
  const fansResult = await getFans(curUserInfo.id)

  // 我是否关注了此人？
  const amIFollowed = fansResult.data.userList.some(item => {
    return item.userName === myUserName 
  })
  
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      userName: currentUserName,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansResult.data.count,
        list: fansResult.data.userList
      },
      amIFollowed
    }
  })
  
})
// 广场
router.get('/square', loginRedirect, async (ctx, next) => {

  const result = await getSquareBlogList(0)
  const {
    isEmpty,
    blogList,
    pageSize,
    pageIndex,
    count
  } = result.data || {}

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})
module.exports = router;
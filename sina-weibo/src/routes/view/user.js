/**
 * @Descripttion  : 用户页面渲染相关路由
 * @Author        : 马识途
 * @Date          : 2020-04-20 11:13:16
 * @LastEditTime: 2020-04-25 09:32:14
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\view\user.js
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginCheck');
/**
 * 获取登陆信息
 * @param {Object} ctx 
 */
function getLoginInfo(ctx) {
  const userInfo = ctx.session.userInfo
  if(userInfo){
    return {
      isLogin: true,
      userName: userInfo.userName
    }
  }else{
    return {
      isLogin: false
    }
  }
}
router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})
module.exports = router;
 
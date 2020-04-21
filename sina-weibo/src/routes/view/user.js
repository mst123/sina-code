/**
 * @Descripttion  : 用户页面渲染相关路由
 * @Author        : 马识途
 * @Date          : 2020-04-20 11:13:16
 * @LastEditTime: 2020-04-21 19:53:05
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\routes\view\user.js
 */

const router = require('koa-router')();
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

module.exports = router;
 
/**
 * @Descripttion  : 广场页
 * @Author        : 马识途
 * @Date          : 2020-05-02 11:30:19
 * @LastEditTime: 2020-05-02 12:29:30
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\api\blog-square.js
*/


const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheck')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const result = await getSquareBlogList(pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router

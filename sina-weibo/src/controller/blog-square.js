/**
 * @Descripttion  : 获取广场页微博列表
 * @Author        : 马识途
 * @Date          : 2020-05-02 11:28:02
 * @LastEditTime: 2020-05-02 11:58:28
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\controller\blog-square.js
*/

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../resModel/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取广场的微博列表
 * @param {number} pageIndex pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getSquareBlogList
}
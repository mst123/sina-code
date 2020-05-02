/**
 * @Descripttion  : 个人主页controller
 * @Author        : 马识途
 * @Date          : 2020-05-01 10:14:55
 * @LastEditTime: 2020-05-02 10:22:31
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\controller\blog-profile.js
*/

const { getBlogListByUser } = require('../services/blog');
const { ErrorModel, SucessModel } = require('../resModel/ResModel');
const { PAGE_SIZE } = require('../conf/constant');
/**
 * 获取个人主页微博列表
 * @param {String} userName  用户名
 * @param {Number} pageIndex 当前页码
 */
async function getProfileBlogList(userName, pageIndex = 0){
  const result = await getBlogListByUser({
    userName,
    pageIndex,
  })
  console.log(result);
  
  return new SucessModel({
    isEmpty: result.blogList.length === 0,
    blogList: result.blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
};

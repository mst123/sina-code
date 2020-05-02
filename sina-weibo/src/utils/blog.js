/**
 * @Descripttion  : 微博数据相关的工具方法
 * @Author        : 马识途
 * @Date          : 2020-05-02 09:52:41
 * @LastEditTime: 2020-05-02 09:59:03
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\utils\blog.js
*/
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

//获取 blog-list.ejs文件
const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '../views/widgets/blog-list.ejs')
).toString()

/**
 * 根据blogList 渲染出 html 字符串
 * @param {Array} blogList 
 * @param {boolean} canReply 
 */
function getBlogListStr(blogList = [], canReply = false){
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListStr
};

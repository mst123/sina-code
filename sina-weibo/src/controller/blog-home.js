/**
 * @Descripttion  : blog 首页 controller
 * @Author        : 马识途
 * @Date          : 2020-04-25 19:48:34
 * @LastEditTime: 2020-04-25 20:19:22
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\controller\blog-home.js
*/
const xss = require('xss');
const { createBlog } =require('../services/blog');
const { SuccessModel, ErrorModel } = require('../resModel/ResModel');
const { createBlogFailInfo } = require('../resModel/errorInfo');
/**
 * 新建博客
 * @param {Object} {userId, content, image} 用户 内容 图片 
 */
async function create({userId, content, image}){
  try {
    const blog = await createBlog({
      userId, 
      content: xss(content), 
      image
    })
    return new SuccessModel(blog)
  } catch (error) {
    console.error(error);
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
};

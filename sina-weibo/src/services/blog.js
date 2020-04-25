/**
 * @Descripttion  : blog sevice
 * @Author        : 马识途
 * @Date          : 2020-04-25 19:52:13
 * @LastEditTime: 2020-04-25 20:00:14
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\services\blog.js
*/
const { Blog } = require('../db/model/index');
/**
 * 创建新微博
 * @param {Object} {userId, content, image} 用户id 内容 图片
 */
async function createBlog({userId, content, image}){
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
};

/**
 * @Descripttion  : blog sevice
 * @Author        : 马识途
 * @Date          : 2020-04-25 19:52:13
 * @LastEditTime: 2020-05-02 11:43:59
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\services\blog.js
*/
const { Blog, User } = require('../db/model/index');
const { formatUser } = require('./_format');

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
/**
 * 根据用户名获取微博列表
 * @param {Object} param  userName 用户名, pageIndex=0 当前页, pageSize=5 显示条数
 */
async function getBlogListByUser({userName, pageIndex = 0, pageSize = 5}){
  // 拼接查询条件
  const userwhereOpts = {}
  if(userName){
    userwhereOpts.userName = userName
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize*pageIndex,
    order: [
      ['id','desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userwhereOpts
      }
    ]
  })
  //result.count 总数
  //resulit.rows 查询结果
  console.log(result);
  
  //获取rows dataValues
  let blogList = result.rows.map(row => row.dataValues)
  
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}
module.exports = {
  createBlog,
  getBlogListByUser
};

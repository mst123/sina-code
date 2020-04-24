/**
 * @Descripttion : 微博数据模型
 * @Author       : 马识途
 * @Date         : 2020-04-22 19:26:18
 * @LastEditTime: 2020-04-22 19:30:50
 * @FilePath     : \projecte:\codeFile\sina-code\sina-weibo\src\db\model\blog.js
*/

const seq = require('../seq');
const { STRING, INTEGER, TEXT } = require('../type');

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog
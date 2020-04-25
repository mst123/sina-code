/**
 * @Descripttion  : blog 首页 测试文件
 * @Author        : 马识途
 * @Date          : 2020-04-25 20:38:55
 * @LastEditTime: 2020-04-25 21:24:38
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\test\blog\home.test.js
*/

const server = require('../server')
const { COOKIE } = require('../testUserInfo');
let BLOG_ID = ''
//创建微博
test('创建一个微博，应该成功', async () => {
  //定义测试内容
  const content = '单元测试'
  const image = '/2.jpg'
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', COOKIE)//浏览器里取的cookie
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  //记录微博 id
  BLOG_ID = res.body.data.id
})
/**
 * @Descripttion  : blog model test
 * @Author        : 马识途
 * @Date          : 2020-04-25 20:41:38
 * @LastEditTime: 2020-04-25 20:51:06
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\test\blog\model.test.js
*/

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性，符合预期', () => {
    // build 会构建一个内存的 User 实例，但不会提交到数据库中
    const blog = Blog.build({
        userId: 1,
        content: '微博内容',
        image: '/2.jpg',
    })
    // 验证各个属性
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('微博内容')
    expect(blog.image).toBe('/2.jpg')
})

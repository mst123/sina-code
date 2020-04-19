/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-19 17:44:41
 * @LastEditTime: 2020-04-19 17:52:28
 * @FilePath     : \hnswc-webg:\codeFile\nodeJS\sina-code\test\json.test.js
 */
const server = require('./server')

test('json 接口返回格式正确', async () => {
  const res = await server.get('/json')
  /* const res = await server.post('/login').send({
    userName: 'lisi',
    password: '123'
  }) */
  expect(res.body).toEqual({    //引用类型使用toEqual
    title: 'koa2 json'
  })
  expect(res.body.title).toBe('koa2 json')
})
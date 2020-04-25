/**
 * @Descripttion : user api test
 * @Author       : 马识途
 * @Date         : 2020-04-21 20:34:04
 * @LastEditTime: 2020-04-25 20:55:59
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\test\user\login.test.js
*/

const server = require('../server')

//用户信息

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

//存储cookie
let COOKIE = ''

//注册
test('注册一个用户，应该成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0)
})

//重复注册
test('重复注册一个用户，应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0)
})

//查询用户名是否存在
test('查询注册的用户名，应该存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).toBe(0)
})

//json schema 检测
test('非法格式注册，应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send({ 
      userName: '123', //用户名开头需要是字母或者下划线
      password: 'a', //长度 3-255
      gender: 'mail' //number类型 1-3
    })
  expect(res.body.errno).not.toBe(0)
})

//登陆
test('登陆，应该成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName,
      password
    })
  expect(res.body.errno).toBe(0)

  //获取cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// 修改基本信息
test('修改基本信息，应该成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: '测试昵称',
      city: '测试城市',
      picture: '/test.png'
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 修改密码
test('修改密码，应该成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `sadafas`
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

//删除
test('删除用户,应该成功', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 退出登录
test('退出登录，应该成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})
 
//再次查询用户，应该不存在
test('再次查询用户，应该不存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).not.toBe(0)
})
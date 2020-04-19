//insert ... 语句
const { Blog, User } = require('./model');

(async () => {
  //创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickname: '张三'
  })
  const zhangsanID = zhangsan.dataValues.id
  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickname: '李四'
  })
  const lisiID = lisi.dataValues.id
  // insert into users (...) values (...)
  console.log('zhangsan:', zhangsan.dataValues);
  //创建博客
  const blog1 = await Blog.create({
    title: '标题1',
    content: '内容1',
    userId: zhangsanID
  })
  const blog2 = await Blog.create({
    title: '标题2',
    content: '内容2',
    userId: zhangsanID
  })
  const blog3 = await Blog.create({
    title: '标题3',
    content: '内容3',
    userId: lisiID
  })
  const blog4 = await Blog.create({
    title: '标题4',
    content: '内容4',
    userId: lisiID
  })
  console.log(blog1);
  
})()
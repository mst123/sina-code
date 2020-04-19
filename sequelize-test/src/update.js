const { Blog, User } = require('./model');
(async () => {
  //更新
  const updateRes = await User.update(
    {
      nickName: '张三111'
    },{
      where: {
        userName: 'zhangsan'
      }
    }
  )
  console.log(updateRes);
  console.log(updateRes[0] > 1);
})()
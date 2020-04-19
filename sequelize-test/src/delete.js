const { User, Blog } = require('./model');

(async () => {
  //删除一条博客
  const delBlogRes = await Blog.destroy({
    where: {
      id: 4
    }
  })
  console.log(delBlogRes);
  console.log(delBlogRes > 0);
  //删除用户会把对应微博删除
  //删除一个用户
  const delUserRes = await User.destroy({
    where: {
      id: 4
    }
  })
  console.log(delUserRes);
  console.log(delUserRes > 0); 
})()
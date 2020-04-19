const { Blog, User } = require('./model');
(async () => {
  //查询一条信息
  const zhangsan = await User.findOne({
    where: {
      userName: 'zhangsan'
    }
  })
  console.log('zhangsan:',zhangsan.dataValues);
  console.log('----------------------------------\n');
  // 查询特定的列
  const zhangsanName = await User.findOne({
    attributes: ['userName', 'nickName'],
    where: {
      userName: 'zhangsan'
    } 
  })
  //查询一个列表
  const zhangsanBlogList = await Blog.findAll({
    where: {
      userId: 1
    },
    order: [
      ['id', 'desc'],
      ['title', 'desc']
    ]
  }).map(item => item.dataValues)
  console.log(zhangsanBlogList)
  console.log('----------------------------------\n');
  //分页
  const blogPageList = await Blog.findAll({
    limit: 2, //限制本次查询 2条
    offset: 2,  //跳过多少条 当前页 offset/limit + 1
    order: [
      ['id', 'desc']
    ]
  }).map(item => item.dataValues)
  console.log(blogPageList)
  console.log('----------------------------------\n');
  //查询总数并分页  
  const blogListAndCount = await Blog.findAndCountAll({
    limit: 2, //限制本次查询 2条
    offset: 2,  //跳过多少条 当前页 offset/limit + 1
    order: [
      ['id', 'desc']
    ]
  })
  console.log(
    blogListAndCount.count,
    blogListAndCount.rows.map(item => item.dataValues)
  );
  console.log('----------------------------------\n');

  //联表查询1 Blog.belongsTo(User......... 多对一
  const blogListWithUser = await Blog.findAndCountAll({
    order: [
      ['id','desc']
		],
		/* where: {
			content: '内容1'
		}, */
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName'],
        where: {
          userName: 'zhangsan'
        }
      }
    ]
  })
  console.log(
    blogListWithUser.count,
    blogListWithUser.rows.map(blog => {
      const blogValues = blog.dataValues
      blogValues.user = blogValues.user.dataValues
      return blogValues
    })
  );
  console.log('----------------------------------\n');
	//联表查询2 User.hasMany(Blog..... 一对多 ，和多对一数据结构不一样
	const userListWithBlog = await User.findAndCountAll({
		attributes: ['userName', 'nickName'],
		include: [
			{
				model: Blog
			}
		]
	})
	console.log(userListWithBlog);
	
	console.log(
    userListWithBlog.count,
    userListWithBlog.rows.map(user => {
      const userValues = user.dataValues
      userValues.blogs = userValues.blogs.map(blog => blog.dataValues)
      return userValues
    })
  );
	console.log('----------------------------------\n');
  

})()
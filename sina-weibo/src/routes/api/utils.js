/**
 * @Descripttion  : utils api 路由
 * @Author        : 马识途
 * @Date          : 2020-04-25 09:33:31
 * @LastEditTime: 2020-04-25 13:20:59
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\routes\api\utils.js
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginCheck');
const koaForm = require("formidable-upload-koa");
const { saveFile } = require('../../controller/utils');
const options = {
  uploadDir: `${__dirname}/`,
  keepExtensions: true
};


router.prefix('/api/utils')

//上传图片
router.post('/upload', loginCheck, koaForm(options), async (ctx, next) => {
  //formData.append('file',file) 前端上传接口,'file'保持一致即可
  const file = ctx.req.files['file']
  const { size, path, name, type } = file
  ctx.body = await saveFile({ 
    name, 
    type,
    size, 
    filePath: path
  })
})
module.exports = router

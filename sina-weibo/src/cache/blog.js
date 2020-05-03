/**
 * @Descripttion  : 微博缓存层
 * @Author        : 马识途
 * @Date          : 2020-05-02 11:35:40
 * @LastEditTime: 2020-05-02 11:45:15
 * @FilePath      : \hnswc-webg:\codeFile\nodeJS\sina-code\sina-weibo\src\cache\blog.js
*/
const { get, set} = require('./_redis');
const { getBlogListByUser } = require('../services/blog');
//redis key 前缀 方便识别
const KEY_PRIFIX = 'weibo:square:'
/**
 * 获取广场列表缓存
 * @param {Number} pageIndex 当前页
 * @param {Number} pageSize  页显示条数
 */
async function getSquareCacheList(pageIndex, pageSize){
  const key = `${KEY_PRIFIX}${pageIndex}_${pageSize}`

  //尝试获取缓存
  const cacheResult = await get(key)
  if(cacheResult != null){
    return cacheResult
  }else{
    // 没有缓存或者缓存过期
    const result = await getBlogListByUser(pageIndex, pageSize)
    //设置缓存 60秒
    set(key, result, 60)
    return result
  }
}

module.exports = {
  getSquareCacheList
};

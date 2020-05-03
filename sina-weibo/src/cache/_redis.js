/*
 * @Descripttion: 
 * @version: 
 * @Author: 马识途
 * @Date: 2020-04-19 15:20:28
 * @LastEditTime: 2020-04-19 15:53:05
 * @FilePath: \hnswc-webg:\codeFile\nodeJS\sina-code\src\catch\_redis.js
 */
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');
//创建redis客户端
const redisClient = redis.createClient(
  REDIS_CONF.port,
  REDIS_CONF.host
)
redisClient.on('error', error => {
  console.error(error);
})
//set
/**
 * 
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 过期时间
 */
function set(key, val, timeout = 60*60){
  if(typeof val === 'object'){
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}
//get
/**
 * @name: 
 * @test: test font
 * @msg: 
 * @param {string} key 键值 
 * @return: 
 */
function get(key){
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err){
        reject(err)
      }
      try { //尝试解析成对象
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}
module.exports = {
  set,
  get
};



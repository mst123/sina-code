/**
 * @Descripttion : http请求测试
 * @Author       : 马识途
 * @Date         : 2020-04-19 17:41:26
 * @LastEditTime: 2020-04-19 17:47:04
 * @FilePath     : \hnswc-webg:\codeFile\nodeJS\sina-code\test\server.js
 */
const Request = require('supertest');
const server = require('../src/app').callback();
module.exports = Request(server)

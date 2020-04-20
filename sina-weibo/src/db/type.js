/**
 * @Descripttion  : 封装sequelize 数据类型
 * @Author        : 马识途
 * @Date          : 2020-04-20 13:27:03
 * @LastEditTime: 2020-04-20 13:52:49
 * @FilePath      : \projecte:\codeFile\sina-code\sina-weibo\src\db\type.js
 */
const Sequelize = require('sequelize');

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL, //1-10 占用很小
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN
};

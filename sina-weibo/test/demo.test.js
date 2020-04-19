/**
 * @Descripttion : test demo
 * @Author       : 马识途
 * @Date         : 2020-04-19 17:31:14
 * @LastEditTime: 2020-04-19 17:37:15
 * @FilePath     : \hnswc-webg:\codeFile\nodeJS\sina-code\test\demo.test.js
 */
function sum(a, b){
  return a + b
}
test('10 + 20 应该等于 30', () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
})
test('10 + 20 应该不等于 40', () => {
  const res = sum(10, 20)
  expect(res).not.toBe(0)
})
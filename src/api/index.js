/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''

// 请求登陆
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})

/* ajax({
    method: 'post',
    url: BASE + '/login',
    data: { // data是对象, 默认使用json格式的请求体携带参数数据
      username,
      password
    }
    // data: qs.stringify({username, password})
  }) */


/* const name = 'admin'
const pwd = 'admin'
reqLogin(name, pwd).then(result => { // response.data的值
  // const result = response.data
  console.log('请求成功了', result)
})
 */
// 将实参数据赋值形参变量

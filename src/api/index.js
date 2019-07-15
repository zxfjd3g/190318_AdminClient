/* 
包含应用中所有请求接口的函数: 接口请求函数
*/
import qs from 'qs'
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''


// 请求登陆
export function reqLogin(username, password) {
  return ajax({
    method: 'post',
    url: BASE + '/login2',
    data: { // data是对象, 默认使用json格式的请求体携带参数数据
      username,
      password
    }
    // data: qs.stringify({username, password})
  })
}

const name = 'admin'
const pwd = 'admin2'
reqLogin(name, pwd).then(result => { // response.data的值
  // const result = response.data
  console.log('请求成功了', result)
}, error => {
  alert('请求失败了, ' + error.message)
})

// 将实参数据赋值形参变量

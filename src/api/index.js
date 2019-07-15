/* 
包含应用中所有请求接口的函数: 接口请求函数
*/
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''


// 请求登陆
export function reqLogin(username, password) {
  ajax({
    method: 'post',
    url: BASE + '/login',
    data: {
      username,
      password
    }
  })
}

const name = 'admin'
const pwd = 'admin'
reqLogin(name, pwd)

// 将实参数据赋值形参变量

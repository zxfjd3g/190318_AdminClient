/* 
封装的能发ajax请求的函数, 向外暴露的本质是axios
1. 解决post请求携带参数的问题: 默认是json, 需要转换成urlencode格式
2. 让请求成功的结果不再是response, 而是response.data的值
3. 统一处理所有请求的异常错误
*/
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// 添加请求拦截器: 让post请求的请求体格式为urlencoded格式 a=1&b2
// 在真正发请求前执行
axios.interceptors.request.use(function (config) {
  // 得到请求方式和请求体数据
  const {method, data} = config
  // 处理post请求, 将data对象转换成query参数格式字符串
  if (method.toLowerCase() === 'post' && typeof data==='object') {
    config.data = qs.stringify(data) // username=admin&password=admin
  }

  return config
})


// 添加响应拦截器
  // 功能1: 让请求成功的结果不再是response, 而是response.data的值
  // 功能2: 统一处理所有请求的异常错误
// 在请求返回之后且在我们指定的请求响应回调函数之前
axios.interceptors.response.use(function (response) {
  
  return response.data // 返回的结果就会交给我们指定的请求响应的回调
  // return response // 返回的结果就会交给我们指定的请求响应的回调
}, function (error) { // 统一处理所有请求的异常错误
  message.error('请求出错 ' + error.message)
  // return Promise.reject(error);
  // 返回一个pending状态的promise, 中断promise链
  return new Promise(() => {})
});


export default axios
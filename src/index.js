/* 
入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import store from './redux/store'

ReactDOM.render(<App store={store}/>, document.getElementById('root'))

// 绑定监视store内部状态数据改变的监听
store.subscribe(() => { // 重新渲染标签
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
})

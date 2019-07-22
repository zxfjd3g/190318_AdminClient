/* 
入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import store from './redux/store'

ReactDOM.render((
  /* Provider会将接收到store对象提供给所有的容器组件 */
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))

// 绑定监视store内部状态数据改变的监听
/* store.subscribe(() => { // 重新渲染标签
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}) */

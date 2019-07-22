/* 
redux最核心的管理对象: store
*/
import {createStore} from 'redux'

import reducer from './reducer'

// 根据指定的reducer函数, 产生一个store对象
// store对象内部管理新状态数据, 状态数据的初始值为第一次调用reducer()的返回值
const store = createStore(reducer)
export default store
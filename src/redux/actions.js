/* 
包含n个用于创建action对象/函数的工厂函数(action creator)
*/

import { reqLogin } from '../api'
import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  SHOW_ERROR,
  LOGOUT
} from "./action-types"
import storageUtils from '../utils/storageUtils'
/* 
设置头部标题的同步action
*/
export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, data: headerTitle})

/* 
接收用户的同步action
*/
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

/* 
显示错误信息的同步action
*/
export const showError = (errorMsg) => ({type: SHOW_ERROR, errorMsg})

/* 
退出登陆的同步action
*/
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  // 返回一个action对象
  return {type: LOGOUT}
}

/* 
登陆的异步action
*/
export function login(username, password) {
  return async dispatch => {
    // 1. 发登陆的异步ajax请求
    const result = await reqLogin(username, password)
    // 2. 请求结束, 分发同步action
    // 2.1. 如果成功了, 分发成功的同步action
    if (result.status===0) {
      const user = result.data
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    } else { // 2.1. 如果失败了, 分发失败的同步action
      const msg = result.msg
      dispatch(showError(msg))
    }
    
  }
}


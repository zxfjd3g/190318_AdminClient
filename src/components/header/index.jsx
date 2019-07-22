import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import {connect} from 'react-redux'

import {logout} from '../../redux/actions'
import LinkButton from '../../components/link-button'
import {reqWeather} from '../../api'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'

import './index.less'

class Header extends Component {


  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', // 图片url
    weather: '', // 天气文本
  }

  /* 
    退出登陆
  */
  logout = () => {
    // 显示确认提示
    Modal.confirm({
      title: '确认退出吗?',
      onOk: () => {
        console.log('OK');
        this.props.logout()
      },
      onCancel() {
        console.log('Cancel');
      },
    })
    
  }

  /* 
  根据当前请求的path得到对应的title
  */
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuList.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
      
    })

    return title
  }

  /* 
  获取天气信息显示
  */
  getWeather = async () => {
    // 发请求
    const { dayPictureUrl, weather } = await reqWeather('北京')
    // 更新状态
    this.setState({
      dayPictureUrl, 
      weather
    })
  }


  componentDidMount () {
    // 启动循环定时器
    this.intervalId = setInterval(() => {
      // 将currentTime更新为当前时间值
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000);
    // 发jsonp请求获取天气信息显示
    this.getWeather()
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }


  render() {

    const { currentTime, dayPictureUrl, weather } = this.state 

    const user = this.props.user
    // 得到当前需要显示的title
    // const title = this.getTitle()
    const title = this.props.headerTitle

    return (
      <div className="header">
        <div className="header-top">
          欢迎, {user.username} &nbsp;&nbsp;

          {/* 组件的标签体作为标签的children属性传入 */}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{ currentTime }</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ 
    headerTitle: state.headerTitle,
    user: state.user
   }),  // state: 总状态  {headerTitle, user}
  { logout }
)(withRouter(Header))

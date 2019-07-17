import React, { Component } from 'react'
import {
  Card, 
  Button, 
  Icon, 
  Table,
  message,
} from 'antd'

import { reqCategorys } from '../../api'
import LinkButton from '../../components/link-button'



/**
 * 分类管理
 */
export default class Category extends Component {

  state = {
    categorys: [], // 所有分类的数组
    loading: false, // 是否正在请求加载中
  }

  /* 
  初始化table的所有列信息的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: () => <LinkButton>修改分类</LinkButton>
      },
    ]
  }

  /* 
    异步获取分类列表显示
  */
  getCategorys  = async () => {
    // 显示loading
    this.setState({ loading: true })
    // 发异步ajax请求
    const result = await reqCategorys()
    // 隐藏loading
    this.setState({ loading: false })
    if (result.status===0) { // 成功了
      // 取出分类列表
      const categorys = result.data
      // 更新状态categorys数据
      this.setState({
        categorys
      })
    } else {
      message.error('获取分类列表失败了')
    }
  }

  componentWillMount () {

    this.initColumns()
  }

  componentDidMount () {
    this.getCategorys()
    
  }

  render() {

    // 取出状态数据
    const { categorys, loading } = this.state

    // Card右上角的结构
    const extra = (
      <Button type="primary">
        <Icon type="plus"/>
        添加
      </Button>
    )

    return (
      <Card extra={extra}>
        <Table 
          bordered={true}
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={categorys}
          pagination={{ defaultPageSize: 6, showQuickJumper: true}}
        />
      </Card>
    )
  }
}

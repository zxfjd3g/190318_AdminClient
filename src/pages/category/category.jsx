import React, { Component } from 'react'
import {
  Card, 
  Button, 
  Icon, 
  Table,
  message,
  Modal
} from 'antd'

import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../components/link-button'
import AddUpdateForm from './add-update-form'



/**
 * 分类管理
 */
export default class Category extends Component {

  state = {
    categorys: [], // 所有分类的数组
    loading: false, // 是否正在请求加载中
    showStatus: 0, // 0: 不显示, 1: 显示添加, 2: 显示修改
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

  /* 
    点击确定的回调: 去添加/修改分类
  */
  handleOk = () => {

    // 进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 验证通过后, 得到输入数据
        const { categoryName } = values
        // 发添加分类的请求
        const result = await reqAddCategory(categoryName)

        this.setState({ showStatus: 0 })

        // 根据响应结果, 做不同处理
        if (result.status===0) {
          // 重新获取分类列表显示
          this.getCategorys()
          message.success('添加分类成功')
        } else {
          message.error('添加分类失败')
        }
      }
    })

    


  }

  /* 
    点击取消的回调
  */
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }


  componentWillMount () {

    this.initColumns()
  }

  componentDidMount () {
    this.getCategorys()

  }

  render() {

    // 取出状态数据
    const { categorys, loading, showStatus } = this.state

    // Card右上角的结构
    const extra = (
      <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
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

        <Modal
          title={showStatus === 1 ? "添加分类" : "修改分类"}
          visible={showStatus!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 将子组件传递过来的form对象保存到当前组件对象上 */}
          <AddUpdateForm setForm={form => this.form = form} />
        </Modal>
      </Card>
    )
  }
}


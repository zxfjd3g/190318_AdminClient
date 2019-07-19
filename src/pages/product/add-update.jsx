import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button
} from 'antd'

import {reqCategorys} from '../../api'
import PicturesWall from './pictures-wall'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils';

const Item = Form.Item
const Option = Select.Option

/*
商品添加/更新的路由组件
*/
class ProductAddUpdate extends Component {

  state = {
    categorys: []
  }

  getCategorys = async () => {
    const result = await reqCategorys()
    if (result.status === 0) {
      const categorys = result.data
      this.setState({ categorys })
    }
  }

  /* 
  对价格进行自定义验证
  */
 validatePrice = (rule, value, callback) => {
    if (value==='') {
      callback()
    } else if (value * 1 <=0) {
      callback('价格必须大于0')
    } else {
      callback()
    }
 }

 /* 
  处理提交的回调
 */
 handleSubmit = (event) => {
   // 阻止事件的默认行为(提交表单)
   event.preventDefault()

   // 进行统一的表单验证
   this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {name, desc, price, categoryId} = values
        console.log('发送请求', name, desc, price, categoryId)
      } 
    })
 }

 componentWillMount () {
   this.product = memoryUtils.product
   this.isUpdate = !!this.product._id
 }

  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const { categorys } = this.state
    const {isUpdate, product} = this

    const { getFieldDecorator } = this.props.form
   
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    // 指定form中所有item的布局
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title}>
        <Form {...formLayout} onSubmit={this.handleSubmit}>
          <Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [
                { required: true, message: '必须输入商品名称!' }
              ],
            })(<Input placeholder="商品名称"/>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [
                { required: true, message: '必须输入商品描述!' }
              ],
            })(<Input placeholder="商品描述"/>)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                { required: true, message: '必须输入价格!' },
                { validator: this.validatePrice }
              ],
            })(<Input type="number" placeholder="商品价格" addonAfter="元"/>)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator('categoryId', {
              initialValue: product.categoryId || '',
              rules: [
                { required: true, message: '必须输入商品分类!' }
              ],
            })(
              <Select>
                <Option value=''>未选择</Option>
                {
                  categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                }
              </Select>
            )}
          </Item>
          <Item label="商品图片">
            <PicturesWall />
          </Item>
          <Item label="商品详情">
            <div>商品详情组件</div>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
       </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)


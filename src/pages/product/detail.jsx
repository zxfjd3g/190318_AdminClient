import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Card,
  Icon,
  List
} from 'antd'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import { BASE_IMG } from '../../utils/Constants'
import {reqCategory} from '../../api'

const Item = List.Item

/* 
商品详情路由组件
*/
export default class ProductDetail extends Component {

  state = {
    categoryName: '',
    product: memoryUtils.product
  }

  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId)
    if (result.status===0) {
      const categoryName = result.data.name
      this.setState({ categoryName })
    }
  }

  componentDidMount () {
    const product = memoryUtils.product
    if (product._id) {
      this.getCategory(product.categoryId)
    }

    // 如果当前product状态没有数据, 根据id参数中请求获取商品并更新
    if (!this.state.product._id) {
      setTimeout(() => {
        const id = this.props.match.params.id

        const product = {
          "status": 1,
          "imgs": [
            "image-1559402396338.jpg"
          ],
          "_id": id,
          "name": "联想ThinkPad--" + id,
          "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
          "price": 65999,
          "categoryId": "5ca9db9fb49ef916541160cc",
          "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
          "__v": 0
        }
        // this.getCategory(product.categoryId)
        this.setState({
          product
        })
      }, 1000)
    }
  }

  render() {
    const { categoryName } = this.state
    const product = this.state.product
   
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"/>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="detail">
        <List>
          <Item>
            <span className="detail-left">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="detail-left">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="detail-left">商品价格:</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className="detail-left">所属分类:</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className="detail-left">商品图片:</span>
            <span>
              {
                product.imgs && product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="img" />)
              }
              
            </span>
          </Item>
          <Item>
            <span className="detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: product.detail}}></div>
          </Item>
        </List>
      </Card>
    )
  }
}

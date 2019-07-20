import React, { Component } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './product.less'

import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'

/**
 * 商品管理
 */
export default class Product extends Component {

  render () {
    return (
      <Switch>
        <Route path="/product" exact component={ProductHome}/>
        <Route path="/product/addupdate" component={ProductAddUpdate}/>
        <Route path="/product/detail/:id" component={ProductDetail}/>
        <Redirect to="/product" />
      </Switch>
    )
  }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
const FormItem = Form.Item

@inject('store')
@observer
class FromBox extends Component {
    constructor(){
        super()
    }
  
    render(){
    }
}

export default Form.create()(FromBox);
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
    handleSubmit = (e) => {
        e.preventDefault()
        let { updateLoading } = this.props.store
        let { form } = this.props
        this.props.submit(form, updateLoading)
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        // <Input autocomplete="new-password"  prefix={<span className='font icon-mima'></span>} type="password" placeholder="admin" />
                        <Input autocomplete="new-password" prefix={<Icon type="lock" />} name="loginPass" type="password" placeholder="登录密码" />
                    )}
                </FormItem>
                <p className="forgetPass">
                    <Link to="/regist">忘记密码？</Link>
                </p>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="l_button" loading={this.props.LoginLoading}>
                        登录
                    </Button>
                </FormItem>
                <p className="toRegist">
                    没有BitCoCo账号？
                    <Link to="/regist">立即注册</Link>
                </p>
            </Form>
        )
    }
}

export default Form.create()(FromBox);
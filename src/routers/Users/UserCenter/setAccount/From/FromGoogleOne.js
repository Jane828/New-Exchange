import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon ,message} from 'antd'
import { inject, observer } from 'mobx-react'
import boundSuc from '../img/boundSuccess.png'
import emailPng from '../img/emailPng.png'
import transNum from '../img/transNum.png'
import googlePng from '../img/googlePng.png'
const FormItem = Form.Item

@inject('store')
@observer
class FromGoogleOne extends Component {
    constructor(){
        super()
    }
    state={
        codeHtml:'获取邮箱验证码',
        timeAll: 60,
        codeDisType:false
    }
    countDown = () => {
        var num = this.state.timeAll;
        var _this = this;
        setTimeout(function(){
            if(num){
                _this.setState({codeHtml:num + '秒后重新获取',codeDisType:true})
                _this.state.timeAll = num - 1;
                _this.countDown();
            }else {
                _this.setState({codeHtml: '获取邮箱验证码',codeDisType:false})
                _this.state.timeAll = 60;
            } 
        },1000)
    }
    getEmailMessage=()=>{
        let _this=this
        message.info('已向您的邮箱发送了验证邮件，请注意查收。');
        _this.countDown()

    }

    handleSubmit = (e) => {
        e.preventDefault()
        let { updateLoading } = this.props.store
        let { form } = this.props
        this.props.submit(form, updateLoading)
    }
    componentDidMount  () {
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        // this.props.form.getFieldValue({'userName': '666'})
    }
    
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store
        return (
            <Form onSubmit={this.handleSubmit} className='pho-input-one'>
                {
                    this.props.isAuthentication?
                    <FormItem>
                        {getFieldDecorator('userName', {
                            initialValue:this.props.email
                        })(
                            // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                            <Input 
                                className='pho-input-google' 
                                size="large" 
                                prefix={<img className='pho-input-emailimg'style={{width:'20px'}} src={googlePng}/>} 
                                disabled
                                
                                />
                        )}
                    </FormItem>:''
                }
                <FormItem>
                    {getFieldDecorator('userName', {
                        initialValue:this.props.email
                    })(
                        // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                        <Input 
                            className='pho-input-email' 
                            size="large" 
                            prefix={<img className='pho-input-emailimg'style={{width:'20px'}} src={emailPng}/>} 
                            disabled
                            
                             />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入验证码' }],
                    })(
                        // <Input autocomplete="new-password"  prefix={<span className='font icon-mima'></span>} type="password" placeholder="admin" />
                        <Input 
                        className='pho-input-trans' 
                        size="large" 
                        prefix={<img className='pho-input-emailimg' style={{width:'20px'}} src={transNum}/>} 
                        placeholder="输入验证码"
                        addonAfter={
                            <Button 
                                size="large" 
                                disabled={this.state.codeDisType} 
                                onClick={this.getEmailMessage}
                                loading={this.state.codeLoading} 
                                type="primary">
                                {this.state.codeHtml}
                            </Button>}
                        />
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(FromGoogleOne);
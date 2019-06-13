import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon ,message} from 'antd'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import { inject, observer } from 'mobx-react'
import boundSuc from '../img/boundSuccess.png'
import emailPng from '../img/emailPng.png'
import transNum from '../img/transNum.png'
import googlePng from '../img/googlePng.png'
const FormItem = Form.Item

@inject('store')
@observer
class BoundPhoOne extends Component {
    constructor(){
        super()
    }
    state={
        codeHtml:'获取邮箱验证码',
        timeAll: 60,
        codeDisType:false,
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
        let obj = {
            type: 'emailbindphone',
            account: this.props.email,
            receiver : 'email'
        }
        CgicallPost("/apiv1/visitor/getValidateCode",obj,function(d){
            if(d.result) {
                message.success('已向您的邮箱发送了验证邮件，请注意查收');
                _this.countDown()

            }else {
                message.error(GetErrorMsg(d));
            } 
        });
    }
    phoNextNum = (e) => {
        let _this=this
        let inputEmailCode = this.props.form.getFieldValue('inputEmailCode')
        let googleCode = this.props.form.getFieldValue('googleCode')||''
        let obj = {
            type: 'emailbindphone',
            account: this.props.email,
            code : inputEmailCode
        }
        if(this.props.isAuthentication){
            if(googleCode==''||googleCode==undefined){
                message.error('Google验证码不能为空')
                return
            }
        }
        if(inputEmailCode==''||inputEmailCode==undefined){
            message.error('邮箱验证码不能为空')
            return
        }
        CgicallPost("/apiv1/visitor/validateCodeExist",obj,function(d){
            if(d.result) {
                _this.props.passValueTwo({inputEmailCode,googleCode})
            }else {
                message.error(GetErrorMsg(d));
            } 
        });
    }


   
    
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store
        return (
            <Form  className='pho-input-one'>
                {
                    this.props.isAuthentication?
                    <FormItem>
                        {getFieldDecorator('googleCode', {
                            rules: [{ required: true, message: '请输入验证码' }],
                        })(
                            // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                            <Input 
                                className='pho-input-google' 
                                size="large" 
                                prefix={<img className='pho-input-emailimg'style={{width:'20px'}} src={googlePng}/>}
                                />
                        )}
                    </FormItem>:null
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
                    {getFieldDecorator('inputEmailCode', {
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
                <Button className='nextMessageNum' type="primary" onClick={this.phoNextNum} >下一步</Button>
            </Form>
        )
    }
}

export default Form.create()(BoundPhoOne);
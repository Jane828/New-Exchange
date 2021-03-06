import React, { Component } from 'react'
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
class FromGoogleOne extends Component {
    constructor(){
        super()
    }
    state={
        codeHtml:'获取邮箱验证码',
        timeAll: 60,
        codeDisType:false,
        codePhoHtml:'获取手机验证码',
        timePhoAll: 60,
        codeDisPhoType:false
    }
    //邮箱验证码
    countDown = () => {
        let num = this.state.timeAll;
        let _this = this;
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
    getEmailCode=()=>{
        let _this=this
        let obj = {
            type: 'authemailcode',
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
    //手机验证码
    countPhoDown = () => {
        let num = this.state.timePhoAll;
        let _this = this;
        setTimeout(function(){
            if(num){
                _this.setState({codePhoHtml:num + '秒后重新获取',codeDisPhoType:true})
                _this.state.timePhoAll = num - 1;
                _this.countPhoDown();
            }else {
                _this.setState({codePhoHtml: '获取邮箱验证码',codeDisPhoType:false})
                _this.state.timePhoAll = 60;
            } 
        },1000)
    }
    getPhoCode=()=>{
        let _this=this
        let obj = {
            type: 'authphonecode',
            account: this.props.phone,
            receiver : 'phone'
        }
        CgicallPost("/apiv1/visitor/getValidateCode",obj,function(d){
            if(d.result) {
                message.success('已向您的邮箱发送了验证邮件，请注意查收');
                _this.countPhoDown()

            }else {
                message.error(GetErrorMsg(d));
            }
        });
    }
    //************
    googleNextNum=()=>{
        let _this=this
        let inputEmailCode = this.props.form.getFieldValue('inputEmailCode')
        let phoneCode = this.props.form.getFieldValue('phoneCode')
        let obj = {
            type: 'authemailcode',
            account: this.props.email,
            code : inputEmailCode
        }
        let obj1 = {
            type: 'authphonecode',
            account: this.props.phone,
            code : phoneCode
        }
        if(this.props.phone){
            if(phoneCode==''||phoneCode==undefined){
                message.error('手机验证码不能为空')
                return
            }
        }
        if(inputEmailCode==''||inputEmailCode==undefined){
            message.error('邮箱验证码不能为空')
            return
        }
        CgicallPost("/apiv1/visitor/validateCodeExist",obj,function(d){
            if(d.result) {
                if(_this.props.phone){
                    CgicallPost("/apiv1/visitor/validateCodeExist",obj1,function(e){
                        if(e.result) {
                            _this.goPageURL(inputEmailCode,phoneCode);
                        }else {
                            message.error('手机验证码错误');
                            return
                        } 
                    });
                }else {
                    _this.goPageURL(inputEmailCode,phoneCode);
                }  
            }else {
                message.error('邮箱验证码错误');
            } 
        });
    }
    goPageURL = (inputEmailCode,phoneCode) => {
        sessionStorage.googleT = true;
        sessionStorage.gooBoundCode = true;
        sessionStorage.inputEmailCode = inputEmailCode || '';
        sessionStorage.phoneCode = phoneCode || '';
        //初始化session
        sessionStorage.changeSuc = '';
        sessionStorage.emailChangeCode = '';
        sessionStorage.phoneChangeCode = '';
        sessionStorage.googleChangeCode = '';
        // _this.props.history.push({ pathname :'/users/userCenter/googleTrans' ,query : { gooBoundCode:true,inputEmailCode: inputEmailCode,phoneCode:phoneCode}})
        this.props.history.push({ pathname :'/users/userCenter/googleTrans'})
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store
        return (
            <Form className='pho-input-one'>
                {
                    this.props.phone?
                    <FormItem>
                        {getFieldDecorator('phoneCode', {
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
                                    disabled={this.state.codeDisPhoType}
                                    onClick={this.getPhoCode}
                                    loading={this.state.codeLoading} 
                                    type="primary">
                                    {this.state.codePhoHtml}
                                </Button>}
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
                                onClick={this.getEmailCode}
                                loading={this.state.codeLoading} 
                                type="primary">
                                {this.state.codeHtml}
                            </Button>}
                        />
                    )}
                </FormItem>
                <Button className='nextMessageNum' type="primary" onClick={this.googleNextNum}>下一步</Button>
            </Form>
        )
    }
}

export default Form.create()(FromGoogleOne);
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
        codeDisPhoType:false,
        arr:[],
        type: '',
        changePho:'phone',
        changeGoogle:'google',
        googleHtml:'Google验证码',
        PhoHtml:'手机验证码',

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
        console.log(1)
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
            type: 'authemailcode',
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
    
    //Google下一步
    googleNextNum=()=>{
        let _this=this
        let inputEmailCode = this.props.form.getFieldValue('inputEmailCode')
        let changePhoInputCode = this.props.form.getFieldValue('changePhoInputCode')||''
        let changeGoogleInputCode = this.props.form.getFieldValue('changeGoogleInputCode')||''
        let obj = {
            type: 'authemailcode',
            account: this.props.email,
            code : inputEmailCode
        }
        CgicallPost("/apiv1/visitor/validateCodeExist",obj,function(d){
            if(d.result) {
                _this.props.passChangeValueTwo({inputEmailCode,changePhoInputCode,changeGoogleInputCode})
                _this.props.nextGoogleTwo()
            }else {
                message.error(GetErrorMsg(d));
            } 
        });
    }
    changeType = (that,e) => {
        this.setState({
            type:e
        }) 
    }
    componentWillMount =()=>{
        if(this.props.isAuthentication) this.state.arr.push("google")
        if(this.props.phone) this.state.arr.push("phone");
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store 
        
        if(!this.state.type) {
            console.log('this.state.arr',this.state.arr)
            this.state.type = this.state.arr[0];//如果是存在两种认证的时候arr=['google','phone'];
        }
        return (
            <Form className='pho-input-one'>
                {/* <div  style={{display:(type == 'google')?'block':'none'}}>
                    google
                    <a style={{display:(this.props.arr.length >　1)?"block":"none"}} onClick={this.change.bins(this,'phone')}>找手机</a>
                </div>
                <div  style={{display:(type == 'phone')?'block':'none'}}>
                    phone
                    <a style={{display:(this.props.arr.length >　1)?"block":"none"}} onClick={this.change.bins(this,'google')}>找google</a>
                </div> */}
                <div style={{display:(this.state.type == 'google')?'block':'none'}} >
                    <FormItem className={(this.state.arr.length > 1)?'changeCode':null}>
                        {getFieldDecorator('changeGoogleInputCode', {
                            rules: [{ required: true, message: '请输入验证码' }],
                        })(
                            // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                            <Input 
                                className='pho-input-google' 
                                size="large" 
                                prefix={<img className='pho-input-emailimg'style={{width:'20px'}} src={googlePng}/>}
                                />
                        )}
                    </FormItem>
                    <p style={{display:(this.state.arr.length > 1)?"block":"none"}} className='changeGooglePho'>使用<a href="javascript:void(0);" onClick={this.changeType.bind(this,'google')}>Google验证码</a></p>
                </div> 
                <div style={{display:(this.state.type == 'phone')?'block':'none'}}>
                    <FormItem className={(this.state.arr.length > 1)?'changeCode':null}>
                        {getFieldDecorator('changePhoInputCode', {
                            rules: [{ required: true, message: '请输入手机验证码' }],
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
                                    disabled={this.state.codePhoType}
                                    onClick={this.getPhoCode}
                                    loading={this.state.codeLoading}
                                    type="primary">
                                    {this.state.codePhoHtml}
                                </Button>}
                            />
                        )}
                    </FormItem>
                    <p style={{display:(this.state.arr.length > 1)?"block":"none"}} className='changeGooglePho'>使用<a href="javascript:void(0);" onClick={this.changeType.bind(this,'phone')}>手机验证码</a></p>
                </div>    
                {/* ******************** */}
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
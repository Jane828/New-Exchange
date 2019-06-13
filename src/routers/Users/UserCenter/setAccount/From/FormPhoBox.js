import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon,message ,Select} from 'antd'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import { inject, observer } from 'mobx-react'
import boundSuc from '../img/boundSuccess.png'
import emailPng from '../img/emailPng.png'
import transNum from '../img/transNum.png'
import Phone from '../img/phone.png'
import googlePng from '../img/googlePng.png'
const FormItem = Form.Item
const Option = Select.Option;

@inject('store')
@observer
class FromBox extends Component {
    constructor(){
        super()
    }
    state={
        codeHtml:'获取短信验证码',
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
    getPhoMessage = ()=>{
        let _this=this
        let inputPhoNumber = this.props.form.getFieldValue('phoNumber')
        let obj = {
            type: 'phonebindphone',
            account: inputPhoNumber,
            receiver : 'phone'
        }
        CgicallPost("/apiv1/visitor/getValidateCode",obj,function(d){
            if(d.result) {
                message.success('已向您的手机号发送了验证短信，请注意查收');
                _this.countDown()

            }else {
                message.error(GetErrorMsg(d));
            }
        });

    }
    
     phoNextSuc= (e) => {
        let _this=this
        let inputPhoNumber = this.props.form.getFieldValue('phoNumber')
        let inputPhoCode = this.props.form.getFieldValue('inputPhoCode')
        let obj = {
            phonecode: inputPhoCode,
            emailcode: this.props.emailCode,
            phone : inputPhoNumber
        }
        let obj1 = {
            phonecode: inputPhoCode,
            emailcode: this.props.emailCode,
            phone : inputPhoNumber,
            authtoken: this.props.googleCode
        }
        if(inputPhoCode==''||inputPhoCode==undefined){
            message.error('手机验证码不能为空')
            return
        }
        if(this.props.isAuthentication){
            CgicallPost("/apiv1/user/bindPhoneWithAuth",obj1,function(d){
                if(d.result) {
                    _this.props.nextThree()
                }else {
                    if(d.error.code==5006){
                        _this.props.codeExpires()
                        message.error('验证码过期');
                        return
                    }else if(d.error.code==7001){
                        message.error('该手机号已经被注册');
                        return
                    }
                    message.error('手机号码格式错误');
                } 
            });
        }else{
            CgicallPost("/apiv1/user/bindPhone",obj,function(d){
                if(d.result) {
                    _this.props.nextThree()
                }else {
                    if(d.error.code==5006){
                        _this.props.codeExpires()
                        message.error('验证码过期');
                        return
                    }else if(d.error.code==7001){
                        message.error('该手机号已经被注册');
                        return
                    }
                    message.error('手机号码格式错误');
                } 
            });
        }
        
    }
    
    
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store
        // const selectPhoAfter = (
        //     <Select defaultValue="中国" className='selectCouPho'>
        //       <Option value="zh">中国</Option>
        //       <Option value="jp">安哥拉</Option>
        //       <Option value="cn">美国</Option>
        //       <Option value="org">法国</Option>
        //     </Select>
        //   );
          const selectPhoAfter = getFieldDecorator('prefix', {
            initialValue: 'china',
          })(
            <Select className='selectCouPho'>
              <Option value="china">中国</Option>
            <Option value="america">美国</Option>
            <Option value="france">法国</Option>
            <Option value="britain">英国</Option>
            <Option value="korea">韩国</Option>
            <Option value="Japan">日本</Option>
            <Option value="canada">加拿大</Option>
            <Option value="brazil">巴西</Option>
            </Select>
          );
        return (
            <Form onSubmit={this.handleSubmit} className='pho-input-two'>
                <FormItem className='pho-input-two-wrapper'>
                    {getFieldDecorator('phoNumber', {
                        rules: [{ required: true, message: '请输入手机号' }],
                    })(
                        // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                        <Input 
                            className='pho-input-email'
                            placeholder="输入手机号" 
                            size="large"
                            prefix={<img className='pho-input-emailimg'style={{width:'14px',height:'20px'}} src={Phone}/>}
                            addonAfter={selectPhoAfter}
                             />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('inputPhoCode', {
                        rules: [{ required: true, message: '请输入验证码' }],
                    })(
                        // <Input autocomplete="new-password"  prefix={<span className='font icon-mima'></span>} type="password" placeholder="admin" />
                        <Input 
                        className='pho-input-trans' 
                        size="large" 
                        onChange={this.getInputPhoCode}
                        prefix={<img className='pho-input-emailimg' style={{width:'20px'}} src={transNum}/>}
                        placeholder="输入验证码"
                        addonAfter={
                            <Button 
                                size="large" 
                                disabled={this.state.codeDisType}
                                loading={this.state.codeLoading}
                                onClick={this.getPhoMessage}
                                type="primary">
                                {this.state.codeHtml}
                            </Button>}
                        />
                    )}
                </FormItem>
                <Button className='nextMessageNum' type="primary" onClick={this.phoNextSuc}>下一步</Button>
            </Form>
        )
    }
}

export default Form.create()(FromBox);
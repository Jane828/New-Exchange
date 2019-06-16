import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon, Tooltip, message, Checkbox} from 'antd'
import { inject, observer } from 'mobx-react'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
const FormItem = Form.Item;
const Search = Input.Search;

@inject('store')
@observer
class FromBox extends Component {
    constructor(){
        super()
    }
    state = {
        codeHtml:'获取邮箱验证码',
        codeDisType:false,
        timeAll: 60,
        confirmDirty: false,
        passGrade: '',
        grade: '',
        gradeStr: '',
        btnDisType: true,
        codeLoading:false
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
    drawingImg = (form, updateLoading) => {
        let _this = this;
        this.props.form.validateFields(['email'],{first:true},(err, values) => {
            if(!err) {
                this.setState({codeLoading:true})
                let captcha1 = new TencentCaptcha('2038116476', function(res) {
                    if(res.ret === 0){
                        // var obj = {
                        //     "Aid" : res.appid,
                        //     "Ticket" : res.ticket,
                        //     "Randstr" : res.randstr
                        // }
                        var obj = {
                            username: _this.props.form.getFieldValue('email'),
                            type: 'reg',
                            userip : res.appid,
                            ticket : res.ticket,
                            randstr : res.randstr
                        }
                        _this.setState({codeLoading:true})
                        _this.getAuthCode(obj);
                        // CgicallPost("/api/v1/visitor/email-code",obj,function(d){
                        //     if(d.code === 0) {
                        //         _this.setState({codeLoading:true})
                        //         _this.getAuthCode();
                        //     }else {
                        //         message.error(GetErrorMsg(d));
                        //     }
                            
                        // });
                    }
                });
                captcha1.show();
                setTimeout(() => {
                    this.setState({ codeLoading: false});
                }, 3000);
            }    
        })
    }
    // 获取邮箱验证码
    getAuthCode = (obj) => {
        // var obj = {
        //     type: 'register',
        //     account: this.props.form.getFieldValue('email'),
        //     receiver : 'email'
        // }
        var _this = this;
        CgicallPost("/api/v1/visitor/email-code",obj,function(d){
            console.log(d)
            if(d.code === 0) {
                message.success('验证码已发送到您的邮箱上，请注意查收');
                _this.countDown();
            }else {
                message.error(GetErrorMsg(d));
            }
            
        });
        setTimeout(() => {
            this.setState({ codeLoading: false});
        }, 3000);
    }
    CheckboxChange = (e) => {
        this.setState({ btnDisType: e.target.checked});
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }
    
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        const reg =/\s/;
        let passVal = form.getFieldValue('password');
        if(passVal && reg.test(passVal)) {
            callback("非法格式，密码不能存在空格");
            this.setState({passGrade: '',grade:''});
            return;
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['confPassword'], { force: true });
        }
        if(passVal && passVal.length>=6 && (!this.getPassGrade('',passVal))) {
            callback("密码不能全为数字！");
        }else {
            callback();
        }
        
    }
    codeType = (rule, value, callback) => {
        const form = this.props.form;
        const reg =/^[0-9]*$/;
        let codeVal = form.getFieldValue('emailCode');
        if(codeVal && !reg.test(codeVal)) {
            callback("验证码只能为数字！");
        }
        callback();
    }
    getPassGrade = (event,value)=> {
        let passVal =event ? event.target.value : value;
        let hasNum = false;
        let hasWord = false;
        let hasChar = false;
        if(passVal){
            for(var i=0; i<passVal.length; i++){ 
                var charType=0; 
                var t=passVal.charCodeAt(i); 
                if(t>=48 && t <=57){hasNum = true;} //为0～9十个阿拉伯数字
                else if((t>=65 && t <=90) || (t>=97 && t <=122)){hasWord = true;} //为26个大写英文字母 为26个小写英文字母
                else{hasChar = true;} 
            } 
            // }
            if(passVal.length >= 6 && passVal.length <=8 && (hasWord || hasChar)) {
                this.setState({passGrade: 'lowGrade',grade:'低',gradeStr: 'low'})
            }
            if(passVal.length >= 9 && passVal.length <=20 ) {
                if((hasNum && hasWord) || (hasWord && hasChar) || (hasNum && hasChar)) {
                    this.setState({passGrade: 'middleGrade',grade:'中',gradeStr: 'medium'});
                }

            }
            if(passVal.length >= 9 && passVal.length <=20 ) {
                if(hasNum && hasWord && hasChar) this.setState({passGrade: 'highGrade',grade:'高',gradeStr: 'high'});
            }
            if(passVal.length <6) {
                this.setState({passGrade: '',grade:''});
            }
        }
        if(!(hasWord || hasChar)) {
            this.setState({passGrade: '',grade:''});
            return false;
        }else {
            return true;
        }
    }
    agreement = (e) => {
        e.preventDefault()
        this.props.userContract();    
    }
    handleSubmit = (e) => {
        console.log('注册-------------------')
        console.log('e', e)
        console.log('this.prop:', this.prop)
        let inputuserName = this.props.form.getFieldValue('email')
        console.log('注册时填入的账号：', inputuserName)
        // const { getFieldDecorator } = this.props.form;
        e.preventDefault()
        let { updateLoading } = this.props.store
        let { form } = this.props
        this.props.submit(form, updateLoading, this.state.gradeStr)
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading } = this.props.store
        return (
            <Form onSubmit={this.handleSubmit} autocomplete="off">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱地址非法!',
                          }, {
                            required: true, message: '请输入邮箱!',
                          }],
                    })(
                        <Input autocomplete="off" prefix={<Icon type="mail" />} placeholder="邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('emailCode', {
                        validateFirst:true,
                        rules: [
                                {required: true, message: '请输入邮箱验证码!'},
                                // {type: 'number', message: '验证码只能为数字!'},
                                {validator: this.codeType },
                                {len: 6, message: '验证码的长度为6!'}
                            ],
                    })(
                        <Input className="searchInput" prefix={<Icon type="safety" />} onChange={this.codeChange} addonAfter={
                            // <Button  disabled={this.state.codeDisType} className="searchInBtn" onClick={this.getAuthCode} >
                            //     {this.state.codeHtml}
                            // </Button>} type="text" placeholder="邮箱验证码" />
                            <Button disabled={this.state.codeDisType} className="searchInBtn" 
                                onClick={this.drawingImg} loading={this.state.codeLoading}>{this.state.codeHtml}
                            </Button>} type="text" placeholder="输入6位短信验证码" />
                    )}
                </FormItem>
                <FormItem>
                    <Tooltip overlayClassName="inputTip" placement="topLeft" trigger="focus" 
                        title={<div>
                            <ul className={this.state.passGrade}>
                                <li><span></span></li>
                                <li><span></span></li>
                                <li className="grade-hight"><span></span></li>
                                <li className="gradeMsg"><span>{this.state.grade}</span></li>
                            </ul>
                            <div className="msgTip"><Icon type="warning" /> 密码由6-20位字符组成，可包含大小写字母、数字和特殊符号，且不能全为数字</div>
                        </div>
                        }>
                        {getFieldDecorator('password', {
                            validateFirst:true,
                            rules: [
                                {validator: this.validateToNextPassword },
                                {min: 6,message:'密码长度不能少于6位'},
                                {max: 20,message:'密码长度不能大于20位'},
                                {required: true, message: '请输入密码' },
                                // { validator: this.validateToNextPassword }
                            ],
                        })( 
                            <Input autocomplete="new-password off" onChange={this.getPassGrade} prefix={<Icon type="lock" />} type="password" placeholder="设置登录密码" />
                        )}
                    </Tooltip>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confPassword', {
                        rules: [
                            { required: true, message: '请输入确认密码' },
                            { validator: this.compareToFirstPassword }
                    ],
                    })(
                        <Input autocomplete="new-password off" onBlur={this.handleConfirmBlur}  prefix={<Icon type="lock" />} type="password" placeholder="确认密码" />    
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('inviteCode', {
                        initialValue: this.props.invitCode,
                    })(
                        <Input prefix={<Icon type="user-add" />} placeholder="邀请码（选填）" />
                    )}
                </FormItem>
                <FormItem className="agreement-check">
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox onChange={this.CheckboxChange}>已阅读并同意<a href="javascript:;" onClick={this.agreement}>《BitCoCo用户服务协议》</a></Checkbox>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" disabled={!this.state.btnDisType} htmlType="submit"  className="l_button" loading={loading}>
                        注册
                    </Button>
                </FormItem>
                <p className="toLogin">
                    没有BitCoCo账号？
                    <Link to="/login">立即登录</Link>
                </p>
            </Form>
        )
    }
}
export default Form.create()(FromBox);
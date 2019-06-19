import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { message, Modal, Button, Input, Form, Icon, Tabs, Tooltip } from 'antd'
import $ from 'jquery'
import md5 from 'js-md5'
import CryptoJS from 'crypto-js'
import store from '../store'
import { Cgicallget, CgicallPost, GetErrorMsg } from '@/components/Ajax'
import '../container/index.less'
import { sha256, sha224 } from 'js-sha256'
// const Search = Input.Search;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
// @inject('Store')
// @observer
class PassModal extends Component {
    state = {
        loading: false,
        emailHtml: '获取邮箱验证码',
        phoneHtml: '获取手机验证码',
        codeDisEmail: false,
        codeDisPhone: false,
        timeEmail: 60,
        timePhone: 60,
        btnNext: true,
        btnSub: false,
        type: 'email',
        account: '',
        code: '',
        password: '',
        codeLoading: false,
        pwKey: 'fdec3af2f062f9d5893d22ffb46164d7ffcbee648cffb96af79121e7b274d979',
        changePhone: '', // 更换绑定的手机号码
        gradeStr: '',
    }
    defaultModal = () => {
        this.setState({
            loading: false, 
            emailHtml: '获取邮箱验证码',
            phoneHtml: '获取手机验证码',
            codeDisType: false,
            timeAll: 60,
            btnNext: true,
            btnSub: false,
            type: 'email',
        });
    }
    countDown = (type) => {
        var num = (type == 'email') ? this.state.timeEmail : this.state.timePhone;
        var _this = this;
        let msg = (type == 'email') ? '获取邮箱验证码' : '获取手机验证码';
        setTimeout(function () {
            if (num) {
                if (type == 'email') {
                    _this.setState({ emailHtml: num + '秒后重新获取', codeDisEmail: true })
                    _this.state.timeEmail = num - 1;
                } else {
                    _this.setState({ phoneHtml: num + '秒后重新获取', codeDisPhone: true })
                    _this.state.timePhone = num - 1;
                }
                _this.countDown(type);
            } else {
                if (type == 'email') {
                    _this.setState({ emailHtml: msg, codeDisEmail: false })
                    _this.state.timeEmail = 60;
                } else {
                    _this.setState({ phoneHtml: msg, codeDisPhone: false })
                    _this.state.timePhone = 60;
                }
            }
        }, 1000)
    }
    // 忘记密码：获取邮箱或手机验证码
    drawingImg = (type, event) => {
        let _this = this;
        let { form } = (type == 'email') ? this.childEmail.props : this.childPhone.props;
        form.validateFields([type], { first: true }, (err, values) => {
            if (!err) {
                this.setState({ codeLoading: true })
                let captcha1 = new TencentCaptcha('2038116476', function (res) {
                    if (res.ret === 0) {
                        // var obj = {
                        //     "Aid" : res.appid,
                        //     "Ticket" : res.ticket,
                        //     "Randstr" : res.randstr
                        // }
                        var obj = {
                            username: '', // 在后面添加进去
                            type: 'reset',
                            userip: res.appid,
                            ticket: res.ticket,
                            randstr: res.randstr
                        }
                        _this.setState({ codeLoading: true })
                        if (type == 'email') _this.getEmailAuthCode(obj);
                        else _this.getPhoneAuthCode();
                        // CgicallPost("/api/v1/visitor/email-code",obj,function(d){
                        //     if(d.result) {
                        //         _this.setState({codeLoading:true})
                        //         if(type == 'email') _this.getEmailAuthCode();
                        //         else _this.getPhoneAuthCode();
                        //     }else {
                        //         message.error(GetErrorMsg(d));
                        //         _this.setState({codeLoading:false})
                        //     }
                        // });
                    }
                });
                captcha1.show();
                setTimeout(() => {
                    this.setState({ codeLoading: false });
                }, 3000);
            }
        })
    }
    // 获取邮箱验证码
    getEmailAuthCode = (obj) => {
        let _this = this;
        let { form } = this.childEmail.props;
        let type = 'forgotpasswordbyemail'
        if (this.props.portPass != 'forgotPassword') type = 'modifypassword';
        form.validateFields(['email'], { first: true }, (err, values) => {
            if (!err) {
                let { email } = values;
                _this.getAuthCode(email, type, 'email', obj);
            }
        })
    }
    // 获取手机验证码
    getPhoneAuthCode = () => {
        let _this = this;
        let { form } = this.childPhone.props;
        let type = 'forgotpasswordbyphone'
        if (this.props.portPass != 'forgotPassword') type = 'modifypasswordbyphone';
        form.validateFields(['mobilePhone'], { first: true }, (err, values) => {
            if (!err) {
                let { mobilePhone } = values;
                _this.getAuthCode(mobilePhone, type, 'phone');
            }
        })
    }
    // 获取邮箱/手机验证码
    getAuthCode = (account, codeType, receiver, obj) => {
        // var obj = {
        //     type: codeType,
        //     account: account,
        //     receiver : receiver
        // }
        obj.username = account
        var _this = this;
        CgicallPost("/api/v1/visitor/email-code", obj, function (d) {
            if (d.code === 0) {
                message.success('验证码已发送，请注意查收');
                _this.countDown(receiver);
                _this.setState({ codeLoading: false })
            } else {
                message.error(GetErrorMsg(d));
            }

        });
    }
    codeChange = (e) => {
        this.props.codeChange(e);
        var obj = {
            type: 'forgotpasswordbyemail',
            account: '',
            receiver: 'phone'
        }
        var _this = this;
        CgicallPost("/apiv1/visitor/getValidateCode", obj, function (d) {
            if (d.result) {
                message.success('验证码已发送到您的手机上，请注意查收');
                _this.countDown();
            } else {
                message.error(GetErrorMsg(d));
            }

        });
    }
    // 点击下一步按钮触发，现在将改处理函数并入提交事件中 2019-5-30
    nextPage = () => {
        let arr;
        var _this = this;
        if (this.state.type == 'email') arr = this.childEmail.handleSubmit();
        else arr = this.childPhone.handleSubmit();
        let type = (this.state.type == 'email') ? 'forgotpasswordbyemail' : 'forgotpasswordbyphone';
        if (this.props.portPass != 'forgotPassword') type = (this.state.type == 'email') ? 'modifypassword' : 'modifypasswordbyphone';
        if (arr && arr.length) {
            this.state.account = arr[0];
            this.state.code = arr[1];
            var obj = {
                type: type,
                account: arr[0],
                code: arr[1]
            }
            _this.state.account = arr[0];
            _this.state.code = arr[1];
            _this.setState({ btnNext: false, btnSub: true })
            // CgicallPost("/apiv1/visitor/validateCodeExist",obj,function(d){
            //     if(d.result) {
            //         // message.success('验证码已发送到您的手机上，请注意查收');
            //         // _this.countDown();
            //         _this.state.account = arr[0];
            //         _this.state.code = arr[1];
            //         _this.setState({btnNext: false,btnSub: true})
            //     }else {
            //         message.error(GetErrorMsg(d));
            //     }

            // });
        }
    }
    // 提交
    updatePass = (event) => {
        // 邮箱及验证码处理
        let arr1;
        var _this = this;
        if (this.state.type == 'email') arr1 = this.childEmail.handleSubmit();
        else arr1 = this.childPhone.handleSubmit();
        let type = (this.state.type == 'email') ? 'forgotpasswordbyemail' : 'forgotpasswordbyphone';
        if (this.props.portPass != 'forgotPassword') type = (this.state.type == 'email') ? 'modifypassword' : 'modifypasswordbyphone';
        if (arr1 && arr1.length) {
            this.state.account = arr1[0];
            this.state.code = arr1[1];
            var obj = {
                type: type,
                account: arr1[0],
                code: arr1[1]
            }
            _this.state.account = arr1[0];
            _this.state.code = arr1[1];
        }

        // 密码处理
        let arr;
        if (this.state.type == 'email') arr = this.passChildEmail.handleSubmit();
        else arr = this.passChildPhone.handleSubmit();
        if (arr && arr.length) {
            var obj = {
                username: this.state.account,
                // password: sha256(sha256(arr[0]) + sha256(arr[0]) + this.state.pwKey),
                password: md5(arr[0]),
                code: this.state.code,
                // passwordStrength: arr[1]
                phone: arr[1], // 可选
                level: arr[2],
            }
            var _this = this;
            // let url = '/apiv1/visitor/forgotPassword';
            // if(this.props.portPass != 'forgotPassword') url = '/apiv1/user/modifyPassword';
            let url = '/api/v1/visitor/email-reset';
            if (this.props.portPass != 'forgotPassword') url = '/api/v1/visitor/email-reset';
            CgicallPost(url, obj, function (d) {
                if (d.code === 0) {
                    message.success('密码重置成功！');
                    _this.props.cancelPass();
                } else {
                    message.error(GetErrorMsg(d));
                }

            });
        }
        else return false;
    }
    setPhoneChild = (childPhone) => {
        this.childPhone = childPhone
    }
    setEmailChild = (childEmail) => {
        this.childEmail = childEmail
    }
    setPassEmail = (passChild) => {
        this.passChildEmail = passChild
    }
    setPassPhone = (passChild) => {
        this.passChildPhone = passChild
    }
    handleCancelPhone = () => {
        this.props.cancelPhone();
    }
    TabChang = (key) => {
        this.state.type = key;
    }
    render() {
        const { loading, codeDisEmail, codeDisPhone, getAuthCode, emailHtml, phoneHtml, isOnly, type, codeLoading } = this.state;
        return (
            <Modal
                visible={this.props.visiblePass}
                title='重置登录密码'
                maskClosable={false}
                destroyOnClose={true}
                onOk={this.updatePass}
                onCancel={this.props.cancelPass}
                afterClose={this.defaultModal}
                footer={[
                    // 现在将邮箱验证码和重置的密码及重置的手机绑定号码放在同一个模态框中
                    // <Button type="primary" style={{display:(this.state.btnNext?'inline-block':'none')}} onClick={this.nextPage}>
                    // 下一步
                    // </Button>,
                    // <Button key="submit" type="primary" style={{display:(this.state.btnSub?'inline-block':'none')}} loading={loading} onClick={this.updatePass}>
                    // 提交
                    // </Button>,
                    <Button key="submit" type="primary" style={{ display: (this.state.btnSub ? 'inline-block' : 'inline-block') }} loading={loading} onClick={this.updatePass}>
                        提交
                    </Button>,
                ]}
            >
                <Tabs
                    onChange={this.TabChang}
                    type="card"
                    className={(this.props.bindingPhone) ? '' : 'onlyOne'}
                    defaultActiveKey='email'
                >
                    <TabPane
                        tab="邮箱重置"
                        key="email"
                        disabled={(this.state.btnSub) ? true : false}
                    >
                        <EmailCode
                            email={this.props.email}
                            className={this.state.btnNext ? '' : 'enterPass'}
                            setEmailChild={this.setEmailChild}
                            codeChange={this.codeChange.bind(this)}
                            codeDisType={codeDisEmail}
                            getAuthCode={this.drawingImg.bind(this, 'email')}
                            codeHtml={emailHtml}
                            codeLoading={(type == 'email') ? codeLoading : false}
                        />
                        <PassWordInput
                            setPassChild={this.setPassEmail}
                            // className={this.state.btnSub?'':'enterPass'}
                            className={this.state.btnSub ? '' : ''}
                        />
                    </TabPane>
                    {/* <TabPane 
                            tab="手机重置" 
                            key="phone" 
                            disabled={(this.state.btnSub)?true:false}
                        >
                            <PhoneCode 
                                phone={this.props.phone} 
                                className={this.state.btnNext?'':'enterPass'} 
                                setPhoneChild={this.setPhoneChild} 
                                codeChange={this.codeChange.bind(this)} 
                                codeDisType={codeDisPhone} 
                                getAuthCode={this.drawingImg.bind(this,'mobilePhone')} 
                                codeHtml={phoneHtml}
                                codeLoading={(type== 'email')?false:codeLoading}
                            />
                            <PassWordInput 
                                setPassChild={this.setPassPhone} 
                                className={this.state.btnSub?'':'enterPass'}
                            />
                        </TabPane> */}
                </Tabs>
            </Modal>
        )
    }
}
class PhoneCodes extends Component {
    handleSubmit = () => {
        let { form } = this.props;
        let arr = [];
        form.validateFields((err, values) => {
            let { mobilePhone, PhoneCode } = values
            if (!err) {
                arr.push(mobilePhone, PhoneCode);
            }
        })
        return arr;
    }
    mobilePhone = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/
        let phoneNum = $.trim(form.getFieldValue('mobilePhone'));
        if (phoneNum && reg.test(phoneNum)) {
            callback();
        } else {
            callback("非法手机格式，请输入正确的手机号");
            return;
        }
    }
    codeType = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /^[0-9]*$/;
        let codeVal = form.getFieldValue('PhoneCode');
        if (codeVal && !reg.test(codeVal)) {
            callback("验证码只能为数字！");
        }
        callback();
    }
    componentDidMount() {
        //必须在这里声明，所以 ref 回调可以引用它
        this.props.setPhoneChild(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form className={this.props.className}>
                <FormItem>
                    {getFieldDecorator('mobilePhone', {
                        initialValue: this.props.phone || '',
                        validateFirst: true,
                        rules: [{
                            required: true, message: '请输入手机号!'
                        }, {
                            validator: this.mobilePhone
                        }],
                    })(
                        <Input className="code_input" disabled={this.props.phone ? true : false} autocomplete="off" prefix={<Icon type="phone" />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('PhoneCode', {
                        rules: [
                            { required: true, message: '请输入手机验证码!' },
                            { validator: this.codeType },
                            { len: 6, message: '手机验证码的长度为6!' }
                        ],
                    })(
                        <Input autocomplete="off" className="code_input" prefix={<Icon type="safety" />}
                            placeholder="手机验证码"
                            addonAfter={<Button disabled={this.props.codeDisType}
                                className="searchInBtn"
                                onClick={this.props.getAuthCode}
                                loading={this.props.codeLoading}
                            >
                                {this.props.codeHtml}
                            </Button>} />
                    )}
                </FormItem>
            </Form>
        )
    }
}
class EmailCodes extends Component {
    handleSubmit = () => {
        let { form } = this.props;
        let arr = [];
        form.validateFields((err, values) => {
            let { email, emailCode } = values
            if (!err) {
                arr.push(email, emailCode);
            }
        })
        return arr;
    }
    codeType = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /^[0-9]*$/;
        let codeVal = form.getFieldValue('emailCode');
        if (codeVal && !reg.test(codeVal)) {
            callback("验证码只能为数字！");
        }
        callback();
    }
    componentDidMount() {
        //必须在这里声明，所以 ref 回调可以引用它
        this.props.setEmailChild(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form className={this.props.className}>
                <FormItem>
                    {getFieldDecorator('email', {
                        initialValue: this.props.email || '',
                        rules: [{
                            required: true, message: '请输入邮箱!',
                        }, {
                            type: 'email', message: '邮箱地址非法!',
                        }],
                    })(
                        <Input autocomplete="off" disabled={this.props.email ? true : false} className="code_input" prefix={<Icon type="mail" />} placeholder="邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('emailCode', {
                        rules: [
                            { required: true, message: '请输入邮箱验证码!' },
                            { validator: this.codeType },
                            { len: 6, message: '邮箱验证码的长度为6!' }
                        ],
                    })(
                        <Input autocomplete="off" className="code_input" prefix={<Icon type="safety" />}
                            placeholder="邮箱验证码" type="text"
                            addonAfter={<Button disabled={this.props.codeDisType}
                                className="searchInBtn"
                                onClick={this.props.getAuthCode}
                                loading={this.props.codeLoading}
                            >
                                {this.props.codeHtml}
                            </Button>}
                        />
                    )}
                </FormItem>
            </Form>
        )
    }
}
class PassWordInputs extends Component {
    state = {
        passGrade: '',
        grade: '',
        gradeStr: ''
    }
    // 提交时获取输入框数据
    handleSubmit = () => {
        let { form } = this.props;
        let arr = [];
        form.validateFields((err, values) => {
            let { password, changePhone } = values
            if (!err) {
                // this.getPassGrade('',password);
                // arr.push(password,this.state.gradeStr);
                arr.push(password)
                arr.push(changePhone)
                arr.push(this.state.gradeStr)

            }
        })
        return arr;
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /\s/;
        let passVal = form.getFieldValue('password');
        if (passVal && reg.test(passVal)) {
            callback("非法格式，密码不能存在空格");
            this.setState({ passGrade: '', grade: '' });
            return;
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['confPassword'], { force: true });
        }
        if (passVal && passVal.length >= 6 && (!this.getPassGrade('', passVal))) {
            callback("密码不能全为数字！");
        } else {
            callback();
        }

    }
    getPassGrade = (event, value) => {
        let passVal = event ? event.target.value : value;
        let hasNum = false;
        let hasWord = false;
        let hasChar = false;
        if (passVal) {
            for (var i = 0; i < passVal.length; i++) {
                var charType = 0;
                var t = passVal.charCodeAt(i);
                if (t >= 48 && t <= 57) { hasNum = true; } //为0～9十个阿拉伯数字
                else if ((t >= 65 && t <= 90) || (t >= 97 && t <= 122)) { hasWord = true; } //为26个大写英文字母 为26个小写英文字母
                else { hasChar = true; }
            }
            // }
            if (passVal.length >= 6 && passVal.length <= 8 && (hasWord || hasChar)) {
                this.setState({ passGrade: 'lowGrade', grade: '低', gradeStr: 'low' })
            }
            if (passVal.length >= 9 && passVal.length <= 20) {
                if ((hasNum && hasWord) || (hasWord && hasChar) || (hasNum && hasChar)) {
                    this.setState({ passGrade: 'middleGrade', grade: '中', gradeStr: 'medium' });
                }

            }
            if (passVal.length >= 9 && passVal.length <= 20) {
                if (hasNum && hasWord && hasChar) this.setState({ passGrade: 'highGrade', grade: '高', gradeStr: 'high' });
            }
            if (passVal.length < 6) {
                this.setState({ passGrade: '', grade: '' });
            }
        }
        if (!(hasWord || hasChar)) {
            this.setState({ passGrade: '', grade: '' });
            return false;
        } else {
            return true;
        }


    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    // 前后密码一致性校验
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }
    // 更换绑定的手机号码格式校验
    phoneFormat = (rule, value, callback) => {
        const reg = /^1[3|4|5|8][0-9]\d{4,8}$/
        const form = this.props.form
        if (value !== '') {
            if (!reg.test(value)) {
                callback('请输入有效的手机号码')
            } else {
                callback()
            }
        } else {
            callback()
        }
    }
    // codeType = (rule, value, callback) => {
    //     const form = this.props.form;
    //     const reg =/^[0-9]*$/;
    //     let codeVal = form.getFieldValue('emailCode');
    //     if(codeVal && !reg.test(codeVal)) {
    //         callback("验证码只能为数字！");
    //     }
    //     callback();
    // }
    componentDidMount() {
        //必须在这里声明，所以 ref 回调可以引用它
        this.props.setPassChild(this);
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form className={this.props.className}>
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
                            validateFirst: true,
                            rules: [
                                { validator: this.validateToNextPassword },
                                { min: 6, message: '密码长度不能少于6位' },
                                { max: 20, message: '密码长度不能大于20位' },
                                { required: true, message: '请输入密码' },
                                // { validator: this.validateToNextPassword }
                            ],
                        })(
                            <Input autocomplete="new-password off" className="code_input" onChange={this.getPassGrade} prefix={<Icon type="lock" />} type="password" placeholder="密码" />
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
                        <Input autocomplete="new-password off" className="code_input" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" />} type="password" placeholder="确认密码" />
                    )}
                </FormItem>
                {/* 更换绑定的手机号码 */}
                <FormItem>
                    {getFieldDecorator('changePhone', {
                        rules: [
                            { required: false, message: '请输入需要更换绑定的手机号码' },
                            // { validator: this.phoneFormat },
                            // { pattern: /^1[3|4|5|8][0-9]\d{4,8}$/ }
                        ]
                    })(
                        <Input autocomplete="new-password off" className="code_input" prefix={<Icon type="phone" />} type="number" placeholder="更换绑定的手机号码（可选）" />
                    )}
                </FormItem>
            </Form>
        )
    }
}
const PhoneCode = Form.create()(PhoneCodes)
const EmailCode = Form.create()(EmailCodes)
const PassWordInput = Form.create()(PassWordInputs)
export default PassModal;

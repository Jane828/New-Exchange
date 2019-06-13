import React, {Component} from 'react'
import { Input, Button, message, Form, Modal } from 'antd'
import $ from 'jquery'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
const FormItem = Form.Item;
class AppendAddress extends Component {
    state = {
        codeType: 'google',
        onlyOneType: true,
        codeHtml:'获取短信验证码',
        time: 30,
        codeDis: false,
        data: {}
    }
    defaultModal = () => {
        if(this.state.onlyOneType) {
            this.getUserInfo(this.state.data);
        }else {
            this.setState({codeType: 'google'});
        }
    }
    googleShow = () => {
        this.setState({codeType:'google'});
    }
    phoneShow = () => {
        this.setState({codeType:'phone'});
    }
    getUserInfo = (data) => {
        let onlyOneType = false;
        let codeType = 'google';
        if(data.isAuthentication && data.phone) {
            onlyOneType = false;
        }else {
            onlyOneType = true;
        }
        if(!data.isAuthentication) {
            codeType = 'phone';
        }
        this.setState({onlyOneType: onlyOneType,codeType: codeType,data: data})
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        let { form } = this.props;
        const {codeType} = this.state;
        let arr = ['newAddress','remark','PhoneCode'];
        if(codeType == 'google') arr = ['newAddress','remark','googleCode'];
        form.validateFields(arr,{},(err, values) => {
            if (!err) {
                let { newAddress, remark, PhoneCode, googleCode } = values
                var obj = {
                    person: newAddress,
                    person_type: 'common',
                    action: 'add',
                    remark: remark,
                    validate_type: codeType,
                    validate_code: (codeType == 'google')?googleCode:PhoneCode,
                }
                var _this = this;
                this.setState({ LoginLoading: true });
                setTimeout(function(){
                    _this.setState({ LoginLoading: false });
                },3000)
                CgicallPost("/apiv1/user/wallet/withdraw/setperson/"+ this.props.amount ,obj,function(d){
                    if(d.result) {
                        message.success('提币地址添加成功');
                        _this.props.getMsg();
                        _this.props.cancel();
                    }else {
                        message.error(GetErrorMsg(d))
                    }
                });
            }
        });
    }
    componentDidMount(){
        //必须在这里声明，所以 ref 回调可以引用它
        this.props.setChild(this);
    }
    render() {
        const { onlyOneType, codeType } = this.state;
        const { getFieldDecorator } = this.props.form
        return(
            <Modal
                visible={this.props.visible}
                title='新增提币地址'
                maskClosable = {false}
                destroyOnClose = {true}
                onCancel={this.props.cancel}
                afterClose={this.defaultModal}
                width={630}
                footer={null}
            >
                <div className='plate-form-modal'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="地址" colon={false}>
                            {getFieldDecorator('newAddress', {
                                initialValue:this.props.phone || '',
                                validateFirst:true,
                                rules: [
                                    {required: true, message: '请输入新增地址!'}, 
                                    {type: 'email', message: '地址非法!'},
                                ],
                            })(
                                <Input className="code_input" autocomplete="off" placeholder="请输入新增地址" />
                            )}
                        </FormItem>
                        <FormItem label="备注（选填）" colon={false}>
                            {getFieldDecorator('remark', {
                                validateFirst:true,
                                rules: [{
                                    max: 255,message:'请输入备注，长度为0-255个字符' 
                                }],
                            })(
                                <Input className="code_input" autocomplete="off" placeholder="请输入备注" />
                            )}
                        </FormItem>
                        <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'none':'block'}}>
                            <div>
                                <div>
                                    {getFieldDecorator('PhoneCode', {
                                        rules: [
                                            { required: true, message: '请输入手机验证码!'},
                                            {validator: this.codeType },
                                            {len: 6, message: '手机验证码的长度为6!'}
                                        ],
                                    })(
                                        <Input autocomplete="off" className="code_input" 
                                            placeholder="输入6位短信验证码" 
                                            addonAfter={<Button  disabled={this.props.codeDisType} 
                                            className="searchInBtn" 
                                            onClick={this.props.getAuthCode.bind(this,'address')}
                                        >
                                            {this.props.phoneHtml}
                                        </Button>} />
                                    )}
                                </div>
                                <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.googleShow}>Google验证码</a></div>
                            </div>
                        </FormItem>
                        <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'block':'none'}}>
                            <div>
                                <div>
                                    {getFieldDecorator('googleCode', {
                                        validateFirst:true,
                                        rules: [
                                            {required: true, message: '请输入Google验证码!'}, 
                                            {validator: this.codeType },
                                            {len: 6, message: 'Google验证码的长度为6!'}
                                        ],
                                    })(
                                        <Input className="code_input" autocomplete="off" placeholder="输入6位Google验证码" />
                                    )}
                                </div>
                                <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.phoneShow}>手机验证码</a></div>
                            </div>
                        </FormItem>
                        <FormItem className='ellipse-btn plate-form-btn'>
                            <Button type="primary" htmlType="submit" className="l_button" loading={this.props.LoginLoading}>
                                确定
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}
class AppendFriend extends Component {
    state = {
        codeType: 'google',
        codeHtml:'获取短信验证码',
        time: 30,
        codeDis: false,
        data: {}
    }
    defaultModal = () => {
        if(this.state.onlyOneType) {
            this.getUserInfo(this.state.data);
        }else {
            this.setState({codeType: 'google'});
        }
    }
    getUserInfo = (data) => {
        let onlyOneType = false;
        let codeType = 'google';
        if(data.isAuthentication && data.phone) {
            onlyOneType = false;
        }else {
            onlyOneType = true;
        }
        if(!data.isAuthentication) {
            codeType = 'phone';
        }
        this.setState({onlyOneType: onlyOneType,codeType: codeType,data: data})
    }
    googleShow = () => {
        this.setState({codeType:'google'});
    }
    newLinkman = (rule, value, callback) => {
        // const reg =
        // let phoneNum = $.trim(form.getFieldValue('mobilePhone'));
        let val = $.trim(value);
        const reg1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        const reg2 = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
        if (reg1.test(val) || reg2.test(val)) {
            callback();
        } else {
            callback('请输入正确的邮箱或手机号');
        }
    }
    phoneShow = () => {
        this.setState({codeType:'phone'});
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        let { form } = this.props;
        const {codeType} = this.state;
        let arr = ['newLinkman','remark','PhoneCode'];
        if(codeType == 'google') arr = ['newLinkman','remark','googleCode'];
        form.validateFields(arr,{},(err, values) => {
            if (!err) {
                let { newLinkman, remark, PhoneCode, googleCode } = values
                var obj = {
                    person: newLinkman,
                    person_type: 'inner',
                    action: 'add',
                    remark: remark,
                    validate_type: codeType,
                    validate_code: (codeType == 'google')?googleCode:PhoneCode,
                }
                var _this = this;
                this.setState({ LoginLoading: true });
                setTimeout(function(){
                    _this.setState({ LoginLoading: false });
                },3000)
                CgicallPost("/apiv1/user/wallet/withdraw/setperson/"+ this.props.amount ,obj,function(d){
                    if(d.result) {
                        message.success('联系人添加成功');
                        _this.props.getMsg();
                        _this.props.cancel();
                        // _this.props.goWithDrawaled();
                    }else {
                        message.error(GetErrorMsg(d))
                    }
                });
            }
        });
    }
    componentDidMount(){
        //必须在这里声明，所以 ref 回调可以引用它
        this.props.setChild(this);
    }
    render() {
        const { fetching, onlyOneType, codeType } = this.state;
        const { getFieldDecorator } = this.props.form
        return(
            <Modal
                visible={this.props.visible}
                title='新增站内联系人'
                maskClosable = {false}
                destroyOnClose = {true}
                onCancel={this.props.cancel}
                afterClose={this.defaultModal}
                width={630}
                footer={null}
            >
                <div className='plate-form-modal'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="BitCoCo账号" colon={false}>
                            {getFieldDecorator('newLinkman', {
                                initialValue:this.props.phone || '',
                                validateFirst:true,
                                rules: [
                                    {required: true, message: '请输入手机号或邮箱!'},
                                    // {type: 'email', message: '联系人格式错误!'}
                                    {validator: this.newLinkman },
                                ],
                            })(
                                <Input className="code_input" disabled={this.props.phone?true:false} autocomplete="off" placeholder="请输入手机号或邮箱" />
                            )}
                        </FormItem>
                        <FormItem label="备注（选填）" colon={false}>
                            {getFieldDecorator('remark', {
                                validateFirst:true,
                                rules: [
                                    { max: 255,message:'请输入备注，长度为0-255个字符' }
                                ],
                            })(
                                <Input className="code_input" disabled={this.props.phone?true:false} autocomplete="off" placeholder="请输入备注" />
                            )}
                        </FormItem>
                        <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'none':'block'}}>
                            <div>
                                <div>
                                    {getFieldDecorator('PhoneCode', {
                                        rules: [
                                            {required: true, message: '请输入手机验证码!'},
                                            {validator: this.codeType },
                                            {len: 6, message: '手机验证码的长度为6!'}
                                        ],
                                    })(
                                        <Input autocomplete="off" className="code_input" 
                                            placeholder="输入6位短信验证码" 
                                            addonAfter={<Button  disabled={this.props.codeDisType} 
                                            className="searchInBtn" 
                                            onClick={this.props.getAuthCode.bind(this,'friend')}
                                        >
                                            {this.props.phoneHtml}
                                        </Button>} />
                                    )}
                                </div>
                                <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.googleShow}>Google验证码</a></div>
                            </div>
                        </FormItem>
                        <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'block':'none'}}>
                            <div>
                                <div>
                                    {getFieldDecorator('googleCode', {
                                        initialValue:this.props.phone || '',
                                        validateFirst:true,
                                        rules: [
                                            {required: true, message: '请输入Google验证码!'}, 
                                            {validator: this.codeType },
                                            {len: 6, message: 'Google验证码的长度为6!'}
                                        ],
                                    })(
                                        <Input className="code_input" autocomplete="off" placeholder="输入6位Google验证码" />
                                    )}
                                </div>
                                <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.phoneShow}>手机验证码</a></div>
                            </div>
                        </FormItem>
                        <FormItem className='ellipse-btn plate-form-btn'>
                            <Button type="primary" htmlType="submit" className="l_button" loading={this.props.LoginLoading}>
                                确定
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}
const AppAdrss = Form.create()(AppendAddress)
const AppFrd = Form.create()(AppendFriend)
export { AppAdrss, AppFrd}
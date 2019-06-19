import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { message, Modal, Button, Input, Form } from 'antd'
import $ from 'jquery'
import CryptoJS from 'crypto-js'
import md5 from 'js-md5'
import FormBox from '../components/FormBox'
import Cookies from 'js-cookie'
import store from '../store'
import { BeforeSendPost, Cgicallget, CgicallPost, GetErrorMsg } from '@/components/Ajax'
// import axios from 'axios'
import './index.less'
import Drotocol from "./deal.js"
import { sha256, sha224 } from 'js-sha256';
// import { fail } from 'mobx/lib/utils/utils';
const Search = Input.Search;
const FormItem = Form.Item
@inject('Store')
@observer
class Regist extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。
        console.log(this.store);
    }
    state = {
        loading: false,
        visibleContract: false,
        pwKey: 'fdec3af2f062f9d5893d22ffb46164d7ffcbee648cffb96af79121e7b274d979',
        // visibleEmail: false,
    }
    codeChange = (e) => {
        this.state.codeValue = e.target.value;
    }
    userContract = () => {
        this.setState({
            visibleContract: true,
        });
    }
    handleCancel = () => {
        this.setState({ visibleContract: false });
    }
    submit = (form, updateLoading, gradeStr) => {
        form.validateFields((err, values) => {
            if (!err) {
                let { email, emailCode, password,inviteCode } = values
                let obj = {
                    username: email,
                    // password: sha256(sha256(password) + sha256(password) + this.state.pwKey),
                    password: md5(password),
                    code: emailCode,
                    level: gradeStr,
                }
                var _this = this;
                var account = email;
                CgicallPost("/api/v1/visitor/email-register", obj, function (d) {
                    if (d.code === 0) {
                        message.success("注册成功！")
                        Cookies.set('account', account)
                        _this.props.history.push('/home');
                    } else {
                        message.error(GetErrorMsg(d))
                    }
                });
            }
        });
    }

    componentDidMount() {
        // clearTimeout(this.timer)
    }
    componentWillMount() {
        if (Cookies.get('account')) {
            if (this.props.history.length < 3) this.props.history.push('/home')
            else this.props.history.goBack();
        }
    }
    render() {
        const { visibleContract, loading } = this.state;
        const searchParams = new URLSearchParams(this.props.location.search)
        const invitCode = searchParams.get('code');
        return (
            <Provider store={this.store}>
                <div className='Regist_wrap clearFix'>
                    <div className='form P_auto'>
                        <h3>注册</h3>
                        <FormBox submit={this.submit} userContract={this.userContract} invitCode={invitCode} />
                    </div>
                    <Modal
                        wrapClassName="infobox"
                        visible={visibleContract}
                        title="用户服务协议"
                        maskClosable={false}
                        closable={false}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                        ]}
                    >
                        <Drotocol />
                    </Modal>
                </div>
            </Provider>
        )
    }
}
export default Regist

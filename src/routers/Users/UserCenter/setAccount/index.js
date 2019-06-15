import React, { Component } from 'react'
import { Rate, Modal, Button, Input, Form, Layout, Menu, List, Radio, Breadcrumb, message, Steps, Select } from 'antd'
import { BeforeSendPost, BeforeSendGet, Cgicallget, CgicallPost, GetErrorMsg } from '@/components/Ajax'
import { Provider, inject, observer } from 'mobx-react'
import { Router, Route, withRouter, Link } from 'react-router-dom'
// import { Router, Route, Link, hashHistory } from 'react-router'
import FormEmailBox from './From/FormEmailBox'
import FormPhoBox from './From/FormPhoBox'
import FromPhoChangeOne from './From/FromPhoChangeOne'
import FromPhoChangeTwo from './From/FromPhoChangeTwo'
import PhoneModel from './phoneModel'
import PhoneChangeModel from './phoneChangeModel'
import GoogleModal from './googleModel/index.js'
import GoogleChangeModel from './googleChangeModel/index.js'
import './index.less'
import UserCenterMenu from '../menu'
import store from '../store'
import boundSuc from './img/boundSuccess.png'
import emailPng from './img/emailPng.png'
import transNum from './img/transNum.png'
import PassModal from '../../../Login/pwModal'
import TransVer from './TransVer'
import axios from 'axios'
// import FromGoogleOne from './components/FromGoogleOne'


const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;
const Step = Steps.Step;
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

@withRouter
@inject('Store')
@observer

class SetAccount extends Component {
    constructor() {
        super()
        this.store = new store()
    }
    state = {
        //个人初始化的值
        isAuthentication: false,
        isCertification: false,
        loginTime: null,
        passwordStrength: '',
        safeGrade: 0,
        phone: '',
        transactionverification: '',
        email: '',
        visiblePass: '',
        // logTime: '2018-10-10 15:07:12',
        // passwordStr:'low',
        // phoneNum:'+86 18378600404'
        levelValue: 0,
        boundPhoYesAndNo: false,
        boundGooYesAndNo: false,
        boundNameYesAndNo: false,
        //手机绑定
        showPho: false,
        PhoStepsCurrent: 0,
        InputCodeEmail: null,
        googleCode: null,
        //更换手机
        showChangePho: false,
        PhoChangeCurrent: 0,
        PhoChangeOldPhoCode: null,
        PhoChangeOldEmailCode: null,
        //谷歌绑定
        showGoogle: false,
        boundGooglecurrent: 0,
        //更换谷歌
        showChangeGoogle: false,
        changeGooglecurrent: 0,
        //交易验证
        visiblePhone: false,
        verifyArr: [],
        codeValue: '',

        setTransValue: 'must',
        setBuildTime: false,
        setBuildTimeNum: 60,
        timerID: 0,
        //密码修改
        PhoVisible: false,

    }
    setNextPage = (val) => {
        this.props.setPage('realName');
    }
    getUserInf = () => {
        let _this = this
        // Cgicallget("/api/v1/user/userinfo", '', function (d) {
        //     let userInf = d.result
        //     console.log('----------------userInfuserInfuserInfuserInfuserInf', userInf)
        //     if (d.result) {
        //         _this.setState({
        //             isAuthentication: userInf.isAuthentication,
        //             isCertification: userInf.isCertification,
        //             loginTime: userInf.loginTime,
        //             passwordStrength: userInf.passwordStrength,
        //             safeGrade: Number(userInf.safeGrade),
        //             phone: userInf.phone,
        //             transactionverification: userInf.transactionverification,
        //             email: userInf.email,
        //             setTransValue: userInf.transactionverification
        //         })
        //         // _this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);
        //     } else {
        //         message.error(GetErrorMsg(d))
        //     }
        // });

        BeforeSendGet("/api/v1/user/userinfo", '', function (d) {
            // console.log(d.result.info)
            let userInf = d.result.info
            if (userInf) {
                console.log("getUserInf--------------------")
                console.log(userInf)
                _this.setState({
                    // isAuthentication: userInf.isAuthentication,
                    // isCertification: userInf.isCertification,
                    loginTime: userInf.logintime,
                    passwordStrength: userInf.level,
                    safeGrade: Number(userInf.softGrade),
                    phone: userInf.phone,
                    // transactionverification: userInf.transactionverification,
                    email: userInf.username,
                    // setTransValue: userInf.transactionverification
                })
                // _this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);
            } else {
                message.error(GetErrorMsg(d))
            }
        })

    }
    componentDidMount = () => {
        let _this = this
        // if(this.props.location.query && this.props.location.query.boundGoogleSuc){
        if (sessionStorage.boundGoogleSuc) {
            this.setState({
                showGoogle: true,
                boundGooglecurrent: 2
            });
        } else if (sessionStorage.changeGoogleSuc) {
            this.setState({
                showChangeGoogle: true,
                changeGooglecurrent: 2
            });
        }
        // Cgicallget("/api/v1/user/userinfo", '', function (d) {
        //     let userInf = d.result
        //     console.log('userInfuserInfuserInfuserInfuserInf', userInf)
        //     if (d.result) {
        //         _this.setState({
        //             isAuthentication: userInf.isAuthentication,
        //             isCertification: userInf.isCertification,
        //             loginTime: userInf.loginTime,
        //             passwordStrength: userInf.passwordStrength,
        //             safeGrade: Number(userInf.safeGrade),
        //             phone: userInf.phone,
        //             transactionverification: userInf.transactionverification,
        //             email: userInf.email,
        //             setTransValue: userInf.transactionverification
        //         })
        //         // _this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);

        //     } else {
        //         message.error(GetErrorMsg(d))
        //     }
        // });

        BeforeSendGet("/api/v1/user/userinfo", '', function (d) {
            console.log("componentDidMount--------------")
            console.log(d)
            let userInf = d.result.info
            console.log(userInf)
            if (userInf) {
                _this.setState({
                    // isAuthentication: userInf.isAuthentication,
                    // isCertification: userInf.isCertification,
                    loginTime: userInf.logintime,
                    passwordStrength: userInf.level,
                    safeGrade: Number(userInf.softGrade),
                    phone: userInf.phone,
                    // transactionverification: userInf.transactionverification,
                    email: userInf.username,
                    // setTransValue: userInf.transactionverification
                })
                // _this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);
            } else {
                message.error(GetErrorMsg(d))
            }
        })
    }

    /* **设置google绑定** */

    showGoogleModal = () => {
        console.log("11111111111111111111")
        this.setState({
            showGoogle: true,
        });
    }
    closeGoogle = () => {
        sessionStorage.boundGoogleSuc = '';
        this.setState({
            showGoogle: false,
        });
    }

    /* **更换google绑定** */
    showChangeGoogleModal = () => {
        this.setState({
            showChangeGoogle: true,
            changeGooglecurrent: 0
        });
    }
    closeChangeGoogle = () => {
        sessionStorage.changeGoogleSuc = '';
        this.setState({
            showChangeGoogle: false
        });
    }

    /* **设置手机绑定** */
    showPhoModal = () => {
        this.setState({
            showPho: true,
        });
    }
    closePho = () => {
        this.setState({
            showPho: false,
        });
    }

    // phoHandleCancel = (e) => {
    //     this.setState({
    //         PhoVisible: false,
    //     });
    // }
    // nextTwo=()=>{
    //     this.setState({
    //         PhoStepsCurrent: 1
    //     });
    // }
    phoBoundThree = () => {
        let _this = this
        // Cgicallget("/api/v1/user/userinfo", '', function (d) {
        //     let userInf = d.result
        //     if (d.result) {
        //         _this.setState({
        //             isAuthentication: userInf.isAuthentication,
        //             isCertification: userInf.isCertification,
        //             loginTime: userInf.loginTime,
        //             passwordStrength: userInf.passwordStrength,
        //             safeGrade: Number(userInf.safeGrade),
        //             phone: userInf.phone,
        //             transactionverification: userInf.transactionverification,
        //             email: userInf.email,
        //             setTransValue: userInf.transactionverification,
        //             PhoStepsCurrent: 2
        //         })
        //         //_this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);

        //     } else {
        //         message.error(GetErrorMsg(d))
        //     }
        // });
        BeforeSendGet("/api/v1/user/userinfo", '', function (d) {
            console.log("phoBoundThree------------------")
            console.log(d)
            let userInf = d.result.info
            if (d.result) {
                _this.setState({
                    isAuthentication: userInf.isAuthentication,
                    isCertification: userInf.isCertification,
                    loginTime: userInf.logintime,
                    passwordStrength: userInf.level,
                    safeGrade: Number(userInf.softGrade),
                    phone: userInf.phone,
                    transactionverification: userInf.transactionverification,
                    email: userInf.email,
                    setTransValue: userInf.transactionverification,
                    PhoStepsCurrent: 2
                })
                //_this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);

            } else {
                message.error(GetErrorMsg(d))
            }
        })



    }
    // passValueTwo=(e)=>{
    //     this.setState({
    //         InputCodeEmail: e.inputEmailCode,
    //         googleCode: e.googleCode
    //     });
    // }
    /* **更换手机绑定** */
    showChangePhoModal = () => {
        this.setState({
            showChangePho: true,
        });
    }
    closeChangePho = (e) => {
        this.setState({
            showChangePho: false,
        });
    }


    changeNextTwo = (e) => {
        this.setState({
            PhoChangeCurrent: 1
        });
    }
    changePassValueTwo = (e) => {
        this.setState({
            PhoChangeOldPhoCode: e.changePhoInputCode,
            PhoChangeOldEmailCode: e.changeEmailInputCode
        });
    }
    changeNextThree = (e) => {
        let _this = this
        // Cgicallget("/api/v1/user/userinfo", '', function (d) {
        //     let userInf = d.result
        //     if (d.result) {
        //         _this.setState({
        //             isAuthentication: userInf.isAuthentication,
        //             isCertification: userInf.isCertification,
        //             loginTime: userInf.loginTime,
        //             passwordStrength: userInf.passwordStrength,
        //             safeGrade: Number(userInf.safeGrade),
        //             phone: userInf.phone,
        //             transactionverification: userInf.transactionverification,
        //             email: userInf.email,
        //             setTransValue: userInf.transactionverification,
        //             PhoChangeCurrent: 2
        //         })
        //         //_this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);
        //     } else {
        //         message.error(GetErrorMsg(d))
        //     }
        // });


        BeforeSendGet("/api/v1/user/userinfo", '', function (d) {
            console.log("changeNextThree---------------------")
            console.log(d)
            let userInf = d.result.info
            if (d.result) {
                _this.setState({
                    isAuthentication: userInf.isAuthentication,
                    isCertification: userInf.isCertification,
                    loginTime: userInf.logintime,
                    passwordStrength: userInf.level,
                    safeGrade: Number(userInf.softGrade),
                    phone: userInf.phone,
                    transactionverification: userInf.transactionverification,
                    email: userInf.email,
                    setTransValue: userInf.transactionverification,
                    PhoChangeCurrent: 2
                })
                //_this.props.passEmailAut(_this.state.email,_this.state.isAuthentication,_this.state.phone);
            } else {
                message.error(GetErrorMsg(d))
            }
        })

    }
    /* **设置验证的方式** */
    showTransModal = () => {
        this.setState({
            TransVisible: true,
        });
    }
    showModalPhone = () => {
        let arr = [];
        if (this.state.isAuthentication) arr.push('google');
        if (this.state.phone) arr.push('phone');
        this.setState({
            verifyArr: arr,
            visiblePhone: true,
        });
    }
    handleCancelPhone = () => {
        this.setState({ visiblePhone: false });
    }
    codeChange = (e) => {
        this.setState({ codeValue: e.target.value });
    }
    handleOkPhone = (type) => {
        console.log("6666666666666", type)
        let _this = this
        let obj = {
            method: this.state.setTransValue,
            code: this.state.codeValue
        }
        if (this.state.codeValue == '') {
            message.error('请输入验证码')
            return
        }
        if (type == 'google') {
            CgicallPost("/api/v1/user/transactionVerificationWithAuth", obj, (d) => {
                if (d.result) {
                    _this.setState({
                        visiblePhone: false,
                        TransVisible: false
                    });
                    _this.getUserInf()
                } else {
                    message.error(GetErrorMsg(d))
                }
            });
        } else if (type == 'phone') {
            CgicallPost("/api/v1/user/transactionVerificationWithPhone", obj, (d) => {
                if (d.result) {
                    _this.setState({
                        visiblePhone: false,
                        TransVisible: false
                    });
                    _this.getUserInf()
                } else {
                    message.error(GetErrorMsg(d))
                }
            });
        }


        // if(!type) {
        //     if(this.state.phone) type = 'phone';
        //     if(this.state.isAuthentication) type ='google';
        // }
        // if(this.state.codeValue.length <6 || this.state.codeValue.length >6) {
        //     message.error('验证码格式错误')
        //     return false;
        // }else {
        //     if(parseInt(this.state.codeValue.length) <6) {
        //         message.error('验证码格式只能为数字')
        //         return false;
        //     }
        // }
        // var obj = {
        //     account: this.state.userName,
        //     password : sha256(sha256(this.state.password) + sha256(this.state.password) + this.state.pwKey),
        //     code : this.state.codeValue
        // }
        // var _this = this;
        // if(type == "google") {
        //     this.GoogleVerify(obj);
        // }else {
        //     this.PhoneVerify(obj);
        // }
        // setTimeout(() => {
        //     // this.setState({ loading: false, visiblePhone: false,LoginLoading:false });
        //     this.setState({ loading: false, LoginLoading:false });
        // }, 3000);

    }
    transHandleOk = (e) => {
        let _this = this
        let obj = {
            method: _this.state.setTransValue
        }
        if (_this.state.isAuthentication || _this.state.phone) {
            _this.setState({ visiblePhone: true });
            _this.showModalPhone()
        } else {
            CgicallPost("/api/v1/user/transactionVerification", obj, (d) => {
                let userInf = d.result
                if (d.result) {
                    _this.setState({
                        TransVisible: false,
                        transactionverification: this.state.setTransValue
                    });
                } else {
                    message.error(GetErrorMsg(d))
                }
            });
        }
    }
    transHandleCancel = (e) => {
        this.setState({
            TransVisible: false,
        });
    }
    onChangeTrans = (e) => {
        console.log("e.target.value", e.target.value)
        this.setState({
            setTransValue: e.target.value,
        });
    }

    //*********
    updatePass = () => {
        this.setState({ visiblePass: true });
    }
    cancelPass = () => {
        this.setState({ visiblePass: false });
    }
    render() {
        const contentInf = {
            Inf: '基本信息',
            account: '账号',
            logTime: '上次登录时间',
            logHistory: '登录历史',
            logPassword: '登录密码',
            passwordStr: '强度',
            passwordLow: '低',
            passwordIn: '中',
            passwordHigh: '高',
            setPassword: '修改密码',
        }
        const contentSet = {
            Set: '账户安全设置',
            level: '安全等级',
            boundPho: '绑定手机',
            unBound: '未绑定',
            upBound: '已绑定',
            bound: '绑定',
            change: '更换',
            Authenticator: '绑定Google验证器',
            decLevel: '强烈建议完成下列设置提升账户安全登记',
            noCertified: '未认证',
            upCertified: '已认证',
            Certified: '认证',
            setTrans: '交易验证设置',
            noSetTrans: '不需要验证',
            setButton: '设置',
            nameTrans: '实名验证',
        }
        // const { getFieldDecorator } = this.props.form;
        const selectPhoAfter = (
            <Select defaultValue="666" style={{ width: 163 }}>
                <Option value="zh">中国</Option>
                <Option value=".jp">安哥拉</Option>
                <Option value=".cn">美国</Option>
                <Option value=".org">法国</Option>
            </Select>
        );
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu line-menu" width='260'>
                            <UserCenterMenu showKey='setAccount' />
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='Home_'>
                                    <Layout className="setAccount"
                                    >
                                        <Content className="setAccount-content">
                                            {/* 基本信息 */}
                                            <div className="contentInf">
                                                <Header className="contentInf-header">{contentInf.Inf}</Header>
                                                <Content className="contentInf-Content">
                                                    <div className="contentInf-Content-one">
                                                        <div className="one-style1">
                                                            <span className="one-style-account">{contentInf.account}:&nbsp;</span>
                                                            <span>{this.state.email}</span>
                                                        </div>
                                                        <div className="one-style2">
                                                            <span>{contentInf.logTime}:&nbsp;</span>
                                                            <span style={{ color: '#A4A4A4', fontSize: '10px' }}>
                                                                {/* {this.state.loginTime} */}
                                                                {/* {new Date(parseInt(this.state.loginTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')} */}
                                                                {new Date(this.state.loginTime).getFullYear() + '-' + (new Date(this.state.loginTime).getMonth() + 1) + '-' + new Date(this.state.loginTime).getDate() + ' ' + new Date(this.state.loginTime).getHours() + ':' + new Date(this.state.loginTime).getMinutes() + ':' + new Date(this.state.loginTime).getSeconds()}
                                                            </span>
                                                        </div>
                                                        <div className="one-style3">
                                                            <Link to="/users/UserCenter/logHistory">
                                                                <span>{contentInf.logHistory}</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="contentInf-Content-two">
                                                        <div className="two-style1">
                                                            <span className="two-style-account">{contentInf.logPassword}</span>
                                                        </div>
                                                        <div className="two-style2">
                                                            <span>{contentInf.passwordStr}:&nbsp;</span>
                                                            {/* <span style={{color:'green'}}>{contentInf.passwordIn}</span> */}
                                                            {(() => {
                                                                switch (this.state.passwordStrength) {
                                                                    case 2: return <span style={{ color: '#72DC77', fontSize: '10px' }}>中</span>; break;
                                                                    case 3: return <span style={{ color: '#00A0E9', fontSize: '10px' }}>高</span>; break;
                                                                    // case 1: return <span style={{ color: '#E95454', fontSize: '10px' }}>低</span>; break;
                                                                    default: return <span style={{ color: '#E95454', fontSize: '10px' }}>低</span>; break;
                                                                }
                                                            }
                                                            )()}
                                                        </div>
                                                        <div className="two-style3">
                                                            <span onClick={this.updatePass}>{contentInf.setPassword}</span>
                                                        </div>
                                                    </div>
                                                </Content>
                                            </div>
                                            {/* 账户设置 */}
                                            <div className="contentSet">
                                                <Header className="contentSet-header">{contentSet.Set}</Header>
                                                {/* **安全星数** */}
                                                <Content className="contentSet-Content">
                                                    <div className="contentSet-Content-Boa clerafix">
                                                        <div className="Boa-style1">
                                                            <span className="Boa-style1-level">{contentSet.level}</span>
                                                        </div>
                                                        <div className="Boa-style2">
                                                            <Rate disabled value={this.state.safeGrade} />
                                                        </div>
                                                        <div className="Boa-style3">
                                                            <span style={{ color: '#A4A4A4', fontSize: '10px' }}>{contentSet.decLevel}</span>
                                                        </div>
                                                    </div>
                                                    {/* **设置手机绑定** */}
                                                    <div className="contentSet-Content-boundPho clerafix">
                                                        <div className="boundPho-style1">
                                                            <span className="boundPho-style1-mar">{contentSet.boundPho}</span>
                                                        </div>
                                                        <div className="boundPho-style2">
                                                            {
                                                                this.state.phone ?
                                                                    <span>{this.state.phone}</span> :
                                                                    <span style={{ color: 'red' }}>{contentSet.unBound}</span>
                                                            }
                                                        </div>
                                                        <div className="boundPho-style3">
                                                            {
                                                                this.state.phone ?
                                                                    // <span className='bound-disabled'  onClick={this.showChangePhoModal}>{contentSet.change}</span>:
                                                                    // <span className='bound-disabled' disabled onClick={this.showPhoModal}>{contentSet.bound}</span>
                                                                    <span onClick={this.showChangePhoModal}>{contentSet.change}</span> :
                                                                    <span onClick={this.showPhoModal}>{contentSet.bound}</span>
                                                            }
                                                            {/* 绑定手机
                                        <Modal
                                        wrapClassName='pho-model-style'
                                        title = "绑定手机号"
                                        centered = 'true'
                                        visible = {this.state.PhoVisible}
                                        onCancel = {this.phoHandleCancel}
                                        footer={null}
                                        >
                                            <Steps labelPlacement='vertical' current={this.state.PhoStepsCurrent}>
                                                <Step title="身份验证"/>
                                                <Step title="输入号码" />
                                                <Step title="绑定成功" />
                                            </Steps>
                            
                                            {(()=>{
                                                switch(this.state.PhoStepsCurrent){
                                                    case 1:
                                                    return (
                                                        <div className='twoPhoBound'>
                                                            <FormPhoBox 
                                                                googleCode={this.state.googleCode}
                                                                InputCodeEmail={this.state.InputCodeEmail}
                                                                nextThree={this.nextThree} 
                                                                email={this.state.email} />
                                                        </div>
                                                            );
                                                        break;
                                                    case 2:
                                                        return (<div className='pho-boundSuc' ><img src={boundSuc}/></div>)
                                                        break;
                                                    default:
                                                        return (
                                                            <div className='onePhoBound'>
                                                                <FormEmailBox 
                                                                    passValueTwo={e=>this.passValueTwo(e)} 
                                                                    nextTwo={this.nextTwo} 
                                                                    isAuthentication={this.state.isAuthentication} 
                                                                    email={this.state.email} />
                                                            </div>
                                                            );
                                                        break;
                                                }
                                            }
                                        )()}
                                        </Modal>
                                        {/* 更换手机 */}
                                                            {/* <Modal
                                        wrapClassName='pho-model-style'
                                        title = "更换绑定手机号"
                                        centered = 'true'
                                        visible = {this.state.PhoChangeVisible}
                                        onCancel = {this.phoChangeHandleCancel}
                                        footer={null}
                                        >
                                            <Steps labelPlacement='vertical' current={this.state.PhoChangeCurrent}>
                                                <Step title="身份验证"/>
                                                <Step title="输入号码" />
                                                <Step title="绑定成功" />
                                            </Steps>
                                            {(()=>{
                                                switch(this.state.PhoChangeCurrent){
                                                    case 1:
                                                    return (
                                                        <div className='twoPhoBound'>
                                                            <FromPhoChangeTwo
                                                                changeNextThree={this.changeNextThree}
                                                                PhoChangeOldPhoCode={this.state.PhoChangeOldPhoCode}
                                                                PhoChangeOldEmailCode={this.state.PhoChangeOldEmailCode}
                                                                email={this.state.email} />
                                                        </div>
                                                            );
                                                        break;
                                                    case 2:
                                                        return (<div className='pho-boundSuc' ><img src={boundSuc}/></div>)
                                                        break;
                                                    default:
                                                        return (
                                                            <div className='onePhoBound'>
                                                                <FromPhoChangeOne 
                                                                    changeNextTwo={this.changeNextTwo} 
                                                                    changePassValueTwo={e=>this.changePassValueTwo(e)}
                                                                    isAuthentication={this.state.isAuthentication}
                                                                    phone={this.state.phone} 
                                                                    email={this.state.email} />
                                                            </div>
                                                            
                                                            );
                                                        break;
                                                }
                                            }
                                        )()}
                                        </Modal> */}
                                                        </div>
                                                    </div>
                                                    {/* **设置Google绑定** */}
                                                    {/* <div className="contentSet-Content-boundPho clerafix">
                                    <div className="boundPho-style1">
                                        <span className="boundPho-style1-mar">{contentSet.Authenticator}</span>
                                    </div>
                                    <div className="boundPho-style2">
                                        {
                                            this.state.isAuthentication?
                                            <span style={{color:'#56CAA2'}}>{contentSet.upBound}</span>:
                                            <span style={{color:'red'}}>{contentSet.noCertified}</span>
                                        }
                                    </div>
                                    <div className="boundPho-style3">
                                        {
                                            this.state.isAuthentication?
                                            // <span onClick={this.showChangeGoogleModal}>{contentSet.change}</span>:
                                            // <span onClick={this.showGoogleModal}>{contentSet.bound}</span>
                                            <span className='bound-disabled'>{contentSet.change}</span>:
                                            <span className='bound-disabled'>{contentSet.bound}</span>
                                        }
                                    </div>
                                </div> */}
                                                    {/* **设置验证的方式** */}
                                                    {/* <div className="contentSet-Content-boundPho clerafix">
                                    <div className="boundPho-style1">
                                        <span className="boundPho-style1-mar">{contentSet.setTrans}</span>
                                    </div>
                                    <div className="boundPho-style2"> */}
                                                    {/* <span style={{color:'#A4A4A4',fontSize:'10px'}}>{this.state.passwordStrength=''?'':''}</span> */}
                                                    {/* {(()=>{
                                                switch(this.state.transactionverification){
                                                    case "must":return <span style={{color:'#A4A4A4',fontSize:'10px'}}>始终需要验证</span>; break;
                                                    case "twohours":return <span style={{color:'#A4A4A4',fontSize:'10px'}}>2小时内不需要验证</span>; break;
                                                    default:return <span style={{color:'#A4A4A4',fontSize:'10px'}}>不需要验证</span>; break;
                                                }
                                            }
                                        )()} */}
                                                    {/* </div>
                                    <div className="boundPho-style3">
                                        <span onClick={this.showTransModal}>{contentSet.setButton}</span>
                                        <Modal
                                        wrapClassName='trans-model-style'
                                        title = "交易验证设置"
                                        okText = '确定'
                                        centered = 'true'
                                        visible = {this.state.TransVisible}
                                        onCancel = {this.transHandleCancel}
                                        footer={<Button type="primary" onClick={this.transHandleOk}>确定</Button>}
                                        >
                                            <RadioGroup onChange={this.onChangeTrans} value={this.state.setTransValue}>
                                                <p><Radio value={'never'}>不需要验证</Radio></p>
                                                <p><Radio value={'twohours'}>2小时内不需要验证</Radio></p>
                                                <p><Radio value={'must'}>始终需要验证</Radio></p>
                                            </RadioGroup>
                                        </Modal>
                                        <TransVer
                                            title='验证'
                                            handleOkPhone={this.handleOkPhone}
                                            cancelPhone={this.handleCancelPhone}
                                            visiblePhone={this.state.visiblePhone} 
                                            verifyArr={this.state.verifyArr} 
                                            getAuthCode={this.getAuthCode}
                                            codeChange={this.codeChange}
                                            codeType='transactionverificationwithphone'
                                            account={this.state.phone}
                                        />
                                    </div>
                                </div> */}
                                                    {/* **设置实名绑定** */}
                                                    <div className="contentSet-Content-boundPho clerafix">
                                                        <div className="boundPho-style1">
                                                            <span className="boundPho-style1-mar">{contentSet.nameTrans}</span>
                                                        </div>
                                                        <div className="boundPho-style2">
                                                            {
                                                                (this.state.isCertification == 'yes') ?
                                                                    (<span style={{ color: '#56CAA2' }}>{contentSet.upCertified}</span>) :
                                                                    this.state.isCertification == 'no' ?
                                                                        (<span style={{ color: 'red' }}>{contentSet.noCertified}</span>) :
                                                                        this.state.isCertification == 'pending' ? (<span style={{ color: 'red' }}>审核中</span>) :
                                                                            (<span style={{ color: 'red' }}>审核失败</span>)
                                                            }
                                                        </div>
                                                        <div className="boundPho-style3">
                                                            {
                                                                // ((this.state.isCertification=='no') || (this.state.isCertification=='failed'))?
                                                                ((this.state.isCertification != 'pending') && (this.state.isCertification != 'yes')) ?
                                                                    (<Link to="/users/UserCenter/realName">
                                                                        <span>{contentSet.Certified}
                                                                        </span>
                                                                    </Link>) : null
                                                            }

                                                        </div>
                                                    </div>
                                                </Content>
                                            </div>
                                        </Content>
                                    </Layout>
                                </div>
                                <PhoneModel
                                    email={this.state.email}
                                    phone={this.state.phone}
                                    isAuthentication={this.state.isAuthentication}
                                    showPho={this.state.showPho}
                                    closePho={this.closePho}
                                    nextThree={this.phoBoundThree}
                                />
                                <PhoneChangeModel
                                    email={this.state.email}
                                    phone={this.state.phone}
                                    isAuthentication={this.state.isAuthentication}
                                    showChangePho={this.state.showChangePho}
                                    closeChangePho={this.closeChangePho}
                                    changeNextThree={this.changeNextThree}
                                />
                                <GoogleModal
                                    email={this.state.email}
                                    phone={this.state.phone}
                                    isAuthentication={this.state.isAuthentication}
                                    history={this.props.history}
                                    showGoogle={this.state.showGoogle}
                                    boundGooglecurrent={this.state.boundGooglecurrent}
                                    closeGoogle={this.closeGoogle}

                                />
                                <GoogleChangeModel
                                    email={this.state.email}
                                    phone={this.state.phone}
                                    isAuthentication={this.state.isAuthentication}
                                    history={this.props.history}
                                    showChangeGoogle={this.state.showChangeGoogle}
                                    changeGooglecurrent={this.state.changeGooglecurrent}
                                    closeChangeGoogle={this.closeChangeGoogle}


                                // googleChangeCodeValue={e=>this.googleChangeCodeValue(e)}
                                // closeGoogleChangeVisible={msg=>this.closeGoogleChangeVisible(msg)}
                                // setNextGoogleTrans={e=>this.getContMain(e)}
                                />
                                <PassModal
                                    cancelPass={this.cancelPass}
                                    visiblePass={this.state.visiblePass}
                                    portPass='modifyPassword'
                                    bindingPhone={this.state.phone ? true : false}
                                    phone={this.state.phone ? this.state.phone : '无手机号'}
                                    email={this.state.email ? this.state.email : '无邮箱'}
                                />
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Provider>
        )
    }
}



export default SetAccount
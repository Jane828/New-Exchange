import React, {Component} from 'react'
import { Select,Input,Button,Upload, Icon, message ,Checkbox,Breadcrumb, Layout} from 'antd';
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import copy from 'copy-to-clipboard';
import applePng from './img/applePng.png'
import androidPng from './img/androidPng.png'
import googlePng from './img/googlePng.png'
import './index.less'
import store from '../store'
import UserCenterMenu from '../menu'
import { Provider, inject, observer } from 'mobx-react'
import { Router, Route, withRouter ,Link} from 'react-router-dom'
const { Header, Footer, Sider, Content } = Layout;
import GoogleModal from '../googleModel'
import $ from 'jquery'
const Option = Select.Option;


@withRouter
@inject('Store')
@observer

class GoogleTrans extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state={
        key:'',
        src:'',
        googleCodeNum:null,
        baseCodeImg:''
    }
    goSetAccount=()=>{
        this.props.setPage('setAccount');
    }
    googleCode=(e)=>{
        this.setState({
            googleCodeNum:e.target.value
        }) 
    }
    copyKey=()=>{
        copy(this.state.key)
    }
    sucBound=()=>{
        let _this = this
        console.log('this.props.location.change',this.props.location.change)
        console.log('this.props.location.query',this.props.location.query)
        if(sessionStorage.gooBoundCode){
            let gooBoundCode=this.props.location.query
            let obj={
                authemailcode:sessionStorage.inputEmailCode,
                authtoken:this.state.googleCodeNum
            }
            let obj1={
                authphonecode:sessionStorage.phoneCode,
                authemailcode:sessionStorage.inputEmailCode,
                authtoken:this.state.googleCodeNum
            }
            if(sessionStorage.phoneCode){
                CgicallPost("/apiv1/user/authBindWithPhone",obj1,function(d){
                    if(d.result){
                        sessionStorage.boundGoogleSuc = true;
                        // _this.props.history.push({ pathname :'/users/userCenter/setAccount' ,query : {boundGoogleSuc:true}})
                        _this.props.history.push({ pathname :'/users/userCenter/setAccount'})
                    }else{
                        message.error(GetErrorMsg(d))
                    }       
                });
            }else {
                CgicallPost("/apiv1/user/authBind",obj,function(d){
                    if(d.result){
                        sessionStorage.boundGoogleSuc = true;
                        // _this.props.history.push({ pathname :'/users/userCenter/setAccount' ,query : {boundGoogleSuc:true}})
                        _this.props.history.push({ pathname :'/users/userCenter/setAccount'})
                    }else{
                        message.error(GetErrorMsg(d))
                    }       
                });
            }
        // }else if(this.props.location.change&&this.props.location.change.changeSuc){
        }else if(sessionStorage.changeSuc){
            let gooChangeCode=this.props.location.change
            let obj={
                authemailcode:sessionStorage.emailChangeCode,
                oldauthtoken:sessionStorage.googleChangeCode,
                newauthtoken:this.state.googleCodeNum
            }
            let obj1={
                authemailcode:sessionStorage.emailChangeCode,
                authphonecode:sessionStorage.phoneChangeCode,
                newauthtoken:this.state.googleCodeNum
            }
            if(sessionStorage.phoneChangeCode){
                CgicallPost("/apiv1/user/authModifyWithPhone",obj1,function(d){
                    if(d.result){
                        sessionStorage.changeGoogleSuc = true;
                        // _this.props.history.push({ pathname :'/users/userCenter/setAccount' ,change : {changeGoogleSuc:true}})
                        _this.props.history.push({ pathname :'/users/userCenter/setAccount'})
                    }else{
                        message.error(GetErrorMsg(d))
                    }       
                });
            }else {
                CgicallPost("/apiv1/user/authModify",obj,function(d){
                    if(d.result){
                        sessionStorage.changeGoogleSuc = true;
                        // _this.props.history.push({ pathname :'/users/userCenter/setAccount' ,change : {changeGoogleSuc:true}})
                        _this.props.history.push({ pathname :'/users/userCenter/setAccount'})
                    }else{
                        message.error(GetErrorMsg(d))
                    }       
                });
            }
        }
        
       
        
    }
    componentDidMount=()=> {
        let _this = this
        // if(!_this.props.googleEmailCode){
        //     this.props.setPage('setAccount');
        // }
        if(!sessionStorage.googleT) this.props.history.replace('/users/userCenter/setAccount');
        CgicallPost("/apiv1/user/authSecret",'',function(d){
            if(d.result){
                _this.setState({
                    key:d.result
                }) 
            }else{
                message.error(GetErrorMsg(d))
            }       
        });
        $.ajax({
            type:'post',
            url: "/apiv1/user/authQR",
            success: function(data) {
                //将图片的Base64编码
                let baseImg="data:image/png;base64,"+data
                _this.setState({
                    baseCodeImg:baseImg
                }) 
            },
            error:function(data){
            }
           });
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu line-menu" width='260'>
                            <UserCenterMenu showKey='setAccount'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='googleTrans'>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link to="/users/UserCenter/setAccount">
                                                <span>账号设置</span>
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>绑定谷歌验证器</Breadcrumb.Item>
                                    </Breadcrumb>
                                    {/* ******* 1*/}
                                    <div className='googleTrans-hearder'>
                                        <span>绑定谷歌验证器</span>
                                    </div>
                                    {/* ******* 2*/}
                                    <div><span className='googleTrans-tips'>说明：谷歌验证器是一款类似短信验证的动态口令工具。使用谷歌验证器可以在不方便接收短信时，用于登录、提现、修改安全设置等操作的安全验证。</span></div>
                                    {/* ******* 3*/}
                                    <div className='googleTrans-main'>
                                        <div className='main-one'>
                                            
                                            <div className='roundBall'>
                                                <span className='roundBallNum'>1</span>
                                            </div>
                                            <p className='main-tips'>下载谷歌验证器app</p>
                                        
                                            <div className='main-down'>
                                                <div className='down-ios'>
                                                    <Button className='ios-button' type="primary"><img src={applePng}/>App Store</Button>
                                                    <p className='ios-Exp'>iOS用户搜索“Authenticator”下载</p>
                                                </div>
                                                <div className='down-android'>
                                                    <Button className='android-button'type="primary"><img src={androidPng}/>Google Play</Button>
                                                    <p>Android用户搜索“谷歌验证器”下载</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='main-two'>
                                            <div className='roundBall'>
                                                <span className='roundBallNum'>2</span>
                                            </div>
                                            <p className='main-tips'>安装完成后，需在谷歌验证器中进行密钥配置</p>
                                            <div className='main-code'>
                                                <p className='code-tips'>打开谷歌验证器，扫描下方二维码或手动输入如下密钥。</p>
                                                <div className='code-img'>
                                                    <img src={this.state.baseCodeImg} style={{width:'120px'}}/>
                                                    <span className='code-img-key'>密钥:</span>
                                                    <span className='code-img-key1'>{this.state.key}</span>
                                                    <span className='code-img-copy' onClick={this.copyKey}>复制</span>
                                                </div>
                                                <p className='code-Exp'>注意：请妥善保存密钥，如果误删，可以通过手动输入密钥来回复。</p>
                                            </div>
                                        </div>
                                        <div className='main-three'>
                                            <div className='roundBall'>
                                                <span className='roundBallNum'>3</span>
                                            </div>
                                            <p className='main-tips'>安装完成后，需在谷歌验证器中进行密钥配置</p>
                                            <div className='main-input-google'>
                                                <Input  placeholder="输入6位谷歌验证码" onChange={this.googleCode} addonBefore={<img src={googlePng} style={{width:'20px'}}/>} />
                                            </div>
                                        </div>
                                        <div className='main-four'>
                                            <Button className='main-four-button' onClick={this.sucBound} type="primary">绑定</Button>
                                        </div>
                                    </div>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Provider>
        )
    }
}


export default GoogleTrans
import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import { message, Modal, Button, Input, Form, Layout, Menu } from 'antd'
import GoogleModal from '../googleModel'
import GoogleChangeModel from '../googleChangeModel'
import $ from  'jquery'
import CryptoJS from 'crypto-js'
import FormBox from '../components/FormBox'
import store from '../store'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import Loadable from 'react-loadable';
import DelayLoading from '@/components/DelayLoading'
// import axios from 'axios'
import './index.less'
const { Header, Footer, Sider, Content } = Layout;
let LoadableComponent;
@withRouter
@inject('Store')
@observer
class MessageCenter extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。
        console.log(this.store);  
    }
    state = {
        loading: false,
        crtMenu:sessionStorage.WalletMenu || 'setAccount',
        googleVisible:false,
        googleChangeVisible:false,
        GoogleNumSuc:0,
        isAuthentication:'',
        email:'',
        phone:'',
        googleEmailCode:'',
        phoneCode:'',
        googleChangeEmailCode:'',
        phoneChangeCode:'',

    }
    // **************google的绑定弹出界面
    showGoogleVisible=()=>{
        this.setState({
            googleVisible: true
        });
    }
    showGoogleSuc=()=>{
        this.setState({
            googleVisible: true,
            GoogleNumSuc:2
        });
        this.getContMain('setAccount')
    }
    closeGoogleVisible=()=>{
        this.setState({
            googleVisible: false,
        }); 
    }
    passEmailAut=(x,y,z)=>{
        this.setState({
            email: x,
            isAuthentication:y,
            phone:z
        }); 
    }
    googleCodeValue = (e)=>{
        this.setState({
            googleEmailCode: e.inputEmailCode,
            phoneCode: e.phoneCode
        }); 
    }
    // **************google的更换界面
    showChangeGoogleVisible=()=>{
        this.setState({
            googleChangeVisible: true
        });
    }
    closeGoogleChangeVisible=()=>{
        this.setState({
            googleChangeVisible: false,
        }); 
    }
    googleChangeCodeValue=(e)=>{
        this.setState({
            changeGoogleInputCode:e.changeGoogleInputCode,
            googleChangeEmailCode: e.inputEmailCode,
            phoneChangeCode: e.phoneCode
        });
    }
    
    getContMain = (event) => {
        console.log('event&&&&&&&',event)
        if(event && typeof event == "string")  {
            sessionStorage.WalletMenu = event;
            this.getPage(event);
        }else {
            sessionStorage.WalletMenu = event.key;
            this.getPage(event.key);
        }
        this.forceUpdate();
        // sessionStorage.WalletMenu = event.key;
        // this.getPage(event.key);
        // this.forceUpdate();
    }
    getPage = (key) => {
        switch(key) {
            case 'messageCenter':
                LoadableComponent = Loadable({
                    loader: () => import ('../Message'),
                    loading: DelayLoading,
                })
                break;
            case 'aktionen':
                LoadableComponent = Loadable({
                    loader: () => import ('../aktionen'),
                    loading: DelayLoading,
                })
                break;
            case 'recomAward':
                LoadableComponent = Loadable({
                    loader: () => import ('../recomAward'),
                    loading: DelayLoading,
                })
                break;
            case 'secretKey':
                LoadableComponent = Loadable({
                    loader: () => import ('../secretKey'),
                    loading: DelayLoading,
                })
                break;
            case 'realName':
                LoadableComponent = Loadable({
                    loader: () => import ('../realName'),
                    loading: DelayLoading,
                })
                break;
            case 'googleTrans':
                LoadableComponent = Loadable({
                    loader: () => import ('../googleTrans'),
                    loading: DelayLoading,
                })
                break;
            case 'logHistory':
                LoadableComponent = Loadable({
                    loader: () => import ('../logHistory'),
                    loading: DelayLoading,
                })
                break;
            default:
                LoadableComponent = Loadable({
                    loader: () => import ('../setAccount'),
                    loading: DelayLoading,
                })
                break;
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    componentWillMount() {
        this.getPage(this.state.crtMenu);
    }
    render() {
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout className="wrap-margin">
                        <Sider theme='light' className="subpage-menu" width='200'>
                            <Menu
                                defaultSelectedKeys={[this.state.crtMenu]}
                                // defaultOpenKeys={['sub1']}
                                mode="inline"
                                onSelect = {this.getContMain}
                                // inlineCollapsed={this.state.collapsed}
                                className="nav-wrapper"
                                defaultOpenKeys={['setAccount']}
                            >
                                <Menu.Item className ="select-hover" key ="setAccount">
                                    <span className ="nav-text">账号设置</span>
                                </Menu.Item>
                                <Menu.Item className ="select-hover" key="messageCenter">
                                    <span className ="nav-text">消息中心</span>
                                </Menu.Item>
                                {/* <Menu.Item key ="aktionen">
                                    <span className ="nav-text">注册奖励</span>
                                </Menu.Item>
                                <Menu.Item key ="recomAward">
                                    <span className ="nav-text">推荐奖励</span>
                                </Menu.Item> */}
                                <Menu.Item className ="select-hover" key="secretKey">
                                    <span className ="nav-text">API密钥</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content >
                                <LoadableComponent 
                                googleEmailCode={this.state.googleEmailCode}//google绑定的验证码
                                phoneCode={this.state.phoneCode}
                                googleChangeEmailCode={this.state.googleChangeEmailCode}//google更换验证码
                                phoneChangeCode={this.state.phoneChangeCode}
                                showChangeGoogleVisible={e=>this.showChangeGoogleVisible(e)}
                                showGoogleVisible={e=>this.showGoogleVisible(e)}
                                passEmailAut={(x,y,z)=>this.passEmailAut(x,y,z)}
                                nextGoogleThree={e=>this.nextGoogleThree(e)}//第三步要做的事，目前没做
                                showGoogleSuc={e=>this.showGoogleSuc(e)} 
                                setPage={msg => this.getContMain(msg)}/>
                                {/* <GoogleModal
                                email={this.state.email}
                                phone={this.state.phone}
                                isAuthentication={this.state.isAuthentication}
                                googleVisible={this.state.googleVisible}
                                GoogleNumSuc={this.state.GoogleNumSuc}

                                googleCodeValue={e=>this.googleCodeValue(e)}
                                closeGoogleVisible={msg=>this.closeGoogleVisible(msg)}
                                setNextGoogleTrans={e=>this.getContMain(e)}/> */}
                                {/* <GoogleChangeModel
                                email={this.state.email}
                                phone={this.state.phone}
                                isAuthentication={this.state.isAuthentication}
                                googleChangeVisible={this.state.googleChangeVisible}
                                GoogleNumSuc={this.state.GoogleNumSuc}

                                googleChangeCodeValue={e=>this.googleChangeCodeValue(e)}
                                closeGoogleChangeVisible={msg=>this.closeGoogleChangeVisible(msg)}
                                setNextGoogleTrans={e=>this.getContMain(e)}/> */}
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Provider>
        )
    }
}
export default MessageCenter

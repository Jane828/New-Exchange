import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import { message, Modal, Button, Input, Form, Layout, Menu } from 'antd'
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
        crtMenu:sessionStorage.WalletMenu || 'asset'
    }
    getContMain = (event) => {
        sessionStorage.WalletMenu = event.key;
        this.getPage(event.key);
        this.forceUpdate();
    }
    getPage = (key) => {
        console.log('**********************')
        console.log(key);
        switch(key) {
            case 'setAccount':
          
                LoadableComponent = Loadable({
                    loader: () => import ('../setAccount'),
                    loading: DelayLoading,
                })
                break;
            case 'registrationAward':
                LoadableComponent = Loadable({
                    loader: () => import ('../registrationAward'),
                    loading: DelayLoading,
                })
                break;
            case 'recommendedAward':
                LoadableComponent = Loadable({
                    loader: () => import ('../recommendedAward'),
                    loading: DelayLoading,
                })
                break;
            case 'secretKey':
                LoadableComponent = Loadable({
                    loader: () => import ('../secretKey'),
                    loading: DelayLoading,
                })
                break;
            default:
                LoadableComponent = Loadable({
                    loader: () => import ('../message'),
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
                <div className='wallet_wrap clearFix'>
                <Layout className='wallet_content_wrap'>
                    <Sider theme='light' className="walletMenu" width='260'>
                    <Menu
                        defaultSelectedKeys={[this.state.crtMenu]}
                        // defaultOpenKeys={['sub1']}
                        mode="inline"
                        onSelect = {this.getContMain}
                        // inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="setAccount">
                            <span className="nav-text">账号设置</span>
                        </Menu.Item>
                        <Menu.Item key="messageCenter">
                            <span className="nav-text">信息中心</span>
                        </Menu.Item>
                        {/* <Menu.Item key="registrationAward">
                            <span className="nav-text">注册奖励</span>
                        </Menu.Item>
                        <Menu.Item key="recommendedAward">
                            <span className="nav-text">推荐奖励</span>
                        </Menu.Item> */}
                        <Menu.Item key="secretKey">
                            <span className="nav-text">API密钥</span>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Layout>
                        <Content>
                            <LoadableComponent />
                        </Content>
                    </Layout>
                </Layout>
                </div>
            </Provider>
        )
    }
}
export default MessageCenter

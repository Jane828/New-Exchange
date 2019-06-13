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
class Wallet extends Component {
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
        console.log(event);
        console.log(typeof event);
        console.log("---------------------------------------------");
        if(event && typeof event == "string")  {
            sessionStorage.WalletMenu = event;
            this.getPage(event);
        }else {
            sessionStorage.WalletMenu = event.key;
            this.getPage(event.key);
        }
        this.forceUpdate();
    }
    getPage = (key) => {
        switch(key) {
            case 'recRecord':
                LoadableComponent = Loadable({
                    loader: () => import('../recRecord'),
                    loading: DelayLoading,
                })
                break;
            case 'daybook':
                LoadableComponent = Loadable({
                    loader: () => import('../daybook'),
                    loading: DelayLoading,
                })
                break;
            case 'withDrawal':
                LoadableComponent = Loadable({
                    loader: () => import('../withDrawal'),
                    loading: DelayLoading,
                })
                break;
            case 'recharge':
                LoadableComponent = Loadable({
                    loader: () => import('../recharge'),
                    loading: DelayLoading,
                })
                break;
            default:
                LoadableComponent = Loadable({
                    loader: () => import('../asset'),
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
                <div className='wallet_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu" width='260'>
                            <Menu
                                defaultSelectedKeys={[this.state.crtMenu]}
                                // defaultOpenKeys={['sub1']}
                                mode="inline"
                                onSelect = {this.getContMain}
                                // inlineCollapsed={this.state.collapsed}
                            >
                                <Menu.Item key="asset">
                                    <span className="nav-text">我的资产</span>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="recRecord">
                                    <span className="nav-text">充值记录</span>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="daybook">
                                    <span className="nav-text">提现记录</span>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="withDrawal">
                                    <span className="nav-text">资产流水</span>
                                </Menu.Item>       
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content>
                                <LoadableComponent setPage={this.getContMain}/>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Provider>
        )
    }
}
export default Wallet

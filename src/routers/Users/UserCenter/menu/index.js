import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import { Menu } from 'antd'
// import axios from 'axios'
import SetAccount from './img/setAccount.png';
import Message from './img/message.png';
import SecretKey from './img/secretKey.png';
import '../container/index.less'
class WalletMenu extends Component {
    render() {
        return (
            <Menu mode="inline" defaultSelectedKeys={[this.props.showKey]}>
                <Menu.Item className ="select-hover" key ="setAccount">
                    <Link to="/users/UserCenter/setAccount">
                        <div>
                            <img src={SetAccount}></img>
                            <span className ="nav-text">账号设置</span>
                        </div>
                    </Link>
                </Menu.Item>
                <Menu.Item className ="select-hover" key="message">
                    <Link to="/users/UserCenter/message">
                        <div>
                            <img src={Message}></img>
                            <span className ="nav-text">消息中心</span>
                        </div>
                    </Link>
                </Menu.Item>
                {/* <Menu.Item key ="aktionen">
                    <Link to="/users/UserCenter/aktionen">
                        <span className ="nav-text">注册奖励</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key ="recomAward">    
                    <Link to="/users/UserCenter/recomAward">
                        <span className ="nav-text">邀请奖励</span>
                    </Link>
                </Menu.Item> */}
                <Menu.Item className ="select-hover" key="secretKey" disabled>
                    <Link to="/users/UserCenter/secretKey">
                        <div>
                            <img src={SecretKey}></img>
                            <span className ="nav-text">API密钥</span>
                        </div>
                    </Link>
                </Menu.Item>
            </Menu>  
        )
    }
}
export default WalletMenu

import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import { Menu } from 'antd'
import Asset from './img/asset.png'; 
import Daybook from './img/daybook.png'; 
import RecRecord from './img/recRecord.png'; 
import WithDrawal from './img/withDrawal.png'; 

// import axios from 'axios'
import '../container/index.less'
class WalletMenu extends Component {
    render() {
        return (
            <Menu mode="inline" defaultSelectedKeys={[this.props.showKey]}>
                <Menu.Item key="asset" className="select-hover">
                    <Link to="/wallet/asset">
                        <div>
                            <img src={Asset}></img>
                            <span className="nav-text">我的资产</span>
                        </div>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="recRecord" className="select-hover">
                    <Link to="/wallet/recRecord">
                        <div>
                            <img src={RecRecord}></img>
                            <span className="nav-text">充值记录</span>
                        </div>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="withDrawal" className="select-hover">
                    <Link to="/wallet/withDrawal">
                        <div>
                            <img src={Daybook}></img>
                            <span className="nav-text">提现记录</span>
                        </div>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="daybook" className="select-hover">
                    <Link to="/wallet/daybook">
                        <div>
                            <img src={WithDrawal}></img>
                            <span className="nav-text">资产流水</span>
                        </div>
                    </Link>
                </Menu.Item>
            </Menu>  
        )
    }
}
export default WalletMenu

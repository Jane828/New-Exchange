import React, { Component } from 'react'
import { Route, withRouter, Link} from 'react-router-dom'
// import { observer, inject } from 'mobx-react'
import { Tooltip } from 'antd'
// import routerConfig from '@/config/routes'
import logo from '../assets/logo-b.png'
// import Cookies from 'js-cookie'
// import Loading from '@/components/Loading'
import { BottomTop, BottomBto} from '@/config/bottomMenu'

@withRouter
class Bottom extends Component {
    componentWillMount(){
        // let { userInfo,updateName } = this.props.Store
        // if (userInfo.name == '') {
        //     updateName(Cookies.get('userName'))
        // }
    }
    state={
        keys:[],
        loginState:true
    }
    render() {
        // const { name } = this.props.Store.userInfo
        return (
            // <div>我是傻逼</div>
            <div className="footer-main">
                <div className="footer-top">
                    <div className="footer-content">
                        <div className="footer-left">
                            <div className="footrt-logo"><img src={logo} /></div>
                            <p className="footrt-state">全生态分红节点型社区</p>
                            {/* <div className="footrt-contact">
                                <p><a  className="contact-box">微博</a></p>
                                <p><a  className="contact-box">邮箱</a></p>
                                <p><a  className="contact-box">Twitter</a></p>
                                <p><a  className="contact-box contact-box-en">Facebook</a></p>
                                <p><a  className="contact-box contact-box-en">Telegram</a></p>
                            </div> */}
                        </div>
                        <div className="footer-right">
                            <ul>
                                {/* <li>
                                    <p className="footer-link-title">友情链接</p>
                                    <p className="footer-link footer-link-friend">
                                        <a>友情链接</a>
                                        <a>logo</a>
                                    </p>
                                    <p className="footer-link footer-link-friend">
                                        <a>友情链接</a>
                                        <a>logo</a>
                                    </p>
                                    <p className="footer-link footer-link-friend">
                                        <a>友情链接</a>
                                        <a>logo</a>
                                    </p>
                                </li> */}
                                {BottomTop.map((item,i)=>
                                <li>
                                    <p className="footer-link-title">{item.title}</p>
                                    {item.list.map((listItem,ii)=>
                                        <p className="footer-link" disabled={true}>
                                            <Link to={item.key + listItem.key} disabled={true} component={item.component}>{listItem.title}</Link>
                                        </p>
                                    )}
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="footer-bottom-left">Copyright @ 2018-2019 Bitcoco.com. All rights reserved.</p>
                    {/* <ul className="footer-bottom-right">
                        {BottomBto.map((item,i)=>
                            <li>
                                <Link to={item.key}>
                                    <img src={require('../assets/' + item.type)} />
                                </Link>
                            </li>
                        )}
                    </ul> */}
                </div>
                    
                </div>
            </div>
        )
    }
}

export default Bottom
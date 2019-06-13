import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router, Route, withRouter ,Link} from 'react-router-dom'
import{ Icon, Table, Tooltip, Input, Button, message, Layout } from 'antd'
import $ from 'jquery'
import store from '../store'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import UserCenterMenu from '../menu'
const { Header, Footer, Sider, Content } = Layout;

@withRouter
@inject('Store')
@observer
class Aktionen extends Component {
    constructor(){
        super()
        this.store = new store();
    }
    state = {
        loading: false,
        realname: 'no',
        registerReward: false
    }
    getCertification = () => {
        
        let _this = this;
        CgicallPost('/apiv1/user/getUserInfo', '',function(d){
            if(d.result) {
                let realname = d.result.isCertification;
                _this.setState({realname: (realname == "yes")?realname:(realname == "pending")?realname:'no',registerReward: d.result.registerReward});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    componentDidMount() {
        this.getCertification();
    }
    render() {
        const { loading, amonnt,realname,registerReward } = this.state;
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu" width='260'>
                            <UserCenterMenu showKey='aktionen'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-interval plate-wrapper-stick'>
                                        <div className='plate-wrapper-header'>
                                            <h3>注册奖励</h3>
                                        </div>
                                        <div className='plate-interval'></div>
                                        <div className='plate-wrapper-main'>
                                            <div className='aktionen-main'>    
                                                <div className='not-realname' style={{display: (realname == 'no'?'block':'none')}}>
                                                    <div className='gold-text'>您还未进行实名认证</div>
                                                    <div className='ellipse-btn'><Link to='/users/UserCenter/realName'><span>实名认证</span></Link></div>
                                                </div>
                                                <div className='has-realname gold-text' style={{display: (realname == 'pending'?'block':'none')}}>您已提交实名认证，等待系统审核</div>
                                                <div className='has-realname gold-text' style={{display: ((realname == 'yes' && registerReward)?'block':'none')}}>您已成功领取实名认证奖励100 coco币</div>
                                                <div className='has-realname gold-text' style={{display: ((realname == 'yes' && !registerReward)?'block':'none')}}>您已通过实名认证，等待系统发放奖励</div>
                                            </div>
                                            <div className='plate-rules'>
                                                <p className='rule-title'>活动规则：</p>
                                                <ul className='rule-msg'>
                                                    <li>1.领取实名奖励的用户必须是实名认证用户，非实名认证用户无法获得奖励，成功完成实名认证，即可获得100coco币；</li>
                                                    <li>2.一旦您成功完成实名认证，获得的奖励将会在24小时内充值到您的账户，具体入账时间可能存在延迟；</li>
                                                    <li>3.平台严查恶意注册的账户，一经发现，将不会收到奖励。</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='plate-out-tip'>
                                            <ul className='out-tip'>
                                                <li>* 注册即可进行实名认证</li>
                                                <li>* 官方根据实际运营情况，保留对活动规则做出修改的权利，请关注官方公告。</li>
                                            </ul>
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
export default Aktionen
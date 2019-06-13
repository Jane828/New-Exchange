import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import { message, Layout, Breadcrumb, Tabs, Form, Select } from 'antd'
import store from '../store'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import WalletMenu from '../menu'
import { RechargeTable, InstationMention, GeneralMention} from './components'
import { AppAdrss, AppFrd} from './addModal'
const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

@withRouter
@inject('Store')
@observer
class Recharge extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state = {
        loading: false,
        hasBind: true,
        GeneralHtml:'获取短信验证码',
        InstationHtml:'获取短信验证码',
        addAdsHtml:'获取短信验证码',
        addFriHtml:'获取短信验证码',
        gtime:30,
        itime:30,
        atime:30,
        ftime:30,
        getUserInfo: {},
        codeDisGeneral: false,
        codeDisInsta: false,
        codeDisAddAds: false,
        codeDisAddFri: false,
        type:'general',
        gVisible: false,
        iVisible: false,
        amount: 'BTC',
        fee: [{key: 'BTC',value:'0'}]
    }
    countDown = (type) => {
        var num = (type == 'general')?this.state.gtime:(type == 'phone')?this.state.itime:(type == 'address')?this.state.atime:this.state.ftime;
        var _this = this;
        let msg = '获取短信验证码';
        setTimeout(function(){
            if(num){
                if(type == 'general') {
                    _this.setState({GeneralHtml:num + '秒后重新获取',codeDisGeneral: true})
                    _this.state.gtime = num - 1;
                }else if(type == 'phone'){
                    _this.setState({InstationHtml:num + '秒后重新获取',codeDisInsta:true})
                    _this.state.itime = num - 1;
                }else if(type == 'address'){
                    _this.setState({addAdsHtml:num + '秒后重新获取',codeDisAddAds:true})
                    _this.state.atime = num - 1;
                }else {
                    _this.setState({addFriHtml:num + '秒后重新获取',codeDisAddFri:true})
                    _this.state.gtime = num - 1;
                }
                _this.countDown(type);
            }else {
                if(type == 'general') {
                    _this.setState({GeneralHtml: msg,codeDisGeneral: false})
                    _this.state.gtime = 30;
                }else if(type == 'phone'){
                    _this.setState({InstationHtml: msg,codeDisInsta:false})
                    _this.state.itime = 30;
                }else if(type == 'address'){
                    _this.setState({addAdsHtml: msg,codeDisAddAds:false})
                    _this.state.atime = 30;
                }else {
                    _this.setState({addFriHtml: msg,codeDisAddFri:false})
                    _this.state.itime = 30;
                }
            } 
        },1000)
    }
    getAuthCode = (type,event) => {
        var obj = {
            type: 'withdrawbyphone',
            account: this.state.getUserInfo.phone,
            receiver : 'phone'
        }
        var _this = this;
        CgicallPost("/apiv1/visitor/getValidateCode",obj,function(d){
            if(d.result) {
                message.success('验证码已发送，请注意查收');
                _this.countDown(type);
            }else {
                message.error(GetErrorMsg(d));
            }
            
        });
    }
    getCertification = () => {
        let _this = this;
        CgicallPost('/apiv1/user/getUserInfo', '',function(d){
            if(d.result) {
                let realname = d.result.isCertification;
                _this.setState({getUserInfo: d.result,realname: (realname == "yes")?realname:(realname == "pending")?realname:'no'});
                _this.setChildG.getUserInfo(d.result);
                _this.setChildI.getUserInfo(d.result);
                _this.setChildAds.getUserInfo(d.result);
                _this.setChildFri.getUserInfo(d.result);
            }else {
                message.error(GetErrorMsg(d))
            }
        })
        this.getSetting();
        this.getRate();
    }
    toSeting = () => {
        this.props.history.push('/users/userCenter/setAccount');
    }
    setChildG = (setChildG) => {
        this.setChildG = setChildG;
    }
    setChildI = (setChildI) => {
        this.setChildI = setChildI;
    }
    setChildAds = (setChildAds) => {
        this.setChildAds = setChildAds;
    }
    setChildFri = (setChildFri) => {
        this.setChildFri = setChildFri;
    }
    addAddress = () => {
        this.setChildG.getAddress();
    }
    addLinkman = () => {
        this.setChildI.getLinkman();
    }
    getSetting = () => {
        let _this = this;
        let arr = [];
        Cgicallget('/apiv1/user/wallet/setting', '' ,function(d){
            if(d.result) {
                let data = d.result.withdraw_fee;
                for(var key in data) {
                    arr.push({key: key,value: data[key]})
                }
                if(arr.length) {
                    _this.setChildG.getFee(arr);
                    _this.setChildI.getFee(arr)
                }
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    getRate = () => {
        let _this = this;
        Cgicallget('/apiv1/user/wallet/currency/mywallet', '',function(d){
            if(d.result) {
                let arr = [];
                let arrRate = [];
                let market_value = d.result.market_value;
                // for(var key in d.result.market_value) {
                //     arr.push({key:key,data: market_value[key]})
                // }
                // for(var key in d.result.rate) {
                //     arrRate.push({key:key,data: d.result.rate[key]});
                // }
                _this.setChildG.getRate(d.result.balance);
                _this.setChildI.getRate(d.result.balance);
            }else {
                message.error(GetErrorMsg(d))
                // _this.setState({currency: currency})
            }
        })
    }
    componentDidMount() {
        this.getCertification();
        const searchParams = new URLSearchParams(this.props.location.search)
        const amount = searchParams.get('code')
        if(!amount) this.props.history.push('/wallet/asset');
        this.setState({amount: amount});
    }
    goWithDrawaled = (num) => {
        this.props.history.push('/wallet/withDrawaled' + '?code=' + encodeURIComponent(this.state.amount) + '&num=' + encodeURIComponent(num));
    }
    gVisible = () => {
        console.log("-----------------------")
        this.setState({gVisible: true})
    }
    gCancel = () => {
        this.setState({gVisible: false})
    }
    iVisible = () => {
        this.setState({iVisible: true})
    }
    iCancel = () => {
        this.setState({iVisible: false})
    }
    render() {
        const { loading, amount, InstationHtml, GeneralHtml, addAdsHtml, addFriHtml, fee, codeDisGeneral, codeDisInsta, codeDisAddAds, codeDisAddFri, getUserInfo } = this.state;
        return (
            <Provider store={this.store}>
                <div className='wallet_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu" width='260'>
                            <WalletMenu showKey='asset'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='plate-crumbs'>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link to='/wallet/asset'>我的资产
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            Bitcoin Cash提现
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-interval plate-wrapper-stick' style={{display: (this.state.hasBind?'none':'block')}}>
                                        <div className='plate-wrapper-header'>
                                            <h3>Bitcoin Cash提现</h3>
                                            <div className='plate-header-right'>
                                                <a href='javascript:;'>常见充值问题 ></a>
                                            </div>
                                        </div>
                                        <div className='plate-interval'></div>
                                        <div className='plate-wrapper-main'>
                                            <div className='plate-need-attestation'>
                                                <p>您还没有设置安全验证方式，提现需</p>
                                                <p><a onClick={this.toSeting}>绑定手机号</a>或<a onClick={this.toSeting}>Google验证器</a>，快去设置吧</p>
                                                <div className='ellipse-btn'><a href="javascript:;">实名认证</a></div>
                                            </div>
                                            <div className='plate-rules'>
                                                <p className='rule-title'>提现说明：</p>
                                                <ul className='rule-msg'>
                                                    <li>提现网络费: 0； 提现手续费: 0</li>
                                                    <li>到账时间: 提现审核后将尽快汇出，到账时间取决于收款方所需要的确认数</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='plate-wrapper-interval plate-wrapper-stick' style={{display:(this.state.hasBind)?'block':'none'}}>
                                        <div className='plate-wrapper-main'>
                                            <Tabs defaultActiveKey="award" onChange={this.callback} className='tabs-width-half'>
                                                <TabPane tab="普通提币" key="award" forceRender={true}>
                                                    <GeneralMention 
                                                        phoneHtml={GeneralHtml} 
                                                        visible={this.gVisible} 
                                                        amount={amount} 
                                                        setChild={this.setChildG} 
                                                        getAuthCode={this.getAuthCode}
                                                        codeDisType={codeDisGeneral}
                                                        getUserInfo={getUserInfo}
                                                        goWithDrawaled={this.goWithDrawaled} 
                                                    />
                                                </TabPane>
                                                <TabPane tab="站内转账" key="invite" forceRender={true}>
                                                    <InstationMention 
                                                        phoneHtml={InstationHtml} 
                                                        visible={this.iVisible} 
                                                        amount={amount} 
                                                        setChild={this.setChildI} 
                                                        getAuthCode={this.getAuthCode}
                                                        codeDisType={codeDisInsta}
                                                        getUserInfo={getUserInfo}
                                                        goWithDrawaled={this.goWithDrawaled}
                                                    />
                                                </TabPane>
                                            </Tabs>
                                            <div className='plate-rules'>
                                                <p className='rule-title'>提现说明：</p>
                                                <ul className='rule-msg'>
                                                    <li>提现网络费: 0； 提现手续费: 0</li>
                                                    <li>到账时间: 提现审核后将尽快汇出，到账时间取决于收款方所需要的确认数</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='plate-wrapper-table'>
                                        <div className='plate-wrapper-header'>
                                            <h3>最近提现记录</h3>    
                                        </div>
                                        <RechargeTable amount={amount} />
                                    </div>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                    <AppAdrss 
                        setChild={this.setChildAds} 
                        phoneHtml={addAdsHtml} 
                        getAuthCode={this.getAuthCode}
                        codeDisType={codeDisAddAds}
                        amount={amount} 
                        visible={this.state.gVisible} 
                        visibleFun={this.gVisible} 
                        cancel={this.gCancel} 
                        getMsg={this.addAddress}
                        getUserInfo={getUserInfo}
                    />
                    <AppFrd 
                        setChild={this.setChildFri} 
                        phoneHtml={addFriHtml} 
                        getAuthCode={this.getAuthCode}
                        codeDisType={codeDisAddFri}
                        amount={amount} 
                        visible={this.state.iVisible} 
                        visibleFun={this.iVisible} 
                        cancel={this.iCancel}
                        getMsg={this.addLinkman}
                        getUserInfo={getUserInfo}
                    />
                </div>
            </Provider>
        )
    }
}
export default Recharge
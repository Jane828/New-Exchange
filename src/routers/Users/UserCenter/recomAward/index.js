import React, {Component} from 'react'
import{ Icon, Table,Divider, Tooltip, Tabs,Button, Row, Col, message, Modal, Layout} from 'antd'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import $ from 'jquery'
import store from '../store'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import QRCodeImg from '@/routers/Layouts/assets/qr-code-bg.jpg'
import QRCodeBox from '@/routers/Layouts/assets/qr-code-box.png'
import UserCenterMenu from '../menu'
// import svgpath from 'svgpath';
// import qr from 'qr-image';
const TabPane = Tabs.TabPane;
const QRCode = require('qrcode.react');
const { Header, Footer, Sider, Content } = Layout;
@withRouter
@inject('Store')
@observer
class RecomAward extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state = {
        loading: false,
        realname: false,
        inReview: false,
        visible: false,
        referCode: '',
        friend: 0,
        coco: 0,
        getUserInfo: {}
    }
    callback = (key) => {
        console.log(key);
    }
    copylink = () => {
        message.success("邀请链接复制成功！")
    }
    modalShow = () => {
        this.setState({visible: true})
    }
    onCancel = () => {
        this.setState({visible: false})
    }
    getCertification = () => {
        let _this = this;
        CgicallPost('/apiv1/user/getUserInfo', '',function(d){
            if(d.result) {
                let realname = d.result.isCertification;
                _this.state.getUserInfo = d.result;
                _this.state.referCode = d.result.referCode;
                if(realname == 'yes') {
                    _this.state.realname = true;
                    // _this.getrecommend();
                }else {
                    let inReview = false;
                    if(realname == 'pending'){
                        inReview = true;
                    }
                    _this.setState({realname: false, inReview: inReview});
                }
                _this.getrecommend();
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    getrecommend() {
        let _this = this;
        Cgicallget('/apiv1/user/reward_info', '',function(d){
            if(d.result) {
                _this.setState({friend: d.result.certificated_count,coco: d.result.amount});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    componentDidMount() {
        this.getCertification();
    }
    componentWillMount () {
        // this.getCertification();
    }
    render() {
        const { loading, friend, coco, referCode, getUserInfo } = this.state;
        let protocol = window.location.protocol;
        let hostName = window.location.host.split(':')[0];
        let hostPort = window.location.port;
        hostName = (hostName == 'web.nbc.test')?'h5.nbc.test':'m.bitcoco.com';
        hostName = hostPort?(hostName + ':' + hostPort) : hostName;
        let userInfoEmail = '****';
        if(getUserInfo.email) {
            let arrInfo = getUserInfo.email.split("@");
            let arrInfoN = arrInfo?arrInfo[arrInfo.length - 2]:'';
            if(arrInfo && arrInfoN) {
                userInfoEmail = getUserInfo.email.substring(0,3) + '***' + arrInfoN[arrInfoN.length - 1]  + '@' +  arrInfo[arrInfo.length - 1];
            } 
        }
        return (
            <Provider store={this.store}>
            <div className='users_wrap plate-container clearFix'>
                <Layout>
                    <Sider theme='light' className="subpage-menu" width='260'>
                        <UserCenterMenu showKey='recomAward'/>
                    </Sider>
                    <Layout>
                        <Content>
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-interval plate-wrapper-stick'>
                                        <div className='plate-wrapper-header'>
                                            <h3>邀请奖励</h3>
                                        </div>
                                        <div className='plate-interval'></div>
                                        <div className='plate-wrapper-main'>
                                            <div className='plate-need-attestation' style={{display: ((this.state.realname || this.state.inReview)?'none':'block')}}>
                                                <p>您还没有进行实名认证，</p>
                                                <p>快快选择进行实名认证获取奖励吧！</p>
                                                <div className='ellipse-btn'>
                                                    <Link to='/users/UserCenter/realName'><span>实名认证</span></Link>
                                                </div>
                                            </div>
                                            {/* <div className='plate-need-attestation' style={{display: (this.state.inReview?'block':'none')}}>
                                                <p>您已提交实名认证，等待系统审核</p>
                                            </div> */}
                                            <div className='has-realname gold-text has-realname-only' style={{display: ((this.state.inReview && !this.state.realname)?'block':'none')}}>您已提交实名认证，等待系统审核</div>
                                            {/* <div className='recom-has-realname' style={{display: (this.state.realname?'block':'none')}}> */}
                                            <div className='recom-has-realname'>
                                                <div className='invite-QRcode'>
                                                    {/* <svg width="138" height="138" ref={(ref)=>this._qrcodeSVG = ref} transform="scale(1)">
                                                        <path d={svgpath(qr.svgObject(referCode).path).scale(1, 1).toString()}/>
                                                    </svg> */}
                                                    <QRCode size='138' value={protocol + "//" + hostName +'/invite?code=' + referCode + '&mail=' + userInfoEmail} />
                                                </div>
                                                <div className='invite-code'>
                                                    <label>您的注册邀请码是：</label>
                                                    <span className='invite-code-num'>{referCode}</span>
                                                    <a className='invite-code-btn' href="javascript:;" onClick={this.modalShow}>生成二维码图片</a></div>
                                                <div className='ellipse-btn'>
                                                    <label>我的邀请链接：</label>
                                                    <span>{window.location.protocol}//{window.location.host + '/#/regist?code=' + referCode}</span>
                                                    <CopyToClipboard 
                                                        text={window.location.protocol+ '//' + window.location.host+'/#/regist?code=' + referCode }
                                                        onCopy={this.copylink}>
                                                        <a className='copy-code-btn' href="javascript:;">复制链接</a>
                                                    </CopyToClipboard>
                                                </div>
                                            </div>
                                            <div className='recom-main-bottom'>
                                                <Row>
                                                    <Col span={12}>
                                                        <div className='recom-bottom-box'>
                                                            <div className='recom-bottom-num'>{friend}</div>
                                                            <div className='recom-bottom-msg'>已实名好友</div>
                                                        </div>
                                                        
                                                    </Col>
                                                    <Col span={12}>
                                                        <div className='recom-bottom-box'>
                                                            <div className='recom-bottom-num'>{coco}<span> CoCo</span></div>
                                                            <div className='recom-bottom-msg'>已获得奖励</div>
                                                        </div>
                                                        
                                                    </Col>
                                                </Row>
                                            </div>     
                                        </div>
                                    </div>
                                    
                                    {/* <div className='plate-wrapper-table' style={{display:(this.state.realname)?'block':'none'}}> */}
                                    <div className='plate-wrapper-table'>
                                        <Tabs defaultActiveKey="award" onChange={this.callback}>
                                            <TabPane tab="奖励记录" key="award">
                                                <RewardRecord/>
                                            </TabPane>
                                            <TabPane tab="邀请记录" key="invite">
                                                <InviteRecord/>
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                    <RecomRule />
                                    <Modal
                                        visible={this.state.visible}
                                        title=''
                                        wrapClassName='modal-picture'
                                        maskClosable = {false}
                                        destroyOnClose = {true}
                                        onCancel={this.onCancel}
                                        afterClose={this.defaultModal}
                                        footer={null}
                                        width={416}
                                        // mask={false}
                                    >
                                            {/* <img src={qrcode} /> */}
                                            <div className='modal-main-picture'>
                                                <img src={QRCodeImg}  style={{width:416,height:702}}/>
                                                {/* <svg width="200" height="200" ref={(ref)=>this._qrcodeSVG = ref} transform="scale(1)">
                                                    <path d={svgpath(qr.svgObject(referCode).path).scale(9, 9).toString()}/>
                                                </svg> */}
                                                <div className='main-picture-bottom'>
                                                    <div className='picture-bottom-left'>
                                                        <h2>BitCoCo邀请奖励</h2>
                                                        <p>邀请你加入币可可网</p>
                                                    </div>
                                                    <div className='picture-bottom-right'>
                                                        {/* <QRCode size='100' value={ window.location.protocol + "//" + window.location.host +'/#/regist?code=' + referCode} /> */}
                                                        <QRCode size='100' value={ protocol + "//" + hostName +'/invite?code=' + referCode + '&mail=' + userInfoEmail } />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                    </Modal>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Provider>
        )
    }
}
class RewardRecord extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],
        page: 1,
        limit: 10,
        count: 0
    }
    handleChange = (val) => {
        console.log(val);
    }
    componentDidMount() {
        this.getTableData(this.state.page);
    }
    getTableData = (page,limit) => {
        let _this = this;
        let obj = {
            page: page,
            limit: this.state.limit
        }
        Cgicallget('/apiv1/user/get_refer_reward_records', obj ,function(d){
            if(d.result) {
                _this.setState({data: d.result.records,page: d.result.page,count: d.result.count});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    pageTurn = (current) => {
        this.getTableData(current);
    }
    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
          return <a>&laquo;</a>;
        } if (type === 'next') {
          return <a>&raquo;</a>;
        }
        return originalElement;
    }
    render() {
        const columns = [{
            title: '账号',
            dataIndex: 'RegisterEmail',
            key:'RegisterEmail'
          }, {
            title: '发放时间',
            dataIndex: 'TakeTimeStamp',
            key: 'TakeTimeStamp'
          }, {
            title: '发放数量',
            dataIndex: 'Amount',
            key: 'Amount',
            render: (text, record) => (
                <span>{text} CoCo</span>
              ),
          }];
        return (
            <div className='plate-table'>
                <Table 
                    rowKey={record => record.ID}  
                    columns={columns} 
                    dataSource={this.state.data} 
                    pagination = {{
                        total: this.state.count,
                        current: this.state.page,
                        defaultCurrent: 1,
                        pageSize: this.state.limit,
                        onChange:(current, pageSize) => {
                            this.pageTurn(current)
                        },
                    }}
                    onChange={this.handleChange} 
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}}
                />
            </div>
        )
    }
}
class InviteRecord extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],
        page: 1,
        limit: 10,
        total: 0
    }
    handleChange = (val) => {
        console.log(val);
    }
    getTableData = (page) => {
        let _this = this;
        let obj = {
            page: page,
            limit: this.state.limit
        }
        Cgicallget('/apiv1/user/get_refer_records', obj ,function(d){
            if(d.result) {
                _this.setState({data: d.result.records,page: d.result.page,count: d.result.count});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    pageTurn = (current) => {
        this.getTableData(current);
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.getTableData(this.state.page);
    }
    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
          return <a>&laquo;</a>;
        } if (type === 'next') {
          return <a>&raquo;</a>;
        }
        return originalElement;
      }
    render() {
        const columns = [{
            title: '账号',
            dataIndex: 'RegisterEmail',
            key: 'RegisterEmail'
          }, {
            title: '实名状态',
            dataIndex: 'State',
            ke: 'State',
            render: function(text,record) {
                console.log(record._id);
                return (text=="yes")?(<span>已实名</span>):(<span>未实名</span>)
            }
          }, {
            title: '注册时间',
            dataIndex: 'ReferTimeStamp',
            key: 'ReferTimeStamp'
          }];
        return (
            <div className='plate-table'>
                <Table 
                    rowKey={record => record.ID}  
                    columns={columns}
                    dataSource={this.state.data} 
                    onChange={this.handleChange} 
                    pagination = {{
                        total: this.state.count,
                        current: this.state.page,
                        defaultCurrent: 1,
                        pageSize: this.state.limit,
                        onChange:(current, pageSize) => {
                            this.pageTurn(current)
                        },
                    }}
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}}
                />
            </div>
        )
    }
}
class RecomRule extends Component {
    render() {
        return(
            <div className='plate-wrapper-interval'>
                <div className='plate-wrapper-main'>
                    <div className='plate-rules'>
                        <p className='rule-title'>活动规则：</p>
                        <ul className='rule-msg'>
                            <li>1.参与推荐奖励的用户必须是实名认证用户，非实名认证用户无法获得奖励，成功邀请好友注册成功完成实名认证，即可获得30coco币；</li>
                            <li>2.一旦您推荐的人成功完成实名认证，获得的奖励将会在24小时内返至您的账户，具体入账时间可能存在延迟；</li>
                            <li>3.邀请人与被邀请人实名信息一致，不可享受推荐奖励；</li>
                            <li>4.平台严查恶意注册的账户，一经发现，将不会收到奖励。</li>
                        </ul>
                    </div>
                </div>
                <div className='plate-out-tip'>
                    <ul className='out-tip'>
                        <li>* 注册即获BitCoCo专属邀请链接</li>
                        <li>* 仅承认使用BitCoCo官方邀请链接产生的邀请行为</li>
                        <li>* 官方根据实际运营情况，保留对活动规则做出修改的权利，请关注官方公告。</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default RecomAward
import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import{ Icon, Table, Tooltip, Input, Button, message, Layout, Breadcrumb } from 'antd'
import $ from 'jquery'
import store from '../store'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import WalletMenu from '../menu'
import moment from "moment";
const { Header, Footer, Sider, Content } = Layout;
// import svgpath from 'svgpath';
// import qr from 'qr-image';
var QRCode = require('qrcode.react');

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
        realname: 'no',
        qrcode: '',
        currency: 'BTC'
    }
    getCertification = () => {
        let _this = this;
        const searchParams = new URLSearchParams(this.props.location.search)
        const currency = searchParams.get('code')
        if(!currency) this.props.history.push('/wallet/asset');
        Cgicallget('/apiv1/user/wallet/deposit/address/' + currency, '',function(d){
            if(d.result) {
                _this.setState({qrcode: d.result.address,currency: currency})
                // let realname = d.result.isCertification;
                // _this.setState({realname: (realname == "yes")?realname:(realname == "pending")?realname:'no'});
            }else {
                message.error(GetErrorMsg(d))
                _this.setState({currency: currency})
            }
        })
    }
    copylink = () => {
        message.success("邀请链接复制成功！")
    }
    componentDidMount() {
        this.getCertification();
    }
    render() {
        const { loading, currency,realname, qrcode } = this.state;
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
                                            Bitcoin Cash充值
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-interval plate-wrapper-stick'>
                                        <div className='plate-wrapper-header'>
                                            <h3>Bitcoin Cash充值</h3>
                                            <div className='plate-header-right'>
                                                <a href='javascript:;'>常见充值问题 ></a>
                                            </div>
                                        </div>
                                        <div className='plate-interval'></div>
                                        <div className='plate-wrapper-main'>
                                            <div className='plate-top-tip'>
                                                <label>温馨提示：</label>
                                                <span>此地址仅接受BCH充值，单笔最小充值金额为0.0001，任何低于最小金额或非BCH的充值都无法到账且不可找回。</span>
                                            </div>
                                            <div className='plate-qr-address'>
                                                <label>地址：</label>
                                                <span className='plate-address'>{qrcode || <span className='color-red'>地址获取失败</span>}</span>
                                                <CopyToClipboard 
                                                    text={qrcode}
                                                    onCopy={this.copylink}>
                                                    <a className='copy-code-btn' href="javascript:;">复制链接</a>
                                                </CopyToClipboard>
                                            </div>
                                            <div className='plate-wrapper-QRcode'>
                                                <div className='plate-QRcode'>
                                                    <svg width="138" height="138" ref={(ref)=>this._qrcodeSVG = ref} transform="scale(1)">
                                                        <path d={svgpath(qr.svgObject('qpdzswevc9eat5y5227zcy8ydxjfzql5cgtlann58a').path).scale(1, 1).toString()}/>
                                                    </svg>
                                                    <QRCode size='138'  value={qrcode} />,
                                                </div>
                                                <div className='plate-QRcode-msg'>
                                                    使用USDT钱包扫码支付
                                                </div>
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
                                    </div>
                                    <div className='plate-wrapper-table'>
                                        <div className='plate-wrapper-header'>
                                            <h3>最近充值记录</h3>    
                                        </div>
                                        <RechargeTable currency={currency} />
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
class RechargeTable extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],page: 1,
        limit: 5,
        total: 5,
        asset: ''
    }
    handleChange = (val) => {
        console.log(val);
    }
    getTableData = (page,asset) => {
        let _this = this;
        let obj = {
            page: page,
            limit: this.state.limit,
            asset: asset || ''
        }
        Cgicallget('/apiv1/user/wallet/history/deposit', obj ,function(d){
            if(d.result) {
                _this.setState({data: d.result.records,page: d.result.page,count: d.result.count});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    componentDidMount() {
        // 基于准备好的dom，初始化table实例
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
            title: '汇入时间',
            dataIndex: 'time',
            render: function(text,record) {
                return moment(parseInt(text)*1000).format("YYYY-MM-DD HH:mm:ss")
            }
          }, {
            title: '金额（' + this.props.currency + '）',
            dataIndex: 'change',
          }, {
            title: '汇入地址',
            dataIndex: 'detail',
            width: 180,
            render: function(text,record) {
              return(
                <Tooltip placement="top" title={text.from} overlayClassName='word-spill-tip'>
                    {(text.type == 'outer')?
                        <a className='word-spill' href="javascript:;">{text.from}</a>:
                        <span className='word-spill'>{text.from}</span>
                    }
                </Tooltip>
              )  
            } 
          },
        //   {
        //     title: '状态',
        //     dataIndex: 'state',
        //     render: function(text,record) {
        //         return text?'已入账':'未入账';
        //     }
        //   },
          {
            title: '交易ID',
            dataIndex: 'detail',
            width: 180,
            render: function(text,record) {
                return(
                    <Tooltip placement="top" title={text.tx_id} overlayClassName='word-spill-tip'>
                        {(text.type == 'outer')?
                            <a className='word-spill' href="javascript:;">{text.tx_id}</a>:
                            <span className='word-spill'>{text.tx_id}</span>
                        }
                    </Tooltip>
                )
            }
          },
        ];
        return (
            <div className='plate-table'>
                <Table 
                    rowKey={record => record.id}  
                    columns={columns} 
                    dataSource={this.state.data} 
                    onChange={this.handleChange}
                    pagination = {{
                        hideOnSinglePage: true,
                    }} 
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}}
                />
            </div>
        )
    }
}

export default Recharge
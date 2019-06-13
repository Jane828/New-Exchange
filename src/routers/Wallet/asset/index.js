import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import{ Dropdown, Menu, Icon, Checkbox, Table, Divider, Tooltip, Input, Layout, message } from 'antd'
import store from '../store'
import $ from 'jquery'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import Loadable from 'react-loadable';
import DelayLoading from '@/components/DelayLoading'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import WalletMenu from '../menu'
const { Sider, Content } = Layout;

@withRouter
@inject('Store')
@observer
class WalletAsset extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。  
    }
    state = {
        loading: false,
        currency: 'BTC',
        allData: {},
        balance: [],
        legal_value: {},
        market_value: [],
        assetVal: 0,
        rate: [],
        rateVal: 1
    }
    buildPie = () => {
        console.log("...................................................")
        // console.log(this.state.balance);
        let pieData = [];
        let labelName = [];
        let balance = this.state.balance;
        for(var k in balance) {
            pieData.push({value: balance[k].legal_value.CNY,name: balance[k].asset});
            labelName.push({name: balance[k].asset})
        }
        if(!pieData.length){
            pieData = [{value:0,name:'BTC'}];
            labelName = ['BTC'];
        } 
        var myChart = echarts.init(document.getElementById('assetTtm_pie'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color:['#ec3bf3','#f3d33b','#00a0e9','#f33b9f','#f3a73b','#006ee9','#f33b66','#3bf396','#0031e9','#b43bf3',
                    '#f38d3b','#00dbe9','#803bf3','#f3593b','#e9e600','##9f52e7','#fbab2d','#137ed0','#e62692','#d0ce23',
                    '#03d3d5','#04d698','#f36b3b','#6d15e5','#41dc70','#25cdd8','#6c5dde','#5d94de','#deac5d','#de725d'],
            legend: {
                orient: 'vertical',
                right: '3%',
                bottom: '3%',
                data:labelName
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['40%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            formatter: '{c}CNY\n{b}',
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'normal'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: pieData
                    [
                        {value:335, name:'BTC'},
                        {value:310, name:'USDT'},
                        {value:234, name:'BTH'},
                        {value:244, name:'BTHG'},
                        {value:214, name:'BTHGWE'}
                    ]
                }
            ]
        });
    }
    setNextPage = (key,currency) => {
        if(currency) this.props.history.push('/wallet/'+ key + '?code=' + encodeURIComponent(currency));
        else message.error('页面跳转失败');
    }
    onsearch = (event) => {
        this.childTable.onsearch(event.target.value);
    }
    struCheckSmall = (event) => {
        this.childTable.struCheck(event.target.checked);
    }
    setChild = (childTable) => {
        this.childTable = childTable
    }
    setAmonnt = (event) => {
        let val = event.key;
        let data = this.state.market_value;
        let dataRate = this.state.rate;//rateVal
        let num = 0;
        let numRate = 1;
        for(var k in data) {
            if(data[k].key == val) {
                num = data[k].data;
            }
        }
        for(var k in dataRate) {
            if(dataRate[k].key == val) {
                numRate = dataRate[k].data.CNY;
            }
        }
        this.setState({currency: val,assetVal: num,rateVal: numRate});
    }
    getRate = () => {
        let _this = this;
        Cgicallget('/api/v1/user/wallet/currency/mywallet', '',function(d){
            if(d.result) {
                let arr = [];
                let arrRate = [];
                let market_value = d.result.market_value;
                for(var key in d.result.market_value) {
                    arr.push({key:key,data: market_value[key]})
                }
                for(var key in d.result.rate) {
                    arrRate.push({key:key,data: d.result.rate[key]});
                }
                _this.setState({balance: d.result.balance,legal_value: d.result.legal_value,allData: d.result.market_value,market_value: arr,assetVal:arr[0].data,rate: arrRate,rateVal:arrRate[0].data.CNY});
                _this.buildPie();
                _this.childTable.getRate(d.result.balance);
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        this.getRate();
    }
    render() {
        const { loading, currency, legal_value, market_value, assetVal, rateVal } = this.state;
        return (
            <Provider store={this.store}>
                <div className='wallet_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu" width='260'>
                            <WalletMenu showKey='asset'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-text plate-wrapper-stick'>
                                        <div className='plate-wrapper-header'>
                                            <h3>总资产估值</h3>
                                            <div className='assetTtm_scale'>
                                                <span className='currency_left'>{legal_value.CNY || 0}CNY</span>
                                                ≈
                                                <span className='currency_right'>
                                                    {assetVal}
                                                </span>
                                                <Dropdown 
                                                    overlay={
                                                        <Menu 
                                                            className='Dropdown_menu'
                                                            onSelect={this.setAmonnt}
                                                            onClick={this.setAmonnt}
                                                        >
                                                            {market_value.map((Item,i)=>
                                                                <Menu.Item key={Item.key}>
                                                                    <span className="nav-text">{Item.key}</span>
                                                                </Menu.Item>
                                                            )}
                                                        </Menu>
                                                    } 
                                                    trigger={['hover']}
                                                >
                                                    <a className="ant-dropdown-link" href="javascript:;">
                                                        {currency}
                                                        <Icon type="caret-down" />
                                                    </a>
                                                </Dropdown>
                                            </div>
                                            <div className='assetTtm-rate'>
                                                <span>实时汇率：</span>
                                                <p>
                                                    <span>{currency}</span>
                                                    <span className='assetTtm_sign'>/</span>
                                                    <span>CNY</span>
                                                    <span className='assetTtm_sign'>=</span>
                                                    <span>{rateVal}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='assetTtm_main'>
                                            <div id='assetTtm_pie' style={{ width: 916, height: 360 }}></div>
                                        </div>
                                    </div>
                                    <div className='plate-wrapper-table'>
                                        <div className='plate-wrapper-header'>
                                            <h3>资产结构</h3>
                                            <div className='plate-wrapper-check'>
                                                <Checkbox onChange={this.struCheckSmall}>隐藏小额资产 
                                                    <Tooltip placement="top" title='资产等于0Btc'> <Icon type="info-circle" /></Tooltip>
                                                </Checkbox>
                                            </div>
                                            <div className='plate-wrapper-search'>
                                                <Input prefix={<Icon type="search" />} onChange={this.onsearch} placeholder="搜索币种" />
                                            </div>
                                            
                                        </div>
                                        <StruTable setNextPage={this.setNextPage} setChild={this.setChild} />
                                    </div>
                                    <div className='plate-wrapper-table'>
                                        <div className='plate-wrapper-header'>
                                            <h3>待入账充值资产</h3>
                                        </div>
                                        <EntryTable setNextPage={this.setNextPage}/>
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
class StruTable extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],
        balance: [],
        searchV: '',
        smallH: false
    }
    handleChange = (val) => {
        console.log(val);
    }
    setNextPage = (key,currency,event) => {
        this.props.setNextPage(key,currency);
    }
    struCheck = (val) => {
        let arr = [];
        let balance = this.state.balance;
        if(val) {
            for(var k in balance) {
                if(val && balance[k].amount != "0" ) {
                    arr.push(balance[k]);
                }
            }
        }else {
            arr = balance;
        }  
        this.setState({data: arr});
    }
    onsearch = (val) => {
        let arr = [];
        let balance = this.state.balance;
        if(val) {
            for(var k in balance) {
                if(val && balance[k].asset.indexOf(val.toUpperCase()) >=0 ) {
                    arr.push(balance[k]);
                }
            }
        }else {
            arr = balance;
        }  
        this.setState({data: arr});
    }
    getRate = (balance) => {
        this.setState({data: balance,balance: balance});
    }
    componentDidMount() {
        this.props.setChild(this);
        this.getRate();
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
        const { searchV, smallH } = this.state;
        const columns = [{
            title: '币种',
            dataIndex: 'asset',
          }, {
            title: '可用',
            dataIndex: 'available',
          }, {
            title: '冻结',
            dataIndex: 'freeze',
          },{
            title: '锁仓',
            dataIndex: 'm_freeze',
          },{
            title: '总额',
            dataIndex: 'amount',
          },{
            title: '市值',
            dataIndex: 'legal_value',
            render: text => text.CNY
          },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                {/* <a href="javascript:;" onClick={this.setNextPage.bind(this,'recharge',record.asset)}>充值</a> */}
                <a href="javascript:;" className='table-btn-disabled'>充值</a>
                <Divider type="vertical" />
                {/* <a href="javascript:;" onClick={this.setNextPage.bind(this,'withDrawCash',record.asset)}>提现</a> */}
                <a href="javascript:;" className='table-btn-disabled'>提现</a>
                <Divider type="vertical" />
                <a href="javascript:;" className='table-btn-disabled'>交易</a>
              </span>
            ),
          }];
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
class EntryTable extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: []
    }
    handleChange = (val) => {
        console.log(val);
    }
    setNextPage = () => {
        this.props.setNextPage('recharge');
    }
    componentDidMount() {
        let _this = this;
        $.get('./asset.json',function(d){
            console.log(d);
            _this.setState({data: d.data});
        })
    }
    render() {
        const columns = [{
            title: '时间',
            dataIndex: 'time',
          }, {
            title: '币种',
            dataIndex: 'currency',
          }, {
            title: '数量',
            dataIndex: 'num',
          },{
            title: '状态',
            dataIndex: 'state',
            render: text => text?(<span style={{color:"red"}}>待入账</span>):(<span>已入账</span>)
          },{
            title: '交易ID',
            dataIndex: 'tradeID',
            render: text => <a href="javascript:;">{text}</a>,
          }];
        return (
            <div className='plate-table'>
                <Table
                    rowKey={record => record._id}   
                    columns={columns} 
                    dataSource={this.state.data} 
                    onChange={this.handleChange} 
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}} />
            </div>
        )
    }
}
export default WalletAsset
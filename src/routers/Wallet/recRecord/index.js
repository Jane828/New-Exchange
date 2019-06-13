import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import{ Icon, Table, Tooltip, Input, Button, Layout, message } from 'antd'
import $ from 'jquery'
import store from '../store'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import TableNoData from '../images/table_no_data.png'
import WalletMenu from '../menu'
import moment from "moment";
import ExportJsonExcel from 'js-export-excel'; 

const { Header, Footer, Sider, Content } = Layout;

@withRouter
@inject('Store')
@observer
class RecRecord extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state = {
        loading: false,
        currency: '',
    }
    onsearch = (event) => {
        this.childTable.onsearch(event.target.value);
        this.setState({currency: event.target.value})
    }
    setChild = (childTable) => {
        this.childTable = childTable
    }
    export = () => {
        let _this = this;
        let obj = {
            asset: this.state.currency
        }
        this.setState({exportLoding: true})
        setTimeout(function() {
            _this.setState({exportLoding: false});
        },10000)
        message.loading('正在刷写数据...', 30)
        Cgicallget('/apiv1/user/wallet/export/deposit', obj ,function(d){
            if(d.result) {
                let data = d.result.records;
                if(data && data.length) {
                    _this.goExport(d.result.records);
                }else {
                    message.destroy();
                    message.warning('该条件下的无数据');
                    _this.setState({exportLoding: false})
                }
            }else {
                message.error(GetErrorMsg(d))
                _this.setState({exportLoding: false})
            }
        })
    }
    goExport = (data) => { 
        var option={};
        let dataTable = [];
        if (data) {
            for (let i in data) {
                if(data){
                let obj = {
                    '汇入时间': moment(parseInt(data[i].time)*1000).format("YYYY-MM-DD HH:mm:ss"),
                    '币种': data[i].asset,
                    '金额': data[i].change,
                    '汇入地址': data[i].detail.from,
                    '交易ID': data[i].detail.tx_id,
                }
                dataTable.push(obj);
                }
            }
        }
        option.fileName = '充值记录'+ moment().format('YYYYMMDDHHmmss');
        option.datas=[
        {
            sheetData:dataTable,
            sheetName:'sheet',
            sheetFilter:['汇入时间','币种','金额','汇入地址','交易ID'],
            sheetHeader:['汇入时间','币种','金额','汇入地址','交易ID'],
        }
        ];
        message.destroy();
        message.success('充值记录已导出');
        this.setState({exportLoding: false});
        var toExcel = new ExportJsonExcel(option); //new
        toExcel.saveExcel();    
    }
    componentDidMount() {
    }
    render() {
        const { loading, currency, exportLoding } = this.state;
        return (
            <Provider store={this.store}>
            <div className='wallet_wrap plate-container clearFix'>
                <Layout>
                    <Sider theme='light' className="subpage-menu" width='260'>
                        <WalletMenu showKey='recRecord'/>
                    </Sider>
                    <Layout>
                        <Content>
                            <div className='plate-wrapper'>
                                <div className='plate-wrapper-table plate-wrapper-stick'>
                                    <div className='plate-wrapper-header'>
                                        <h3>充值记录</h3>
                                        
                                    </div>
                                    <div className='plate-wrapper-center'>
                                        <div className='plate-wrapper-center-search'>
                                            <label>币种</label>
                                            <div className='search-area'>
                                                <Input prefix={<Icon type="search" />} onChange={this.onsearch} placeholder="输入搜索币种" />
                                            </div>
                                            
                                        </div>
                                        <div className='plate-wrapper-center-export'>
                                            <Button type="primary" onClick={this.export} loading={exportLoding} ghost>导出</Button>
                                        </div>
                                    </div>
                                    <RecRecordTable setChild={this.setChild}/>
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
class RecRecordTable extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],
        page: 1,
        limit: 10,
        count: 0,
        asset: ''
    }
    handleChange = (val) => {
    }
    setNextPage = () => {
        this.props.setNextPage('withDrawal');
    }
    getTableData = (page,asset) => {
        let _this = this;
        let obj = {
            page: page,
            limit: this.state.limit,
            asset: asset
        }
        Cgicallget('/apiv1/user/wallet/history/deposit', obj ,function(d){
            if(d.result) {
                _this.setState({data: d.result.records,page: d.result.page,count: d.result.count});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    onsearch = (data) => {
        this.state.asset = data;
        this.getTableData(1,data);
    }
    pageTurn = (current) => {
        this.getTableData(current,this.state.asset);
    }
    componentDidMount() {
        // 基于准备好的dom，初始化table实例
        this.props.setChild(this);
        this.getTableData(this.state.page,this.state.asset);
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
        let _this = this;
        const columns = [{
            title: '汇入时间',
            dataIndex: 'time',
            render: function(text,record) {
                return moment(parseInt(text)*1000).format("YYYY-MM-DD HH:mm:ss")
            }
          }, {
            title: '币种',
            dataIndex: 'asset',
          }, {
            title: '金额',
            dataIndex: 'change',
          },{
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
          }];
        return (
            <div className='plate-table table-header-white'>
                <Table 
                    rowKey={record => record.detail.id} 
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
export default RecRecord
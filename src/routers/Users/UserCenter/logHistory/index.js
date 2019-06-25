import React, { Component } from 'react'
import './index.less'
import { Badge, List, Avatar, Icon, Table, Divider, Tag, Breadcrumb, Layout } from 'antd';
import store from '../store'
import UserCenterMenu from '../menu'
import { BeforeSendGet, BeforeSendPost, Cgicallget, CgicallPost, GetErrorMsg } from '@/components/Ajax'
import { Provider, inject, observer } from 'mobx-react'
import { Router, Route, withRouter, Link } from 'react-router-dom'
const { Header, Footer, Sider, Content } = Layout;

@withRouter
@inject('Store')
@observer


class Message extends Component {
    constructor() {
        super()
        this.store = new store()
    }
    
    state = {
        dataHistory: [],
        data: [],
        allcount: 1,
        columns: [{
            title: '登录时间',
            dataIndex: 'createTime',
            key: 'createTime',
            className: 'styleMiddle',
            render: (text) => {
                text = new Date(text).getFullYear() + '-' + ((new Date(text).getMonth() + 1)>9?(new Date(text).getMonth() + 1):'0'+(new Date(text).getMonth() + 1)) + '-' + (new Date(text).getDate()>9?new Date(text).getDate():'0'+new Date(text).getDate()) + ' ' + (new Date(text).getHours()>9?new Date(text).getHours():'0'+new Date(text).getHours()) + ':' + (new Date(text).getMinutes()>9?new Date(text).getMinutes():'0'+new Date(text).getMinutes()) + ':' + (new Date(text).getSeconds()>9?new Date(text).getSeconds():'0'+new Date(text).getSeconds())
                // text = new Date(text * 1000).toLocaleDateString().replace(/\//g, "-") + " " + new Date(text * 1000).toTimeString().substr(0, 8)
                return (<span>{text}</span>)
            }
        }, {
            title: '登录IP',
            dataIndex: 'loginIP',
            key: 'loginIP',
            className: 'styleMiddle'
        }, {
            title: '类型',
            dataIndex: 'device',
            key: 'device',
            className: 'styleMiddle'
        }, {
            title: '登录地址',
            dataIndex: 'loginaddress',
            key: 'loginaddress',
            className: 'styleMiddle'
        }]
    }

    setData = () => {
        var arr = [];
        var totle = 0;
        this.state.dataHistory.forEach((item, index) => {
            var obj = {
                key: index,
                createTime: item.Created,
                loginIP: item.LoginIp,
                device: item.LoginMethod,
                loginaddress: item.LoginAddr
            };
            arr.push(obj);
            totle = index + 1;
        })
        this.setState({
            data: arr,
            allcount: totle
        })
        // console.log('页数------------',totle)
    }
    // handleTime = (text, record, index) => {
    // }
    goSetAccount = () => {
        this.props.setPage('setAccount');
    }
    componentDidMount = () => {
        let _this = this
        BeforeSendGet("/api/v1/user/logs/get-logs", '', function (d) {
            console.log('登录历史信息数组------------', d)
            if (d.result) {
                _this.setState({
                    dataHistory: d.result.logs
                });
            } else {
                message.error(GetErrorMsg(d));
            }
            _this.setData()
        });
    }
    render() {
        const pagination = {
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: this.state.allcount,
            size: 'small'
        }
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu line-menu" width='260'>
                            <UserCenterMenu showKey='setAccount' />
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='logHistory'>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link to="/users/UserCenter/setAccount">
                                                <span>账号设置</span>
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>登录历史</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <div className='logHistory-header'>
                                        <span className='title'>登录历史</span>
                                        <span className='tip'>最近30条登录记录如下</span>
                                    </div>
                                    <div className='logHistory-table'>
                                        <Table columns={this.state.columns} rowKey={this.state.data.key} dataSource={this.state.data} pagination={pagination} />
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

export default Message
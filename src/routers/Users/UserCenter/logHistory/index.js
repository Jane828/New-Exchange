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
        columns: [{
            title: '登录时间',
            dataIndex: 'createTime',
            key: 'createTime',
            className: 'styleMiddle',
            render: (text) => {
                text = new Date(text).getFullYear() + '-' + (new Date(text).getMonth() + 1) + '-' + new Date(text).getDate() + ' ' + new Date(text).getHours() + ':' + new Date(text).getMinutes() + ':' + new Date(text).getSeconds()
                // text = new Date(text * 1000).toLocaleDateString().replace(/\//g, "-") + " " + new Date(text * 1000).toTimeString().substr(0, 8)
                return (<span>{text}</span>)
            }
        }, {
            title: '登录IP',
            dataIndex: 'loginIP',
            key: 'loginIP',
            className: 'styleMiddle'
        }, {
            title: '登录方式',
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
        this.state.dataHistory.map((item, index)=>{
            this.setState({
                data: [{
                    key: index,
                    createTime: item.Created,
                    loginIP: item.LoginIp,
                    device: item.LoginMethod,
                    loginaddress: item.LoginAddr
                }]
            })
        })
    }
    handleTime = (text, record, index) => {
        console.log('222222222222222222222', text)
    }
    goSetAccount = () => {
        this.props.setPage('setAccount');
    }
    componentDidMount = () => {
        let _this = this
        // CgicallPost("/apiv1/user/loginHistory", '', function (d) {
        //     if (d.result) {
        //         _this.setState({
        //             dataHistory: d.result.history
        //         });
        //     } else {
        //         message.error(GetErrorMsg(d));
        //     }
        // });
        BeforeSendGet("/api/v1/user/logs/get-logs", '', function (d) {
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
                                    <div className='logHistory-header'><span>登录历史</span></div>
                                    <div className='logHistory-table'>
                                        <Table columns={this.state.columns} rowKey={this.state.data.key} dataSource={this.state.data} pagination={false} />
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
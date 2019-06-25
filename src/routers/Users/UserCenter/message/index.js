import React, { Component } from 'react'
import './MessageCenter.less'
import { Badge, List, Avatar, Icon, Layout } from 'antd';
import store from '../store'
import UserCenterMenu from '../menu'
import { BeforeSendPut, BeforeSendPost, Cgicallget, CgicallPost, GetErrorMsg } from '@/components/Ajax'
import { Provider, inject, observer } from 'mobx-react'
import { Router, Route, withRouter, Link } from 'react-router-dom'
import messageImg from './img/messageImg.png'
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
        dataMessage: [],
        limit: 5,
        page: 1,
        allcount: 1,
        all: 'all',
        read: 'read',
        noread: 'noread',
        type: 'all',
        unReadCount: 0,
        loading: false,
        handleAll: true,
        handleHadread: false,
        handleNoread: false,
        key: true
    }

    handleList = (item, id, index) => {
        let _this = this;
        if (_this.state.IsRead == 1) {
            return false
        } else {
            let obj = {
                mesid: id,
                status: 'one'
            }
            BeforeSendPut("/api/v1/user/message/mark-read", obj, function (d) {
                if (_this.state.type == "noread") {
                    _this.handleNoreadNum()
                } else {
                    item.IsRead = 1;
                    var unreadcount = _this.state.unReadCount - 1
                    _this.setState({
                        unReadCount: unreadcount
                    })
                }
            })
        }
    }
   
    // 全部
    handleAll = () => {
        let _this = this
        this.setState({
            page: 1
        });
        let obj = {
            currentpage: 1,
            count: this.state.limit,
            status: this.state.all
        }

        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            if (d.result) {
                _this.setState({
                    dataMessage: d.result.messages,
                    allcount: d.result.allcount,
                    unReadCount: d.result.unReadCount,
                    handleAll: true,
                    handleHadread: false,
                    handleNoread: false,
                    type: 'all',
                });
            }
        })
    }

    // 已读
    handleHadread = () => {
        let _this = this
        this.setState({
            page: 1
        });
        let obj = {
            currentpage: 1,
            count: this.state.limit,
            status: this.state.read
        }

        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            if (d.result) {
                _this.setState({
                    dataMessage: d.result.messages,
                    allcount: d.result.allcount,
                    unReadCount: d.result.unReadCount,
                    handleAll: false,
                    handleHadread: true,
                    handleNoread: false,
                    type: 'read',
                });
            }
        })
    }

    // 未读
    handleNoreadNum = () => {
        let _this = this
        this.setState({
            page: 1
        });
        let obj = {
            currentpage: 1,
            count: this.state.limit,
            status: this.state.noread
        }

        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            if (d.result) {
                _this.setState({
                    dataMessage: d.result.messages,
                    allcount: d.result.allcount,
                    unReadCount: d.result.unReadCount,
                    handleAll: false,
                    handleHadread: false,
                    handleNoread: true,
                    type: 'noread',
                });
            }
        });
    }
    // 全部标记为已读
    setAllRead = (e) => {
        let _this = this
        if (_this.state.key) {
            let obj = {
                status: 'all'
            }
            BeforeSendPut("/api/v1/user/message/mark-read", obj, function (d) {
                if (_this.state.type == "noread") {
                    _this.setState({
                        dataMessage: [],
                        unReadCount: 0
                    });
                } else if (_this.state.type == "all") {
                    _this.handleAll()
                } else {
                    _this.handleHadread()
                }
            })
        }
        if (_this.state.unReadCount == 0) {
            _this.setState({
                key: false
            })
        }
    }

    //获取未读的数目
    noReadNumber = () => {
        let _this = this
        let obj1 = {
            currentpage: 1,
            count: this.state.limit,
            status: this.state.noread
        }
        BeforeSendPost("/api/v1/user/message/get-message", obj1, function (d) {
            if (d.result) {
                _this.setState({
                    unReadCount: d.result.unReadCount
                });
            }
        });
    }

    //页码点击事件
    ShowSizeChange = (page, pageSize) => {
        let _this = this
        if (this.state.type === 'noread') {
            let obj = {
                currentpage: page,
                count: this.state.limit,
                status: this.state.type
            }
            BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
                console.log('ShowSizeChange(if)---------------------')
                console.log(d)
                if (d.result) {
                    _this.setState({
                        dataMessage: d.result.messages,
                        allcount: d.result.allcount,
                        unReadCount: d.result.unReadCount,
                        page: page,
                    });
                }
                // _this.handleList()
            });
        } else {
            let obj = {
                currentpage: page,
                count: this.state.limit,
                status: this.state.type
            }
            BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
                console.log('ShowSizeChange(else)---------------------')
                console.log(d)
                if (d.result) {
                    _this.setState({
                        dataMessage: d.result.messages,
                        allcount: d.result.allcount,
                        unReadCount: d.result.unReadCount,
                        page: page,
                    });
                }
            });
        }
        _this.noReadNumber()
    }
    componentDidMount = () => {
        let _this = this
        let obj = {
            currentpage: this.state.page,
            count: this.state.limit,
            status: this.state.all
        }
        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            console.log('componentDidMount---------------------')
            console.log(d)
            if (d.result) {
                _this.setState({
                    dataMessage: d.result.messages,
                    allcount: d.result.allcount,
                    unReadCount: d.result.unReadCount
                });
            }
        });
        _this.noReadNumber()
    }
    render() {
        const pagination = {
            current: this.state.page,
            total: this.state.allcount,
            pageSize: this.state.limit,
            onChange: this.ShowSizeChange,
            // showSizeChanger: true,
            // showQuickJumper: true,
            size: 'small'
        }
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu line-menu" width='260'>
                            <UserCenterMenu showKey='message' />
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='messageList'>
                                    <div className='messageBox-header'><span>消息中心</span></div>
                                    <div className='messageBox-choice'>
                                        <div className='choice-wrapper'>
                                            <div className='choice-left'>
                                                <span>类型&nbsp;:</span>
                                                <span className={this.state.handleAll ? 'choice-left-color' : ''} onClick={this.handleAll}>全部</span>
                                                <span className={this.state.handleHadread ? 'choice-left-color' : ''} onClick={this.handleHadread}>已读</span>
                                                <span className={this.state.handleNoread ? 'choice-left-color' : ''} onClick={this.handleNoreadNum}>未读&nbsp;({this.state.unReadCount})</span>
                                            </div>
                                            <span className='choice-right' onClick={this.setAllRead}>全部标记为已读</span>
                                        </div>
                                    </div>
                                    <div className='messageBox-list'>
                                        {!(this.state.dataMessage === undefined || this.state.dataMessage.length == 0) ?
                                            <List
                                                size="small"
                                                bordered
                                                pagination={pagination}
                                                dataSource={this.state.dataMessage}
                                                renderItem={(item, index) => (
                                                    <List.Item key={item.ID}>
                                                        <List.Item.Meta className={item.IsRead == 0 ? 'listNoRead' : 'listRead'}
                                                            avatar={<Badge status={item.IsRead == 0 ? "error" : "default"} />}
                                                            title={item.Content}
                                                        >
                                                        </List.Item.Meta>
                                                        <div className='messageBox-list-time'>
                                                            {new Date(item.Created).getFullYear() + '-' + ((new Date(item.Created).getMonth() + 1)>9?(new Date(item.Created).getMonth() + 1):'0'+(new Date(item.Created).getMonth() + 1)) + '-' + (new Date(item.Created).getDate()>9?new Date(item.Created).getDate():'0'+new Date(item.Created).getDate()) + ' ' + (new Date(item.Created).getHours()>9?new Date(item.Created).getHours():'0'+new Date(item.Created).getHours()) + ':' + (new Date(item.Created).getMinutes()>9?new Date(item.Created).getMinutes():'0'+new Date(item.Created).getMinutes())}
                                                        </div>
                                                        <div onClick={this.handleList.bind(this, item, item.ID, index)} className={item.IsRead == 0 ? 'MarkRead' : 'isMarkRead'}>标记为已读</div>
                                                    </List.Item>
                                                )}
                                            /> : <div className='noMessageData'><div className='messageImg'><img src={messageImg} /></div></div>
                                        }
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
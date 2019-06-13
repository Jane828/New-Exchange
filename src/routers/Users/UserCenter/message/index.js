import React, { Component } from 'react'
import './MessageCenter.less'
import { Badge, List, Avatar, Icon, Layout } from 'antd';
import store from '../store'
import UserCenterMenu from '../menu'
import { BeforeSendPost, Cgicallget, CgicallPost, GetErrorMsg } from '@/components/Ajax'
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
        limit: 10,
        page: 1,
        total: 13,
        all: 'all',
        read: 'read',
        noread: 'noread',
        type: 'all',
        noReadNum: 0,
        loading: false,
        hasMore: true,
        readNoYes: false,
        handleAll: true,
        handleHadread: false,
        handleNoread: false,
    }

    // 点击每条的信息
    handleList = (index, id) => {
        console.log(id)
        let obj = {
            currentpage: 1,
            count: 10,
            status: 'noread'
        }
        // CgicallPost("/apiv1/user/readMessage", obj, function (d) {
        //     if (d.result) {
        //         console.log('d.resultd.resultd.resultd.result', d.result)
        //     } else {
        //         // message.error(GetErrorMsg(d));
        //     }
        // });
        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            console.log('handleList---------------------')
            console.log(d)
            if (d.result) {
                console.log('d.resultd.resultd.resultd.result', d.result)
            } else {
                // message.error(GetErrorMsg(d));
            }
        });
    }

    // 全部
    handleAll = () => {
        let _this = this
        this.setState({
            page: 1
        });
        let obj = {
            // page:1,
            // limit:this.state.limit,
            // type:this.state.all
            currentpage: 1,
            count: this.state.limit,
            status: this.state.all
        }
        // CgicallPost("/apiv1/user/message",obj,function(d){
            
        //     if(d.result) {
        //         _this.setState({
        //             dataMessage: d.result.messages,
        //             limit:d.result.limit,
        //             total:d.result.total,
        //             handleAll:true,
        //             handleNoread:false,
        //             type:'all',
        //         });
        //     }else {
        //       message.error(GetErrorMsg(d));
        //     } 
        // });
        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            console.log('全部---------------------')
            console.log(d)
            if(d.result){
                _this.setState({
                    dataMessage: d.result.messages,
                    limit: d.result.count,
                    // total: d.result.total,
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
            console.log('已读---------------------')
            console.log(d)
            if(d.result){
                _this.setState({
                    dataMessage: d.result.messages,
                    limit: d.result.count,
                    // total: d.result.total,
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
        _this.setState({
            page: 1
        });
        let obj = {
            // page:1,
            // limit:this.state.limit,
            // type:this.state.noRead
            currentpage: 1,
            count: this.state.limit,
            status: this.state.noread
        }
        // CgicallPost("/apiv1/user/message",obj,function(d){
            
        //     if(d.result) {
        //         _this.setState({
        //             dataMessage: d.result.messages,
        //             limit:d.result.limit,
        //             total:d.result.total,
        //             handleAll:false,
        //             handleNoread:true,
        //             type:'noRead',
        //         });
        //     }else {
        //       message.error(GetErrorMsg(d));
        //     } 
        // });
        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            console.log('未读---------------------')
            console.log(d)
            if(d.result){
                _this.setState({
                    dataMessage: d.result.messages,
                    limit: d.result.count,
                    // total: d.result.total,
                    handleAll: false,
                    handleHadread: false,
                    handleNoread: true,
                    type: 'noread',
                });
            }
        });
    }
    // 全部标记为已读
    // setAllRead = (e) => {
    //     let _this = this
    //     if (this.state.type == 'all') {
    //         let obj = {
    //             page: this.state.page,
    //             limit: this.state.limit,
    //             type: this.state.type
    //         }
    //         CgicallPost("/apiv1/user/readAllMessage", obj, function (d) {
    //             if (d.result) {
    //                 //获取信息
    //                 CgicallPost("/apiv1/user/message", obj, function (e) {

    //                     if (d.result) {
    //                         _this.setState({
    //                             dataMessage: e.result.messages,
    //                             total: e.result.total,
    //                         });
    //                     } else {
    //                         //   message.error(GetErrorMsg(e));
    //                     }
    //                 });
    //                 _this.noReadNumber()
    //             } else {
    //                 //   message.error(GetErrorMsg(d));
    //             }
    //         });

    //     } else {
    //         let obj1 = {
    //             page: this.state.page,
    //             limit: this.state.limit,
    //             type: this.state.type
    //         }
    //         CgicallPost("/apiv1/user/readAllMessage", obj1, function (d) {
    //             let ReadNum = (_this.state.total - (_this.state.total % _this.state.limit))
    //             let pageNum = Math.ceil(ReadNum / _this.state.limit)
    //             if (d.result) {
    //                 if (_this.state.page >= pageNum) {
    //                     let obj2 = {
    //                         page: _this.state.page - 1,
    //                         limit: _this.state.limit,
    //                         type: _this.state.type
    //                     }
    //                     CgicallPost("/apiv1/user/message", obj2, function (e) {
    //                         _this.setState({
    //                             page: _this.state.page - 1,
    //                             total: e.result.total,
    //                             noReadNum: e.result.total,
    //                             dataMessage: e.result.messages,
    //                         });
    //                     });

    //                 } else if (pageNum == 1) {
    //                     let obj3 = {
    //                         page: 1,
    //                         limit: _this.state.limit,
    //                         type: _this.state.type
    //                     }
    //                     CgicallPost("/apiv1/user/message", obj3, function (e) {
    //                         _this.setState({
    //                             page: _this.state.page,
    //                             total: e.result.total,
    //                             noReadNum: e.result.total,
    //                             dataMessage: e.result.messages,
    //                         });
    //                     });
    //                 } else {
    //                     CgicallPost("/apiv1/user/message", obj1, function (e) {
    //                         _this.setState({
    //                             page: _this.state.page,
    //                             total: e.result.total,
    //                             noReadNum: e.result.total,
    //                             dataMessage: e.result.messages,
    //                         });
    //                     });
    //                 }

    //             } else {
    //                 //   message.error(GetErrorMsg(d));
    //             }
    //         });
    //     }
    // }

    //获取未读的数目
    noReadNumber=()=>{
        let _this=this
        let obj1 = {
            // page:1,
            // limit:10,
            // type:'noread'
            currentpage: 1,
            count: 10,
            status: 'noread'
        }
        // CgicallPost("/apiv1/user/message",obj1,function(d){
        //   if(d.result) {
        //     _this.setState({
        //         noReadNum:d.result.total
        //     });
        //   }else {
        //       message.error(GetErrorMsg(d));
        //   } 
        // });
        BeforeSendPost("/api/v1/user/message/get-message",obj1,function(d){
            console.log('noReadNumber---------------------')
            console.log(d)
            if(d.result) {
                _this.setState({
                    // noReadNum:d.result.total
                    noReadNum: d.result.count
                });
              }
          });
    }
    ShowSizeChange = (page, pageSize) => {
        let _this = this
        if (this.state.type === 'noread') {
            let obj = {
                // page:page,
                // limit:this.state.limit,
                // type:this.state.type
                currentpage: page,
                count: this.state.limit,
                status: this.state.type
            }
            // CgicallPost("/apiv1/user/message",obj,function(d){
            //   if(d.result) {
            //     _this.setState({
            //         // noReadNum:d.result.total,
            //         dataMessage: d.result.messages,
            //         limit:d.result.limit,
            //         total:d.result.total,
            //         page:page,
            //     });
            //   }else {
            //       message.error(GetErrorMsg(d));
            //   } 
            // });
            BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
                console.log('ShowSizeChange(if)---------------------')
                console.log(d)
                if(d.result) {
                    _this.setState({
                        // noReadNum:d.result.total,
                        dataMessage: d.result.messages,
                        limit: d.result.count,
                        total: d.result.count,
                        page: page,
                    });
                  }
            });
        } else {
            let obj = {
                // page:page,
                // limit:this.state.limit,
                // type:this.state.type
                currentpage: page,
                count: this.state.limit,
                status: this.state.type
            }
            // CgicallPost("/apiv1/user/message",obj,function(d){
            //   if(d.result) {
            //     _this.setState({
            //         // noReadNum:d.result.total,
            //         dataMessage: d.result.messages,
            //         limit:d.result.limit,
            //         total:d.result.total,
            //         page:page,
            //     });
            //   }else {
            //       message.error(GetErrorMsg(d));
            //   } 
            // });
            BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
                console.log('ShowSizeChange(else)---------------------')
                console.log(d)
                if(d.result) {
                    _this.setState({
                        // noReadNum:d.result.total,
                        dataMessage: d.result.messages,
                        limit: d.result.count,
                        total: d.result.count,
                        page: page,
                    });
                  }
            });
        }

    }
    componentDidMount = () => {
        let _this = this
        let obj = {
            // page:this.state.page,
            // limit:this.state.limit,
            // type:this.state.all
            currentpage: this.state.page,
            count: this.state.limit,
            status: this.state.all
        }
        // CgicallPost("/apiv1/user/message",obj,function(d){
        //     if(d.result) {
        //       _this.setState({
        //           dataMessage: d.result.messages,
        //           limit:d.result.limit,
        //           total:d.result.total
        //       });
        //     }else {
        //         message.error(GetErrorMsg(d));
        //     } 
        //   });
        
        BeforeSendPost("/api/v1/user/message/get-message", obj, function (d) {
            console.log('componentDidMount---------------------')
            console.log(d)
            if(d.result) {
                _this.setState({
                    dataMessage: d.result.messages,
                    limit:d.result.count,
                    total:d.result.count
                });
              }
        });
        this.noReadNumber()
    }
    render() {
        const pagination = {
            current: this.state.page,
            total: this.state.total,
            pageSize: this.state.limit,
            onChange: this.ShowSizeChange
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
                                                <span className={this.state.handleNoread ? 'choice-left-color' : ''} onClick={this.handleNoreadNum}>未读&nbsp;({this.state.noReadNum})</span>
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
                                                    <List.Item key={item.ID} onClick={this.handleList.bind(this, index, item.ID)} className={item.isRead ? 'listRead' : 'listNoRead'}>
                                                        <List.Item.Meta
                                                            avatar={<Badge status={item.isRead ? "default" : "error"} />}
                                                            title={item.Content}
                                                        >
                                                        </List.Item.Meta>
                                                        <div className='messageBox-list-time'>
                                                            {new Date(item.Created).getFullYear() + '-' + (new Date(item.Created).getMonth() + 1) + '-' + new Date(item.Created).getDate() + ' ' + new Date(item.Created).getHours() + ':' + new Date(item.Created).getMinutes()}
                                                        </div>
                                                    </List.Item>
                                                )}
                                            /> : <div className='noMessageData'><div className='messageImg'><img src={messageImg} /></div></div>
                                        }
                                        {/* <Table  columns={this.state.columns} rowKey={ record => record.userID} dataSource={this.state.dataHistory} pagination={false} /> */}
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
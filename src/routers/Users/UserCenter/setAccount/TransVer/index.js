import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { message, Modal, Button, Input, Form, Icon, Tabs } from 'antd'
// import $ from  'jquery'
import CryptoJS from 'crypto-js'
import store from '../../store'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import '@/routers/Login/container/index.less'
// const Search = Input.Search;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
// @inject('Store')
// @observer
class CodeModal extends Component {
    state = {
        loading: false,
        codeHtml:'获取验证码',
        codeDisType:false,
        timeAll: 30,
        type: 'google',
    }
    countDown = () => {
        var num = this.state.timeAll;
        var _this = this;
        setTimeout(function(){
            if(num){
                _this.setState({codeHtml:num + '秒后重新获取',codeDisType:true})
                _this.state.timeAll = num - 1;
                _this.countDown();
            }else {
                _this.setState({codeHtml: '获取验证码',codeDisType:false})
                _this.state.timeAll = 30;
            } 
        },1000)
    }
    getAuthCode = () => {
        var obj = {
            type: this.props.codeType,
            account: this.props.account,
            receiver : 'phone'
        }
        var _this = this;
        CgicallPost("/apiv1/visitor/getValidateCode",obj,function(d){
            if(d.result) {
                message.success('验证码已发送到您的手机上，请注意查收');
                _this.setState({type:'phone'});
                _this.countDown();
            }else {
                message.error(GetErrorMsg(d));
            }
            
        });
    }
    codeChange = (e) => {
        this.props.codeChange(e);
    }
    handleOkPhone = (event) => {
        let _this = this;
        this.setState({loading: true});
        console.log('this.state.type',this.state.type)
        this.props.handleOkPhone(this.state.type);
        setTimeout(function () {
            _this.setState({loading: false});
        },3000)
    }

    handleCancelPhone = () => {
        this.props.cancelPhone();
    }
    TabChang = (key) => {
        this.setState({type: key});
        // this.state.type = key;
    }
    render() {
        const { loading, codeDisType, getAuthCode, codeHtml, isOnly } = this.state;
        
        return (
            <Modal
                visible={this.props.visiblePhone}
                title={this.props.title}
                maskClosable = {false}
                destroyOnClose = {true}
                onOk={this.handleOkPhone}
                onCancel={this.handleCancelPhone}
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOkPhone}>
                    确定
                    </Button>
                ]}
                >
                    <Tabs 
                        onChange={this.TabChang} 
                        type="card" 
                        className={(this.props.verifyArr && this.props.verifyArr.length == 2)?'':'onlyOne'} 
                        defaultActiveKey={(this.props.verifyArr && this.props.verifyArr[0])?this.props.verifyArr[0]:'google'}
                    >
                        <TabPane tab="Google验证" key="google">
                            <GoogleCode codeChange={this.codeChange.bind(this)}/>
                        </TabPane>
                        <TabPane tab="手机验证" key="phone">
                            <PhoneCode codeChange={this.codeChange.bind(this)} codeDisType={codeDisType} getAuthCode={this.getAuthCode} codeHtml={codeHtml}/>
                        </TabPane>
                    </Tabs>
            </Modal>
        )
    }
}
class PhoneCodes extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return(
            <Form>
                <FormItem>
                    <Input className="code_input" prefix={<Icon type="safety" />} onChange={this.props.codeChange}  placeholder="输入6位手机验证码" addonAfter={<Button  disabled={this.props.codeDisType} className="searchInBtn" onClick={this.props.getAuthCode}>{this.props.codeHtml}</Button>} />
                </FormItem>
            </Form>
        )
    }
}
class GoogleCodes extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return(
            <Form>
                <FormItem>
                    <Input className="code_input" prefix={<Icon type="safety" />} onChange={this.props.codeChange}  placeholder="输入6位google验证码" type="text"/>
                </FormItem>
            </Form>
        )
    }
}
const PhoneCode = Form.create()(PhoneCodes)
const GoogleCode = Form.create()(GoogleCodes)
export default CodeModal;

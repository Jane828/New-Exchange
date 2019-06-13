import React, {Component} from 'react'
import { Rate, Modal, Button, Input, Form, Layout, Menu, List, Radio,Breadcrumb,message,Steps,Icon,Select} from 'antd'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import boundSuc from './img/boundSuccess.png'
import GoogleChangeOne from './components/FromGoogleOne'
import './index.less'
import { Router, Route, Link, hashHistory } from 'react-router'
const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;
const Step = Steps.Step;
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;


class GoogleModal extends Component {
    constructor(){
        super()
    }
    state={
        arr:[]
    }
    googleChangeHandleCancel = (e) => {
        this.props.closeGoogleChangeVisible()
    }
    passChangeValueTwo = (e)=> {
        console.log('google绑定器的验证码',e)
        this.props.googleChangeCodeValue(e)
       
    }
    nextGoogleTwo = () => {
        this.props.closeGoogleVisible()
        this.props.setNextGoogleTrans('googleTrans')
    }
    render() {
        return (
            <div>
                <Modal
                wrapClassName='google-model-style'
                title = "更换谷歌验证器"
                centered = 'true'
                visible = {this.props.showChangeGoogle}
                onCancel = {this.props.closeChangeGoogle}
                maskClosable = {false}
                footer={null}
                >
                    <Steps labelPlacement='vertical' current={this.props.changeGooglecurrent}>
                        <Step title="身份验证"/>
                        <Step title="扫描绑定" />
                        <Step title="绑定成功" />
                    </Steps>
                    { this.props.changeGooglecurrent === 0 ? <GoogleChangeOne
                        email={this.props.email}
                        phone={this.props.phone}
                        isAuthentication={this.props.isAuthentication}
                        history={this.props.history}
                        passValueTwo={e=>this.passValueTwo(e)}/>
                        : null 
                    }
                    { this.props.changeGooglecurrent === 2 ? <div className='pho-boundSuc' ><img src={boundSuc}/></div> : null }
                    {/* {(()=>{
                        switch(this.props.GoogleNumSuc){
                            case 2:
                                return (<div className='pho-boundSuc' ><img src={boundSuc}/></div>)
                                break;
                            default:
                                return (
                                    <div className='onePhoBound'>
                                        <FromGoogleOne 
                                        nextGoogleTwo={this.nextGoogleTwo}
                                        passChangeValueTwo={e=>this.passChangeValueTwo(e)}
                                        isAuthentication={this.props.isAuthentication} 
                                        email={this.props.email}
                                        phone={this.props.phone} />
                                    </div>
                                    );
                                break;
                        }
                    }
                )()} */}
                </Modal>
            </div>
        )
    }
}

export default GoogleModal
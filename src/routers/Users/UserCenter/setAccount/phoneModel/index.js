import React, {Component} from 'react'
import { Rate, Modal, Button, Input, Form, Layout, Menu, List, Radio,Breadcrumb,message,Steps,Icon,Select} from 'antd'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import boundSuc from '../img/boundSuccess.png'
 import BoundPhoOne from '../From/FormEmailBox.js'
 import BoundPhoTwo from '../From/FormPhoBox.js'
// import './index.less'
import { Router, Route, Link, hashHistory } from 'react-router'
const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;
const Step = Steps.Step;
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;


class PhoneModal extends Component {
    constructor(){
        super()
    }
    state={
        current:0,
        emailCode:'',
        googleCode:''
    }
    nextThree=()=>{
        this.props.nextThree()
        this.setState({
            current:2
        });
    }
    passValueTwo = (e)=> {
        console.log('google绑定器的验证码',e)
        this.setState({
            emailCode: e.inputEmailCode,
            googleCode: e.googleCode,
            current:1
        });
    }
    closePhoModal=()=>{
        this.props.closePho()
        this.setState({
            current:0
        });
    }
    codeExpires=()=>{
        this.setState({
            current:0
        });
    }
    render() {
        const current = this.state.current
        return (
            <div>
                <Modal
                    wrapClassName='pho-model-style'
                    title = "绑定手机号"
                    centered = 'true'
                    visible = {this.props.showPho}
                    onCancel = {this.closePhoModal}
                    maskClosable = {false}
                    footer={null}
                    >
                        <Steps labelPlacement='vertical' current={current}>
                            <Step title="身份验证"/>
                            <Step title="输入号码" />
                            <Step title="绑定成功" />
                        </Steps>
                        { current === 0 ? <BoundPhoOne
                            email={this.props.email}
                            phone={this.props.phone}
                            isAuthentication={this.props.isAuthentication}
                            passValueTwo={e=>this.passValueTwo(e)}/>
                            : null 
                        }

				        { current === 1 ? <BoundPhoTwo 
                            emailCode={this.state.emailCode}
                            googleCode={this.state.googleCode}
                            nextThree={this.nextThree}
                            codeExpires={this.codeExpires}
                            /> 
                            : null 
                        }
				        { current === 2 ? <div className='pho-boundSuc' ><img src={boundSuc}/></div> : null }
                </Modal>
            </div>
        )
    }
}

export default PhoneModal
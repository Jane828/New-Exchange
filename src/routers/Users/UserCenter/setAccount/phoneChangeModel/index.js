import React, {Component} from 'react'
import { Rate, Modal, Button, Input, Form, Layout, Menu, List, Radio,Breadcrumb,message,Steps,Icon,Select} from 'antd'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import boundSuc from '../img/boundSuccess.png'
//  import BoundPhoOne from '../From/FormEmailBox.js'
//  import BoundPhoTwo from '../From/FormPhoBox.js'
// import './index.less'
import PhoChangeOne from '../From/FromPhoChangeOne.js'
import PhoChangeTwo from '../From/FromPhoChangeTwo.js'
import { Router, Route, Link, hashHistory } from 'react-router'
const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;
const Step = Steps.Step;
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;


class PhoneChangeModel extends Component {
    constructor(){
        super()
    }
    state={
        current:0,
        emailCode:'',
        oldGoogleCode:'',
        oldPhoCode:'',
    }
    changeNextThree=()=>{
        let _this = this 
        this.props.changeNextThree()
        this.setState({
            current:2
        });
        setTimeout(()=>{
            _this.setState({
                current:0
            });
        },6000)
    }
    changePassValueTwo=(e)=>{
        console.log('google绑定器的验证码',e)
        this.setState({
            oldGoogleCode: e.changeGoogleCode,
            oldPhoCode: e.changePhoCode,
            emailCode: e.changeEmailCode,
            current:1
        });
    }
    closeChangePhoModal=()=>{
        this.props.closeChangePho()
        this.setState({
            current:0
        });
    }
    codeExpires=()=>{
        this.setState({
            current:0
        });
    }
    // passValueTwo = (e)=> {
    //     console.log('google绑定器的验证码',e)
    //     this.setState({
    //         emailCode: e.inputEmailCode,
    //         googleCode: e.googleCode,
    //         current:1
    //     });
    // }
    render() {
        const current = this.state.current
        return (
            <div>
                <Modal
                    wrapClassName='pho-model-style'
                    title = "更换手机号"
                    centered = 'true'
                    visible = {this.props.showChangePho}
                    onCancel = {this.closeChangePhoModal}
                    maskClosable = {false}
                    footer={null}
                    >
                        <Steps labelPlacement='vertical' current={current}>
                            <Step title="身份验证"/>
                            <Step title="输入号码" />
                            <Step title="绑定成功" />
                        </Steps>
                        { current === 0 ? <PhoChangeOne 
                            email={this.props.email}
                            phone={this.props.phone}
                            isAuthentication={this.props.isAuthentication}
                            changePassValueTwo={this.changePassValueTwo}
                            />
                            : null 
                        }

				        { current === 1 ? <PhoChangeTwo 
                            emailCode={this.state.emailCode}
                            oldPhoCode={this.state.oldPhoCode}
                            oldGoogleCode={this.state.oldGoogleCode}
                            changeNextThree={this.changeNextThree}
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

export default PhoneChangeModel
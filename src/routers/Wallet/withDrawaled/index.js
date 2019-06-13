import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { withRouter ,Link} from 'react-router-dom'
import{ Table, Input,Button, Layout, Breadcrumb, Checkbox, Modal, Form, message  } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import 'moment/locale/zh-cn';
import store from '../store'
import TableNoData from '../images/table_no_data.png'
import WalletMenu from '../menu'
const { Sider, Content } = Layout;
const FormItem = Form.Item;

@withRouter
@inject('Store')
@observer
class WithDrawaled extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state = {
        loading: false,
        amonnt: 'BTC',
        type:'pending',
        withdraw_type:'common',
        visible: false,
        person: '',
        action: 'add',
        data: [],
        checked: false,
        checkedDis: false,
        step: 'repeal'//待汇出：wait,已汇出：remit,待审核：audit，撤销：repeal
    }
    storeAccount = (event) => {
        this.setState({visible: true,action: event.target.checked?'add':'delete'})
    }
    cancel = () => {
        this.setState({visible: false})
    }
    goBack = () => {
        this.props.history.push('/wallet/withDrawCash');
    }
    getwithdraw = () => {
        const searchParams = new URLSearchParams(this.props.location.search)
        const num = searchParams.get('num')
        let obj = {
            id: num
        }
        let _this = this;
        Cgicallget("/apiv1/user/wallet/withdraw/state",obj,function(d){
            if(d.result) {
                let arr = [];
                arr.push(d.result);
                d.result.withdraw_type = 'inner';
                _this.setState({data: arr,withdraw_type: d.result.withdraw_type,type: d.result.state,person: d.result.address})
                _this.getAddress(d.result.withdraw_type,d.result.address);
            }else {
                message.error(GetErrorMsg(d));
            }
            
        });
    }
    getAddress = (type,address) => {
        const searchParams = new URLSearchParams(this.props.location.search)
        const currency = searchParams.get('code')
        let obj = {
            person_type: type
        }
        let arr = [];
        let _this = this;
        Cgicallget('/apiv1/user/wallet/withdraw/getperson/'+ currency, obj ,function(d){
            if(d.result) {
                let persons = d.result.persons;
                let checked = false;
                let checkedDis = false;
                for(var k in persons) {
                    if(persons[k] == address) {
                        checked = true;
                        checkedDis = true;
                    }
                }
                _this.setState({checked: checked,checkedDis: checkedDis});
            }else {
                message.error(GetErrorMsg(d))
                // _this.setState({currency: currency})
            }
        })
    }
    getWithdrawState = (data) => {
        let msg = '';
        switch(data) {
            case 'canceled': 
                msg = '已取消';
                break;
            case 'canceling': 
                msg = '正在取消';
                break;
            case 'finished': 
                msg = '已完成';
                break;
            case 'failed': 
                msg = '提现失败';
                break;
            case 'pending':
                msg = '正在提现'; 
                break;
            case 'checking':
                msg = '审核中'; 
                break;
            case 'checked':
                msg = '已取消'; 
                break;
            case 'check_failing':
                msg = '审核失败'; 
                break;
            default:
                msg = '审核失败';
                break;
        }
        return msg;
    }
    componentDidMount() {
        this.getwithdraw();
    }
    render() {
        const { loading, amonnt, realname, type, step,withdraw_type, data, visible, person, action, checked, checkedDis } = this.state;
        return (
            <Provider store={this.store}>
                <div className='wallet_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu" width='260'>
                            <WalletMenu showKey='asset'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='plate-crumbs'>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link to='/wallet/asset'>我的资产
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            Bitcoin Cash提现
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-table plate-wrapper-stick'>
                                        <div className='plate-wrapper-main'>
                                            <div className='plate-state-main'>    
                                                <div className='plate-state-msg gold-text' style={{display: ((type == 'checked' || type == 'checking')?'block':'none')}}>您的提现已审核，待系统打包汇出</div>
                                                <div className='plate-state-msg gold-text' style={{display: ((type == 'finished')?'block':'none')}}>您的提现已汇出</div>
                                                <div className='plate-state-msg gold-text' style={{display: ((type == 'pending')?'block':'none')}}>您的提现正在提交系统审核</div>
                                                <div className='plate-state-msg gold-text' style={{display: ((type == 'canceled')?'block':'none')}}>您的提现申请已撤销</div>
                                                <div className='plate-state-msg gold-text' style={{display: ((type == 'failed')?'block':'none')}}>您的提现失败</div>
                                                <div className='plate-state-msg gold-text' style={{display: ((type == 'check_failing' || type == 'check_failed')?'block':'none')}}>您的提现申请审核失败</div>
                                                <div className='plate-state-msg gold-text' style={{display: ((type == 'canceled' || type == 'canceling')?'block':'none')}}>您的提现申请已撤销</div>
                                            </div>
                                        </div>
                                        <div className='plate-wrapper-header plate-header-gray'>
                                            <h3>提币详情</h3>
                                            <div className='plate-header-right'>
                                                <div style={{display:(withdraw_type == 'common')?"none":"inline-block"}}><Checkbox checked={checked} disabled={checkedDis} onChange={this.storeAccount}>收藏该站内账号</Checkbox></div>
                                                <div style={{display:(withdraw_type == 'common')?"inline-block":"none"}}><Checkbox checked={checked} disabled={checkedDis} onChange={this.storeAccount}>收藏提币地址</Checkbox></div>
                                            </div>
                                        </div>
                                        <GeneralDetails 
                                            display={(withdraw_type=='common')?'block':'none'} 
                                            goBack={this.goBack}
                                            data={data}
                                            getWithdrawState={this.getWithdrawState}
                                        />
                                        <InstationDetails 
                                            display={(withdraw_type=='common')?'none':'block'} 
                                            goBack={this.goBack}
                                            data={data} 
                                            getWithdrawState={this.getWithdrawState}
                                        />
                                    </div>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                    <AppAdrss 
                        visible={visible}
                        drawType={withdraw_type}
                        person={person}
                        action={action}
                        cancel={this.cancel}
                        getAddress={this.getAddress}
                    />
                </div>
            </Provider>
        )
    }
}
class GeneralDetails extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: []
    }
    handleChange = (val) => {
    }
    setNextPage = () => {
        this.props.setNextPage('withDrawal');
    }
    componentDidMount() {
        // 基于准备好的dom，初始化table实例
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
        const columns = [{
            title: '提现时间',
            dataIndex: 'timestamp',
          }, {
            title: '实际到账',
            dataIndex: 'change',
          }, {
            title: '网络手续费',
            dataIndex: 'fee',
          },{
            title: '提币地址',
            dataIndex: 'address',
            render: text => <a href="javascript:;">{text}</a>,
          },{
            title: '提币状态',
            dataIndex: 'state',
            render: text => this.props.getWithdrawState(text)
          }];
        return (
            <div className='plate-table table-header-white' style={{display:this.props.display}}>
                <Table 
                    rowKey={record => record.id}   
                    columns={columns} 
                    dataSource={this.props.data} 
                    onChange={this.handleChange} 
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}}
                />
                
                <div className='plate-bottom-btn-back'>
                    <Button onClick={this.props.goBack}>返回</Button>
                </div>
            </div>
        )
    }
}
class InstationDetails extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: []
    }
    handleChange = (val) => {
    }
    setNextPage = () => {
        this.props.setNextPage('withDrawal');
    }
    componentDidMount() {
        // 基于准备好的dom，初始化table实例
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
        const columns = [{
            title: '提现时间',
            dataIndex: 'timestamp',
          }, {
            title: '实际到账',
            dataIndex: 'change',
          }, {
            title: '提现手续费',
            dataIndex: 'fee',
          },{
            title: '转入站内账号',
            dataIndex: 'address',
            render: text => <a href="javascript:;">{text}</a>,
          },{
            title: '提币状态',
            dataIndex: 'state',
            render: text => this.props.getWithdrawState(text)
          }];
        return (
            <div className='plate-table table-header-white' style={{display:this.props.display}}>
                <Table 
                    rowKey={record => record.id}   
                    columns={columns} 
                    dataSource={this.props.data} 
                    onChange={this.handleChange} 
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}}
                />
                <div className='plate-bottom-btn-back'>
                    <Button onClick={this.props.goBack}>返回</Button>
                </div>
            </div>
        )
    }
}
@withRouter
@inject('Store')
@observer
class addNewAddress extends Component {
    state = {
        codeType: 'google',
        codeHtml:'获取短信验证码',
        time: 30,
        codeDis: false,
        onlyOneType: true,
        data: {},
        getUserInfo: {}
    }
    defaultModal = () => {
        if(this.state.onlyOneType) {
            this.getUserInfo(this.state.data);
        }else {
            this.setState({codeType: 'google'});
        }
    }
    countDown = () => {
        var num = this.state.time;
        var _this = this;
        let msg = '获取短信验证码';
        setTimeout(function(){
            if(num){
                _this.setState({codeHtml:num + '秒后重新获取',codeDis:true})
                _this.state.time = num - 1;
                _this.countDown();
            }else {
                _this.setState({codeHtml: msg,codeDis:false})
                _this.state.time = 30;
                
            } 
        },1000)
    }
    googleShow = () => {
        this.setState({codeType:'google'});
    }
    phoneShow = () => {
        this.setState({codeType:'phone'});
    }
    getAuthCode = () => {
        var obj = {
            type: 'withdrawbyphone',
            account: this.state.getUserInfo.phone,
            receiver : 'phone'
        }
        var _this = this;
        CgicallPost("/apiv1/visitor/getValidateCode",obj,function(d){
            if(d.result) {
                message.success('验证码已发送，请注意查收');
                _this.countDown();
            }else {
                message.error(GetErrorMsg(d));
            }
            
        });
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        let { form, drawType, person, action } = this.props;
        const {codeType} = this.state;
        let arr = ['PhoneCode'];
        if(codeType == 'google') arr = ['googleCode'];
        const searchParams = new URLSearchParams(this.props.location.search)
        const amount = searchParams.get('code')
        form.validateFields(arr,{},(err, values) => {
            if (!err) {
                let { PhoneCode, googleCode } = values
                var obj = {
                    person: person,
                    person_type: drawType,
                    action: action,
                    remark: '',
                    validate_type: codeType,
                    validate_code: (codeType == 'google')?googleCode:PhoneCode,
                }
                var _this = this;
                this.setState({ LoginLoading: true });
                setTimeout(function(){
                    _this.setState({ LoginLoading: false });
                },3000)
                CgicallPost("/apiv1/user/wallet/withdraw/setperson/"+ amount ,obj,function(d){
                    if(d.result) {
                        message.success((action == 'add')?((drawType == 'common')?'提币地址添加成功':'联系人添加成功'):(drawType == 'common')?'提币地址移除成功':'联系人移除成功');
                        _this.props.cancel();
                        _this.props.getAddress(drawType,person);
                    }else {
                        message.error(GetErrorMsg(d))
                    }
                });
            }
        });
    }
    getUserInfo = () => {
        let _this = this;
        let onlyOneType = false;
        let codeType = 'google';
        CgicallPost('/apiv1/user/getUserInfo', '',function(d){
            if(d.result) {
                let data = d.result;
                if(data.isAuthentication && data.phone) {
                    onlyOneType = false;
                }else {
                    onlyOneType = true;
                }
                if(!data.isAuthentication) {
                    codeType = 'phone';
                }
                _this.setState({onlyOneType: onlyOneType,codeType: codeType,getUserInfo: d.result})
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    componentDidMount(){
        //必须在这里声明，所以 ref 回调可以引用它
        this.getUserInfo();
    }
    render() {
        const { fetching, onlyOneType, codeType, codeHtml, codeDis } = this.state;
        const { getFieldDecorator } = this.props.form
        return(
            <Modal
                visible={this.props.visible}
                title={(this.props.drawType == 'common')?'新增提币地址':'新增站内联系人'}
                maskClosable = {false}
                destroyOnClose = {true}
                onCancel={this.props.cancel}
                afterClose={this.defaultModal}
                width={630}
                footer={null}
            >
                <div className='plate-form-modal'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'none':'block'}}>
                            <div>
                                <div>
                                    {getFieldDecorator('PhoneCode', {
                                        rules: [
                                            {required: true, message: '请输入手机验证码!'},
                                            {validator: this.codeType },
                                            {len: 6, message: '手机验证码的长度为6!'}
                                        ],
                                    })(
                                        <Input autocomplete="off" className="code_input" 
                                            placeholder="输入6位短信验证码" 
                                            addonAfter={<Button  disabled={codeDis} 
                                            className="searchInBtn" 
                                            onClick={this.getAuthCode}
                                        >
                                            {codeHtml}
                                        </Button>} />
                                    )}
                                </div>
                                <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.googleShow}>Google验证码</a></div>
                            </div>
                        </FormItem>
                        <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'block':'none'}}>
                            <div>
                                <div>
                                    {getFieldDecorator('googleCode', {
                                        initialValue:this.props.phone || '',
                                        validateFirst:true,
                                        rules: [
                                            {required: true, message: '请输入Google验证码!'}, 
                                            {validator: this.codeType },
                                            {len: 6, message: 'Google验证码的长度为6!'}
                                        ],
                                    })(
                                        <Input className="code_input" autocomplete="off" placeholder="输入6位Google验证码" />
                                    )}
                                </div>
                                <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.phoneShow}>手机验证码</a></div>
                            </div>
                        </FormItem>
                        <FormItem className='ellipse-btn plate-form-btn'>
                            <Button type="primary" htmlType="submit" className="l_button" loading={this.props.LoginLoading}>
                                确定
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}
const AppAdrss = Form.create()(addNewAddress)
export default WithDrawaled
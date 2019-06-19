import React, {Component} from 'react'
import { Select,Input,Button,Upload, Icon, message , Checkbox ,Breadcrumb, Layout} from 'antd';
import { BeforeSendPost, Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import IDpositive from './img/IDphoto-positive.png'
import IDback from './img/IDphoto-back.png'
import holdIDshow from './img/hold_ID_show.png'
import holdPassportShow from './img/hold_passport_show.png'
import passportCover from './img/passport_cover.png'
import passportInner from './img/passport_inner.png'
import Tip from './img/tip.png'
import store from '../store'
import UserCenterMenu from '../menu'
import { Provider, inject, observer } from 'mobx-react'
import { Router, Route, withRouter ,Link} from 'react-router-dom'
const { Header, Footer, Sider, Content } = Layout;
import './index.less'
const Option = Select.Option;

@withRouter
@inject('Store')
@observer

class RealName extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state={
        familyName:'',
        givenName:'',
        Country:'china',
        id:'',
        realnameSubSuc:false,
        // IDandPassport:false,
        // IDchina:true,
        // idType:'idcard',
        // agree:false,
        // Frontside:false,
        // Backside:false,
        // Declaration:false,
    }
    goSetAccount=()=>{
        this.props.setPage('setAccount');
    }
    handleChangeCou=(value)=> {
        console.log(`selected ${value}`);
        // if(value!=='china'){
        //     this.setState({
        //         IDchina:false,
        //         IDandPassport:true,
        //         idType:'passport'
        //     }); 
        // }else{
        //     this.setState({
        //         IDchina:true,
        //         IDandPassport:false,
        //         idType:'idcard'
        //     }); 
        // }
        this.setState({
            Country:value
        });
    }

    // hangdleID=()=>{
    //     this.setState({
    //         IDandPassport:false,
    //         idType:'idcard'
    //     });
    // }
    // hangdlePt=()=>{
    //     this.setState({
    //         IDandPassport:true,
    //         idType:'passport'
    //     });
    // }
    getFamilyName=(e)=>{
        this.setState({
            familyName:e.target.value,
        });
    }
    getGivenName=(e)=>{
        this.setState({
            givenName:e.target.value,
        });
    }
    getId=(e)=>{
        this.setState({
            id:e.target.value,
        });
    }
    // userAgree=(e)=>{
    //     this.setState({
    //         agree:e.target.checked
    //     });
    // }
    // uploadFrontside=(e)=>{
    //     this.setState({
    //         Frontside:e
    //     });
    // }
    // uploadBackside=(e)=>{
    //     this.setState({
    //         Backside:e
    //     });
    // }
    // uploadDeclaration=(e)=>{
    //     this.setState({
    //         Declaration:e
    //     });
    // }
    uploadUserInf = () => {
        let _this = this
        let obj = {
            familyname: this.state.familyName,
            givenname: this.state.givenName,
            country: this.state.Country,
            // idcard:this.state.idType,
            id: this.state.id,
        }
        if (true) {// this.state.agree
            if (this.state.familyName && this.state.givenName && this.state.id) {
                if (true) {// this.state.Backside&&this.state.Declaration
                    BeforeSendPost("/api/v1/user/update-identity", obj, function (d) {
                        if (d.result) {
                            message.success('提交成功!');
                            _this.setState({
                                realnameSubSuc: true
                            });
                        } else {
                            message.error(GetErrorMsg(d))
                        }
                    });
                } else {
                    // message.error('请上传图片')
                }
            } else {
                message.error('信息不完整')
            }
        } else {
            // message.error('承诺再提交')
        }
        // let obj = {
        //     email:'394198773@qq.com',
        //     state:'failed',
        // }
        // CgicallPost("/apiv1/user/user_certificate_confirm",obj,function(d){
        //     if(d.result) {
        //         message.success('提交成功!');
        //     }else {
        //     message.error(GetErrorMsg(d))
        //     }  
        // });
    }
    render() {
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu line-menu" width='260'>
                            <UserCenterMenu showKey='setAccount'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='realName'>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link to="/users/UserCenter/setAccount">
                                                <span>账号设置</span>
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>实名认证</Breadcrumb.Item>
                                    </Breadcrumb>
                                    {/* ******* 1*/}
                                    <div className='realName-hearder'>
                                        <span>实名认证</span>
                                        {/* <span className='realName-exp'>*未实名用户当日提现额度10k USDT,通过实名认证可增到100k USDT</span> */}
                                    </div>
                                    {/* ******* 2*/}
                                    <div><img src={Tip} className='img-tips'></img><span className='realName-tips'>您填写的信息必须与证件信息保存一致</span></div>
                                    {/* ******* 3*/}
                                    <div style={{display:this.state.realnameSubSuc?'none':'block'}}>
                                        <div className='realName-Country-Name'>
                                            <div className='Country-select'>
                                                <span className='title'>国籍</span>
                                                <Select placeholder="请选择" style={{ width: 360 }} onChange={this.handleChangeCou}>
                                                    <Option value="china">中国</Option>
                                                    <Option value="america">美国</Option>
                                                    <Option value="france">法国</Option>
                                                    <Option value="britain">英国</Option>
                                                    <Option value="korea">韩国</Option>
                                                    <Option value="Japan">日本</Option>
                                                    <Option value="canada">加拿大</Option>
                                                    <Option value="brazil">巴西</Option>
                                                </Select>
                                            </div>
                                            <div className='name-input clerafix'>
                                                <div className='name-input-lastName'>
                                                    <span className='title'>姓</span><Input size="large" onChange={this.getFamilyName} placeholder="请输入" style={{ width: '360px', height: '32px', background: '#ffffff' }} />
                                                </div>
                                                <div className='name-input-fistName'>
                                                    <span className='title'>名</span><Input size="large" onChange={this.getGivenName} placeholder="请输入" style={{width:'360px',height: '32px',background:'#ffffff'}} />
                                                </div>
                                                <div className='name-input-id'>
                                                    <span className='title'>身份证号</span><Input size="large" onChange={this.getId} placeholder="请输入" style={{ width: '360px', height: '32px', background: '#ffffff' }} />
                                                </div>
                                                <div className='name-input-Button'>
                                                    <Button onClick={this.uploadUserInf} type="primary">认证</Button>
                                                </div>
                                                {/* <div className='realName-Sub'></div> */}
                                            </div>
                                        </div>
                                        {/* ******* 4*/}
                                        {/* <div>
                                            <span className='realName-paper'>证件认证</span>
                                            <span style={{fontSize:'12px',color:'#E95454',marginLeft:'10px'}}>
                                                *请确保证件信息清晰可见，证件需在有效期内，图片大小不超过5M，格式支持 .jpg .png。
                                            </span>
                                        </div> */}
                                        {/* ******* 5*/}
                                        {/* <div className='ID-photo'>
                                            <div className='ID-photo-type'>
                                                <span className='type-title'>证件类型</span>
                                                <Button 
                                                    type={this.state.IDandPassport?'':'primary'}
                                                    disabled={!this.state.IDchina}
                                                    className={this.state.IDchina?'chinaID':'otherID'}
                                                    onClick={this.hangdleID}
                                                >身份证</Button>
                                                <Button type={this.state.IDandPassport?'primary':''} onClick={this.hangdlePt}>护照</Button>
                                            </div>
                                            <div className='ID-photo-number'>
                                                {
                                                    this.state.IDandPassport?
                                                    <p>护照ID号码</p>:
                                                    <p>身份证号码</p>
                                                }
                                                <Input size="large" onChange={this.getId} placeholder="请输入" style={{width:'400px',background:'#ffffff'}} />
                                            </div>
                                            <div className='ID-photo-positive clerafix' style={{clear:'both'}}>
                                                <div className='photo-positive-P'>
                                                    {
                                                        this.state.IDandPassport?
                                                        <p>护照封面照片</p>:
                                                        <p>身份证正面</p>
                                                    }
                                                    <AvatarFrontside uploadFrontside={this.uploadFrontside}/>
                                                </div>
                                                <div className='photo-positive-Exa'>
                                                    <p>示例</p>
                                                    <div>
                                                        {
                                                            this.state.IDandPassport?
                                                            <img src={passportCover}/>:
                                                            <img src={IDpositive}/>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='ID-photo-back clerafix' style={{clear:'both'}}>
                                                <div className='photo-back-P'>
                                                    {
                                                        this.state.IDandPassport?
                                                        <p>护照个人信息页照片</p>:
                                                        <p>身份证背面</p>
                                                    }
                                                    <AvatarBackside uploadBackside={this.uploadBackside} />
                                                </div>
                                                <div className='photo-back-Exa'>
                                                    <p>示例</p>
                                                    <div>
                                                        {
                                                            this.state.IDandPassport?
                                                            <img src={passportInner}/>:
                                                            <img src={IDback}/>
                                                        }
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* ******* 6*/}
                                        {/* <div>
                                            <span className='realName-paper'>声明书认证</span>
                                            <span style={{fontSize:'12px',color:'#E95454',marginLeft:'10px'}}>
                                                *请确保证件和声明书信息清晰可见，注意不要遮挡本人面部，图片大小不超过5M，格式支持 .jpg .png。
                                            </span>
                                        </div> */}
                                        {/* ******* 7*/}
                                        {/* <div className='statement-photo'>
                                            <p className='statement-photo-Exp'>
                                                请您上传一张手持证件正面和声明书的照片,声明书的内容包含“BitCoCo”字样和当前日期
                                            </p>
                                            <div className='statement-photo-show' style={{clear:'both'}}>
                                                <div className='photo-show-P'>
                                                    <p>手持证件和说明书</p>
                                                    <AvatarDeclaration uploadDeclaration={this.uploadDeclaration}/>
                                                </div>
                                                <div className='photo-show-Exa'>
                                                    <p>示例</p>
                                                    <div>
                                                        {
                                                            this.state.IDandPassport?
                                                            <img src={holdPassportShow}/>:
                                                            <img src={holdIDshow}/>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* ******* 7*/}
                                        {/* <div className='realName-Sub'>
                                            <div className='realName-Sub-Exp'>
                                                <Checkbox checked={this.state.agree} onChange={this.userAgree}>我承诺所提供的资料为我本人所有，不存在盗用他人资料的情况。</Checkbox>
                                            </div>
                                            <div className='realName-Sub-Button'>
                                                <Button onClick={this.uploadUserInf} type="primary">提交</Button>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div style={{display:this.state.realnameSubSuc?'block':'none'}}>
                                        <div className='realNameSubSuc'>
                                            <p className='realNameSubSuc-exp'>您的信息已提交，系统会在24小时内审核，请耐心等待！</p>
                                        </div> 
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

// *********上传证件
// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
//   }
  
//   function beforeUpload(file) {
//     const isJPGPNG = file.type === 'image/jpeg'||'image/png';
//     if (!isJPGPNG) {
//       message.error('图片的类型是jpg与png');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 5;
//     if (!isLt2M) {
//       message.error('Image must smaller than 5MB!');
//     }
//     return isJPGPNG && isLt2M;
//   }
  
// class AvatarFrontside extends React.Component {
//     state = {
//       loading: false,
//       uploadFrontside:false
//     };
  
//     handleChange = (info) => {
//       if (info.file.status === 'uploading') {
//         this.setState({ loading: true });
//         return;
//       }
//       if (info.file.status === 'done') {
//         // Get this url from response in real world.
//         getBase64(info.file.originFileObj, imageUrl => this.setState({
//           imageUrl,
//           loading: false,
//         }));
//       }
//     }
//     dataResult=(e)=>{
//         if(e.uid){
//             this.props.uploadFrontside(true)
//         }
        
//     }
//     render() {
//       const uploadButton = (
//         <div>
//           <Icon type={this.state.loading ? 'loading' : 'plus'} />
//           <div className="ant-upload-text">Upload</div>
//         </div>
//       );
//       const imageUrl = this.state.imageUrl;
//       return (
//         <Upload
//             accept='image/*'
//             name="avatar"
//             listType="picture-card"
//             className="avatar-uploader"
//             name="file"
//             data={this.dataResult}
//             showUploadList={false}
//             action="/apiv1/user/user_certification_upload/frontside"
//             beforeUpload={beforeUpload}
//             onChange={this.handleChange}
//         >
//           {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
//         </Upload>
//       );
//     }
// }
// class AvatarBackside extends React.Component {
//     state = {
//       loading: false,
//     };
  
//     handleChange = (info) => {
//       if (info.file.status === 'uploading') {
//         this.setState({ loading: true });
//         return;
//       }
//       if (info.file.status === 'done') {
//         // Get this url from response in real world.
//         getBase64(info.file.originFileObj, imageUrl => this.setState({
//           imageUrl,
//           loading: false,
//         }));
//       }
//     }
//     dataResult=(e)=>{
//         if(e.uid){
//             this.props.uploadBackside(true)
//         }
//     }
//     render() {
//       const uploadButton = (
//         <div>
//           <Icon type={this.state.loading ? 'loading' : 'plus'} />
//           <div className="ant-upload-text">Upload</div>
//         </div>
//       );
//       const imageUrl = this.state.imageUrl;
//       return (
//         <Upload
//             accept='image/*'
//             name="avatar"
//             listType="picture-card"
//             className="avatar-uploader"
//             name="file"
//             data={this.dataResult}
//             showUploadList={false}
//             action="/apiv1/user/user_certification_upload/backside"
//             beforeUpload={beforeUpload}
//             onChange={this.handleChange}
//         >
//           {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
//         </Upload>
//       );
//     }
// }
// class AvatarDeclaration extends React.Component {
//     state = {
//       loading: false,
//     };
  
//     handleChange = (info) => {
//       if (info.file.status === 'uploading') {
//         this.setState({ loading: true });
//         return;
//       }
//       if (info.file.status === 'done') {
//         // Get this url from response in real world.
//         getBase64(info.file.originFileObj, imageUrl => this.setState({
//           imageUrl,
//           loading: false,
//         }));
//       }
//     }
//     dataResult=(e)=>{
//         if(e.uid){
//             this.props.uploadDeclaration(true)
//         }
//     }
//     render() {
//       const uploadButton = (
//         <div>
//           <Icon type={this.state.loading ? 'loading' : 'plus'} />
//           <div className="ant-upload-text">Upload</div>
//         </div>
//       );
//       const imageUrl = this.state.imageUrl;
//       return (
//         <Upload
//             accept='image/*'
//             name="avatar"
//             listType="picture-card"
//             className="avatar-uploader"
//             name="file"
//             data={this.dataResult}
//             showUploadList={false}
//             action="/apiv1/user/user_certification_upload/declaration"
//             beforeUpload={beforeUpload}
//             onChange={this.handleChange}
//         >
//           {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
//         </Upload>
//       );
//     }
// }

export default RealName
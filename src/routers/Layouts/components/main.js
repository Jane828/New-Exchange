import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Tooltip, message } from 'antd'
import routerConfig from '@/config/routes'
import bottomRouter from '@/config/bottomRouter'
import Cookies from 'js-cookie'
import Loading from '@/components/Loading'

@withRouter
@inject('Store')
@observer
class Main extends Component {
    constructor(props){
        super(props)
        message.config({
            maxCount: 1, // 最大消息显示数量
          });
    }
    componentWillMount(){
        let { userInfo,updateName } = this.props.Store
        if (userInfo.name == '') {
            updateName(Cookies.get('userName'))
        }
    }
    logout = () =>{
        this.props.logout()
    }
    render() {
        const { name } = this.props.Store.userInfo
        this.clsArr = this.props.location.pathname.split('/');
        this.cls = this.clsArr[1]?(this.clsArr[1]+'Main'):''
        // console.log(this.cls) ---> homeMain
        return (
            <div className={'main ' + this.cls}>
                <div className='routeWrap'>
                    <Loading>
                        {routerConfig.map((item,i)=>
                            <Route key={i} path={item.path} component={item.component} exact/>
                        )}
                        {bottomRouter.map((item,i)=>
                            <Route key={i} path={item.path} component={item.component} exact/>
                        )}
                    </Loading>
                    
                </div>
            </div>
        )
    }
}

export default Main
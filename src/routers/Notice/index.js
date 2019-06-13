import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import{ Dropdown, Menu, Icon, Checkbox, Table, Divider, Tooltip, Input } from 'antd'
import store from './store'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import './index.less'
import $ from 'jquery'
import NoticeMenu from './NoticeMenu/noticeMenu'
import noticeTop from './images/notice-top.png'
import Loadable from 'react-loadable';
import DelayLoading from '@/components/DelayLoading'
// import NoticeList from './container'

let NoticeMain;

@inject('Store')
@observer
class Notice extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。
    }
    state = {
        loading: false,
        data: NoticeMenu,
        // dtkey: sessionStorage.dtkey?sessionStorage.dtkey: ''
    }
    // getDetails = (data) => {
    //     sessionStorage.dtkey = data.key;
    // }
    getPage = () => {
        let dtkey = sessionStorage.dtkey?sessionStorage.dtkey: '';
        if(dtkey) {
            NoticeMain = Loadable({
                loader: () => import('./Details'),
                loading: DelayLoading,
            })
        }else {
	        NoticeMain = Loadable({
                loader: () => import('./container'),
                loading: DelayLoading,
            })
        }
        this.forceUpdate();
    }
    componentWillMount () {
        this.getPage();
    }
    render() {
        return (
            <Provider store={this.store}>
                <div className='notice_wrap clearFix'>
                    <NoticeMain getDetails={this.getPage} />
                </div>
            </Provider>
        )
    }
}

export default Notice
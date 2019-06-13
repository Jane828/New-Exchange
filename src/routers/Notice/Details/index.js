 import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import{ Dropdown, Menu, Icon, Checkbox, Table, Divider, Tooltip, Input, Pagination } from 'antd'
import store from '../store'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import '../index.less'
import $ from 'jquery'
import NoticeMenu from '../NoticeMenu/noticeMenu'

@inject('Store')
@observer
class NoticeDetails extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。
    }
    state = {
        loading: false,
        data: {},
        len: 0,
        current: 0,
        prvT: '暂无',
        nextT: '暂无',
        dtkey: sessionStorage.dtkey?sessionStorage.dtkey:''
    }
    getNoticeList = () => {
        sessionStorage.dtkey = '';
        this.props.getDetails();
    }
    pageTurn = (key) => {
        sessionStorage.dtkey = NoticeMenu[key-1].key;
        this.state.dtkey = sessionStorage.dtkey;
        // this.setState({dtkey: sessionStorage.dtkey})
        this.setDetail();
    }
    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
          return <a>上一篇：{this.state.prvT}</a>;
        } if (type === 'next') {
          return <a>下一篇：{this.state.nextT}</a>;
        }
        return originalElement;
    }
    setDetail = () => {
        let _this = this;
        this.state.len = NoticeMenu.length;
        for(var i=0;i<NoticeMenu.length;i++) {
            if(NoticeMenu[i].key == _this.state.dtkey) {
                _this.setState({data: NoticeMenu[i],current:(i+1),prvT:(i != 0)?NoticeMenu[i-1].title:'暂无',nextT:(i < (this.state.len - 1))?NoticeMenu[i+1].title:'暂无'});
            }
        }
    }
    componentDidMount() {
	    this.setDetail ();
    }
    render() {
        const { data, current, len} = this.state;
        let dataArr  = data.detail || [];
        return (
            <div className='notice_details'>
                <div className='notice_dt_top'>
                    <a href="javascript:;" onClick={this.getNoticeList}>公告列表</a><span> > 详情</span>
                </div>
                <div className='notice_dt_main'>
                    <div className='notice_dt_header'>
                        <div className='notice_dt_title'>{data.title}</div>
                        <div className='notice_dt_time'>{data.time}</div>
                    </div>
                    <div className='notice_dt_body'>
                        {dataArr.map((item,i)=>
                        // && item.list.length > 0 
                            // (item.title)?(
                            <div>
                                <div className='notice_foxbase_title' style={{'display':((item.title)?"block":"none")}}>{item.title}
                                </div>
                                {item.data.map((listItem,ii)=> 
                                    <div className='notice_dt_text'>{listItem}</div>
                                )}
                                {item.para.map((listItem,ii)=>
                                    <div className='notice_dt_para'>{listItem}</div>
                                )}
	                            <table
                            width="650px"
                            className='notice_tb'
                            border="1px">
		                    { item.tb.map ( ( listItem, ii ) =>
			                    <tr
				                    className = 'notice_dt_para tb1'>
				                    { listItem.split ( ',' ).map ( ( item3, index ) =>
                                        <td>{item3}</td>
					                     ) }
			                    </tr>
		                    ) }
                        </table>
                            </div> 
                        )}
                        {/* <div className='notice_foxbase_title'></div>
                        <div className='notice_dt_text'>{data.detail}</div> */}
                        <div className='notice_publich_name'>{data.publichPeople}</div>
                        <div className='notice_publich_time'>{data.bottomTime}</div>
                    </div>
                    <div className='notice_dt_page'>
                        <Pagination onChange={this.pageTurn} current={current} total={len} pageSize={1} itemRender={this.itemRender} />
                    </div>
                </div>
            </div>
        )
    }
}

export default NoticeDetails
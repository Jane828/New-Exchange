import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import{ Dropdown, Menu, Icon, Checkbox, Table, Divider, Tooltip, Input } from 'antd'
import store from '../store'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import '../index.less'
import $ from 'jquery'
import NoticeMenu from '../NoticeMenu/noticeMenu'
import noticeTop from '../images/notice-top.png'

@inject('Store')
@observer
class NoticeList extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。
    }
    state = {
        loading: false,
        data: NoticeMenu
    }
    componentDidMount() {
        let _this = this;
   /*     $.get('./asset.json',function(d){
            // _this.setState({data: d.data});
        })*/
    }
    getDetails = (data) => {
        sessionStorage.dtkey = data.key;
        this.props.getDetails(data.key);
	    console.log ( data.key,222222222222222 );
    }
    render() {
        const columns = [{
            dataIndex: 'title',
            width: 640,
            key: "key"
            // fixed: 'left'
          },
          {
            dataIndex: 'time',
            className:'table_row_right',
            width: 180
          }
        ];
        return (
            <div>
                <div className='notice_top'>
                    <img src={noticeTop}/>
                    <div className='notice_top_input'>
                        {/* <Input prefix={<label className='notice_top_msg'>公告中心 <i></i></label>} placeholder="Announcement center" />, */}
                        <div><span className='notice_top_msg'>公告中心</span><i></i><span>Announcement center</span></div>
                    </div>
                </div>
                <div className='notice_list'>
                    <Table 
                        columns={columns} 
                        onRow={(record) => {
                            return {
                            onClick: () => {this.getDetails(record)},       // 点击行
                            onMouseEnter: () => {},  // 鼠标移入行
                            };
                        }} 
                        dataSource={this.state.data} 
                        showHeader={false} 
                        onChange={this.handleChange} 
                        locale={{"emptyText": <div className='notice_nodata'><img src={TableNoData} /><p>暂无公告消息</p></div>}}
                        rowKey = 'key' 
                    />
                </div>
            </div>
        )
    }
}

export default NoticeList
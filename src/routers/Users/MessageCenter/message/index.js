import React, {Component} from 'react'
import './MessageCenter.less'
import { List, Avatar, Icon } from 'antd';

class Message extends Component {
    constructor() {
        super()
    }
    state = {
        data: [
            {
                email: 'Ant Design Title 1',
                description: 'Ant Design Title 1',
                time:'20180707'
            },
            {
                email: 'Ant Design Title 2',
                description: 'Ant Design Title 2',
                time:'20180708'
            },
            {
                email: 'Ant Design Title 3',
                description: 'Ant Design Title 3',
                time:'20180709'
            },
            {
                email: 'Ant Design Title 4',
                description: 'Ant Design Title 4',
                time:'20180710'
            },
        ],
        loading: false,
        hasMore: true,
    }
    render() {
        return (
            <div className='Home_'>
               <div className='messageBox'>
                   <div className='messageBoxHeader'><span>信息中心</span></div>
                   <div className='messageBoxContent'>
                       <div className='messageBoxContent-header'>
                           <div className='header-wrapper'>
                               <span>类型:</span>
                               <span>全部</span>
                               <span>已读</span>
                               <span>未读<span>(1)</span></span>
                               <span className='headerTabRead'>全部标记为已读</span>
                           </div>
                       </div>
                       <div className='messageBoxContent-List'>
                           <List
                               size="small"
                               bordered
                               dataSource={this.state.data}
                               renderItem={item => (
                                   <List.Item key={item.id}>
                                       <List.Item.Meta
                                           avatar={<span className='ListRedPoint'></span>}
                                           description={item.description}
                                       >
                                       </List.Item.Meta>
                                       <div>{item.time}</div>
                                   </List.Item>
                                 )}
                           />
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

export default Message
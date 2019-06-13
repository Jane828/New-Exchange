import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import{ Dropdown, Menu, Icon, Checkbox, Table, Divider, Tooltip, Input, Pagination } from 'antd'
import store from './store'
import PDF from 'react-pdf-js'
import './index.less'
import $ from  'jquery'

@inject('Store')
@observer
class WhiteBook extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。
    }
    state = {
        loading: false,
        len: 0,
        page: 1
    }
    onDocumentComplete = (pages) => {
        this.setState({len: pages});
    }
    pageTurn = (key) => {
        this.setState({ page: key});
    }
    componentWillMount() {
    }
    render() {
        return (
            <Provider store={this.store}>
                <div className='whiteBook_wrap clearFix'>
                    <div className='whiteBook_main'>
                        <PDF 
                            file="./whiteBook.pdf"
                            onDocumentComplete={this.onDocumentComplete}
                            page={this.state.page}
                        />
                        <Pagination onChange={this.pageTurn} current={this.state.page} pageSize={1} total={this.state.len} />
                    </div>
                    
                </div>
            </Provider>
        )
    }
}

export default WhiteBook
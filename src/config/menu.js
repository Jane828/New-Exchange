export default
[{
    key   : '/home',
    title : '首页',
    type  : 'menu-item-left',
    state : false

},{
    key   : '/trade',
    title : '币币交易',
    type  : 'menu-item-left',
    state : true
},{
    key   : '/gosub',
    title : '创世认购',
    type  : 'menu-item-left',
    state : true
},{
    key   : '/notice',
    title : '公告中心',
    type  : 'menu-item-left',
    state : false
},{
    key   : '/whiteBook',
    title : '白皮书',
    type  : 'menu-item-left',
    state : false
},
// {
//     key   : '/volunteer',
//     title : '志愿者招募',
//     type  : 'menu-item-left',
//     state : false
// }, 
// {
//     key   : '/help',
//     title : '帮助中心',
//     icon  : 'gongneng',
//     type  : 'menu-item-left',
// },  
// {
//     key   : '',
//     title : '',
//     type  : 'menu-item-right',
//     list  : [{
//         key   : 'zh_CN',
//         title : '简体中文'
//     }, {
//         key   : 'zh_HK',
//         title : '繁体中文'
//     }, {
//         key   : 'en_US',
//         title : 'English'
//     }]
// },
{
    key   : '/users',
    title : 'admin',
    icon  : 'yonghu',
    type  : 'menu-item-right',
    list  : [{
        key   : '/userCenter/setAccount',
        title : '个人中心'
    }, {
        key   : '/ticketSystem',
        title : '工单系统',
        state:true
    }, {
        key   : '/messageCenter',
        title : '信息中心',
        state:true
    }, {
        key   : '/recomRebate',
        title : '推荐返佣',
        state:true
    }, {
        key   : '/login',
        title : '退出登录'
    }]
},{
    key   : '/entrust',
    title : '委托订单',
    type  : 'menu-item-right',
    state : true,
    // list  : [{
    //     key   : '/entrustCurrent',
    //     title : '当前委托'
    // }, {
    //     key   : '/entrustHistory',
    //     title : '历史委托'
    // }, {
    //     key   : '/tradingRecord',
    //     title : '交易记录'
    // }]
}, {
    key   : '/wallet/asset',
    title : '我的钱包',
    type  : 'menu-item-right',
    // state : true
}]

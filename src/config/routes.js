import Loadable from 'react-loadable'
import DelayLoading from '../components/DelayLoading'

const Home         = Loadable({loader: () => import('../routers/Home'), loading : DelayLoading,delay:1000})
const Trade   = Loadable({loader: () => import('../routers/Trade'), loading : DelayLoading,delay:1000})
const Gosub   = Loadable({loader: () => import('../routers/Gosub'), loading : DelayLoading,delay:1000})
const Notice   = Loadable({loader: () => import('../routers/Notice'), loading : DelayLoading,delay:100})
const NoticeDetails = Loadable({loader: () => import('../routers/Notice/Details'), loading : DelayLoading,delay:100})
const WhiteBook   = Loadable({loader: () => import('../routers/WhiteBook'), loading : DelayLoading,delay:1000})
const Volunteer   = Loadable({loader: () => import('../routers/Volunteer'), loading : DelayLoading,delay:1000})
const Help = Loadable({loader: () => import('../routers/Help'), loading : DelayLoading,delay:1000})
// const Wallet     = Loadable({loader: () => import('../routers/Wallet'), loading : DelayLoading,delay:1000})
const WalletAsset     = Loadable({loader: () => import('../routers/Wallet/Asset'), loading : DelayLoading,delay:1000})
const WalletRecRecord     = Loadable({loader: () => import('../routers/Wallet/RecRecord'), loading : DelayLoading,delay:1000})
const WalletWithDrawal     = Loadable({loader: () => import('../routers/Wallet/WithDrawal'), loading : DelayLoading,delay:1000})
const WalletWithDrawCash     = Loadable({loader: () => import('../routers/Wallet/WithDrawCash'), loading : DelayLoading,delay:1000})
const WalletWithDrawaled     = Loadable({loader: () => import('../routers/Wallet/WithDrawaled'), loading : DelayLoading,delay:1000})
const WalletDaybook     = Loadable({loader: () => import('../routers/Wallet/Daybook'), loading : DelayLoading,delay:1000})
const WalletRecharge     = Loadable({loader: () => import('../routers/Wallet/Recharge'), loading : DelayLoading,delay:1000})
const EntrustCurrent     = Loadable({loader: () => import('../routers/Entrust/EntrustCurrent'), loading : DelayLoading,delay:1000})
const EntrustHistory     = Loadable({loader: () => import('../routers/Entrust/EntrustHistory'), loading : DelayLoading,delay:1000})
const TradingRecord     = Loadable({loader: () => import('../routers/Entrust/TradingRecord'), loading : DelayLoading,delay:1000})

const UserCenter= Loadable({loader: () => import('../routers/Users/UserCenter/setAccount'), loading : DelayLoading,delay:1000})
const UserAktionen= Loadable({loader: () => import('../routers/Users/UserCenter/Aktionen'), loading : DelayLoading,delay:1000})
const UserRecomAward= Loadable({loader: () => import('../routers/Users/UserCenter/RecomAward'), loading : DelayLoading,delay:1000})
// const UserSetAccount= Loadable({loader: () => import('../routers/Users/UserCenter/SetAccount'), loading : DelayLoading,delay:1000})
const UserMessage= Loadable({loader: () => import('../routers/Users/UserCenter/Message'), loading : DelayLoading,delay:1000})
const UserGoogleTrans= Loadable({loader: () => import('../routers/Users/UserCenter/GoogleTrans'), loading : DelayLoading,delay:1000})
const UserLogHistory= Loadable({loader: () => import('../routers/Users/UserCenter/LogHistory'), loading : DelayLoading,delay:1000})
const UserRealName= Loadable({loader: () => import('../routers/Users/UserCenter/RealName'), loading : DelayLoading,delay:1000})

const RecomRebate     = Loadable({loader: () => import('../routers/Users/RecomRebate'), loading : DelayLoading,delay:1000})
const MessageCenter    = Loadable({loader: () => import('../routers/Users/MessageCenter'), loading : DelayLoading,delay:1000})
const TicketSystem  = Loadable({loader: () => import('../routers/Users/TicketSystem'), loading : DelayLoading,delay:1000})
const Login    = Loadable({loader: () => import('../routers/Login'), loading : DelayLoading,delay:1000})
const Regist  = Loadable({loader: () => import('../routers/Regist'), loading : DelayLoading,delay:1000})
const Loading  = Loadable({loader: () => import('../routers/Loading'), loading : DelayLoading,delay:100})

export default
[{
    'path': '/home',
    'component': Home
}, {
    'path': '/trade',
    'component': Trade
},{
    'path': '/gosub',
    'component': Gosub
},{
    'path': '/notice',
    'component': Notice
},{
    'path': '/notice/details',
    'component': NoticeDetails
},{
    'path': '/whiteBook',
    'component': WhiteBook
},{
    'path': '/volunteer',
    'component': Volunteer
}
// , {
//     'path': '/help',
//     'component': Help
// }
// , {
//     'path': '/wallet',
//     'component': Wallet 
// }
,{
    'path': '/wallet/asset',
    'component': WalletAsset
},{
    'path': '/wallet/recRecord',
    'component': WalletRecRecord
},{
    'path': '/wallet/daybook',
    'component': WalletDaybook
},{
    'path': '/wallet/withDrawal',
    'component': WalletWithDrawal
},{
    'path': '/wallet/withDrawaled',
    'component': WalletWithDrawaled
},{
    'path': '/wallet/withDrawCash',
    'component': WalletWithDrawCash
},{
    'path': '/wallet/recharge',
    'component': WalletRecharge
}, {
    'path': '/entrust/entrustCurrent',
    'component': EntrustCurrent
}, {
    'path': '/entrust/entrustHistory',
    'component': EntrustHistory
}, {
    'path': '/entrust/tradingRecord',
    'component': TradingRecord
}, 
// {
//     'path': '/users/userCenter/setAccount',
//     'component': UserCenter
// }, 
{
    'path': '/users/userCenter/aktionen',
    'component': UserAktionen
}, {
    'path': '/users/userCenter/recomAward',
    'component': UserRecomAward
}, {
    'path': '/users/userCenter/setAccount',
    'component': UserCenter
}, {
    'path': '/users/userCenter/message',
    'component': UserMessage
}, {
    'path': '/users/userCenter/googleTrans',
    'component': UserGoogleTrans
}, {
    'path': '/users/userCenter/logHistory',
    'component': UserLogHistory
}, {
    'path': '/users/userCenter/realName',
    'component': UserRealName
}, {
    'path': '/users/recomRebate',
    'component': RecomRebate
}, {
    'path': '/users/messageCenter',
    'component': MessageCenter
}, {
    'path': '/users/ticketSystem',
    'component': TicketSystem
}, {
    'path': '/login',
    'component': Login
}, {
    'path': '/regist',
    'component': Regist
}
, {
    'path': '/loading',
    'component': Loading
}]


// const Home         = Loadable({loader: () => import('../routers/Home'), loading : DelayLoading,delay:1000})
// const ModuleList   = Loadable({loader: () => import('../routers/ModuleManage/ModuleList'), loading : DelayLoading,delay:1000})
// const FunctionList = Loadable({loader: () => import('../routers/FunctionManage/FunctionList'), loading : DelayLoading,delay:1000})
// const RoleList     = Loadable({loader: () => import('../routers/RoleManage/RoleList'), loading : DelayLoading,delay:1000})
// const EmployeesList= Loadable({loader: () => import('../routers/EmployeesManage/EmployeesList'), loading : DelayLoading,delay:1000})
// const UserList     = Loadable({loader: () => import('../routers/UserManage/UserList'), loading : DelayLoading,delay:1000})
// const UserOrder    = Loadable({loader: () => import('../routers/UserManage/UserOrder'), loading : DelayLoading,delay:1000})
// const UserManager  = Loadable({loader: () => import('../routers/UserManage/UserManager'), loading : DelayLoading,delay:1000})
// const EndOrder     = Loadable({loader: () => import('../routers/UserManage/EndOrder'), loading : DelayLoading,delay:1000})
// const VisualList   = Loadable({loader: () => import('../routers/VisualManage/VisualList'), loading : DelayLoading,delay:1000})
// const PriceConfig  = Loadable({loader: () => import('../routers/PriceManage/PriceConfig'), loading : DelayLoading,delay:1000})

// [{
//     'path': '/home',
//     'component': Home
// }, {
//     'path': '/moduleManage/moduleList',
//     'component': ModuleList
// }, {
//     'path': '/functionManage/functionList',
//     'component': FunctionList
// }, {
//     'path': '/roleManage/roleList',
//     'component': RoleList
// }, {
//     'path': '/employeesManage/employeesList',
//     'component': EmployeesList
// }, {
//     'path': '/userManage/userList',
//     'component': UserList
// }, {
//     'path': '/userManage/userOrder',
//     'component': UserOrder
// }, {
//     'path': '/userManage/userManager',
//     'component': UserManager
// }, {
//     'path': '/userManage/endOrder',
//     'component': EndOrder
// }, {
//     'path': '/visualManage/visualList',
//     'component': VisualList
// }, {
//     'path': '/priceManage/priceConfig',
//     'component': PriceConfig
// }]
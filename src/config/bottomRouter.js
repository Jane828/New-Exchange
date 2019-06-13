import Loadable from 'react-loadable'
import DelayLoading from '../components/DelayLoading'

const Blogroll1         = Loadable({loader: () => import('../routers/Blogrolls/Blogroll1'), loading : DelayLoading,delay:1000})
const Blogroll2         = Loadable({loader: () => import('../routers/Blogrolls/Blogroll2'), loading : DelayLoading,delay:1000})
const Blogroll3         = Loadable({loader: () => import('../routers/Blogrolls/Blogroll3'), loading : DelayLoading,delay:1000})
const AddUs         = Loadable({loader: () => import('../routers/About/AddUs'), loading : DelayLoading,delay:1000})
const Contact   = Loadable({loader: () => import('../routers/About/Contact'), loading : DelayLoading,delay:1000})
const WanChain = Loadable({loader: () => import('../routers/About/WanChain'), loading : DelayLoading,delay:1000})
const Legal     = Loadable({loader: () => import('../routers/Clause/Legal'), loading : DelayLoading,delay:1000})
const ServeClause     = Loadable({loader: () => import('../routers/Clause/ServeClause'), loading : DelayLoading,delay:1000})
const Tariff= Loadable({loader: () => import('../routers/Clause/Tariff'), loading : DelayLoading,delay:1000})
const UserClause     = Loadable({loader: () => import('../routers/Clause/UserClause'), loading : DelayLoading,delay:1000})
const Application    = Loadable({loader: () => import('../routers/Support/Application'), loading : DelayLoading,delay:1000})
const Notice  = Loadable({loader: () => import('../routers/Support/Notice'), loading : DelayLoading,delay:1000})
const WorkOrder    = Loadable({loader: () => import('../routers/Support/WorkOrder'), loading : DelayLoading,delay:1000})
const API  = Loadable({loader: () => import('../routers/Toolbar/API'), loading : DelayLoading,delay:1000})
const Asset  = Loadable({loader: () => import('../routers/Toolbar/Asset'), loading : DelayLoading,delay:1000})
const HelpCenter  = Loadable({loader: () => import('../routers/Toolbar/HelpCenter'), loading : DelayLoading,delay:1000})

const MicroBlog    = Loadable({loader: () => import('../routers/Support/WorkOrder'), loading : DelayLoading,delay:1000})
const WeChat  = Loadable({loader: () => import('../routers/Toolbar/API'), loading : DelayLoading,delay:1000})
const Twitter  = Loadable({loader: () => import('../routers/Toolbar/Asset'), loading : DelayLoading,delay:1000})
const FaceBook  = Loadable({loader: () => import('../routers/Toolbar/HelpCenter'), loading : DelayLoading,delay:1000})

export default
[{
    'path': '/Blogrolls/Blogroll1',
    'component': Blogroll1
},{
    'path': '/Blogrolls/Blogroll2',
    'component': Blogroll2
},{
    'path': '/Blogrolls/Blogroll3',
    'component': Blogroll3
},{
    'path': '/About/AddUs',
    'component': AddUs
}, {
    'path': '/About/Contact',
    'component': Contact
}, {
    'path': '/About/WanChain',
    'component': WanChain
}, {
    'path': '/Clause/Legal',
    'component': Legal
}, {
    'path': '/Clause/ServeClause',
    'component': ServeClause
}, {
    'path': '/Clause/Tariff',
    'component': Tariff
},{
    'path': '/Clause/UserClause',
    'component': UserClause
},{
    'path': '/Support/Application',
    'component': Application
},{
    'path': '/Support/Notice',
    'component': Notice
},{
    'path': '/Support/WorkOrder',
    'component': WorkOrder
},{
    'path': '/Toolbar/API',
    'component': API
},{
    'path': '/Toolbar/Asset',
    'component': Asset
},{
    'path': '/Toolbar/HelpCenter',
    'component': HelpCenter
},{
    'path': '/Support/WorkOrder',
    'component': MicroBlog
},{
    'path': '/Toolbar/API',
    'component': WeChat
},{
    'path': '/Toolbar/Asset',
    'component': Twitter
},{
    'path': '/Toolbar/HelpCenter',
    'component': FaceBook
}]
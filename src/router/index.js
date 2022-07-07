import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const workerInfo = r => require.ensure([], () => r(require('@/page/workerInfo')), 'workerInfo');
const olderInfo = r => require.ensure([], () => r(require('@/page/olderInfo')), 'olderInfo');
const volunteerInfo = r => require.ensure([], () => r(require('@/page/volunteerInfo')), 'volunteerInfo');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const charts = r => require.ensure([], () => r(require('@/page/charts')), 'charts');
const addCamera = r => require.ensure([], () => r(require('@/page/addCamera')), 'addCamera');


const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        },{
            path: '/addShop',
            component: addShop,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/addGoods',
            component: addGoods,
            meta: ['添加数据', '添加商品'],
        },{
            path: '/workerInfo',
            component: workerInfo,
            meta: ['数据管理', '工人信息'],
        },{
            path: '/olderInfo',
            component: olderInfo,
            meta: ['数据管理', '老人信息管理'],
        },{
            path: '/volunteerInfo',
            component: volunteerInfo,
            meta: ['数据管理', '义工信息'],
        },{
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单列表'],
        },{
            path: '/adminList',
            component: adminList,
            meta: ['数据管理', '管理员列表'],
        },{
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        },{
            path: '/newMember',
            component: newMember,
            meta: ['图表', '用户数据'],
        },{
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        },{
            path: '/vueEdit',
            component: vueEdit,
            meta: ['编辑', '文本编辑'],
        },{
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        },{
            path: '/sendMessage',
            component: sendMessage,
            meta: ['设置', '发送通知'],
        },{
            path: '/explain',
            component: explain,
            meta: ['说明', '说明'],
        },
            {
                path: '/charts',
                component: charts,
                meta: ['图表', '图表'],
            },
            {
                path: '/addCamera',
                component: addCamera,
                meta: ['摄像头管理', '查看摄像头'],
            }
        ]
    }
]





export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',

})






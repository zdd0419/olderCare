import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const workerInfo = r => require.ensure([], () => r(require('@/page/workerInfo')), 'workerInfo');
const olderInfo = r => require.ensure([], () => r(require('@/page/olderInfo')), 'olderInfo');
const volunteerInfo = r => require.ensure([], () => r(require('@/page/volunteerInfo')), 'volunteerInfo');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const charts = r => require.ensure([], () => r(require('@/page/charts')), 'charts');
const addCamera = r => require.ensure([], () => r(require('@/page/addCamera')), 'addCamera');
const workerEcharts = r => require.ensure([], () => r(require('@/page/workerEcharts')), 'workerEcharts');
const volunteerEcharts = r => require.ensure([], () => r(require('@/page/volunteerEcharts')), 'volunteerEcharts');
const shuaidaoDetect = r => require.ensure([], () => r(require('@/page/shuaidaoDetect')), 'shuaidaoDetect');
const invade = r => require.ensure([], () => r(require('@/page/invade')), 'invade');
const interectDetect = r => require.ensure([], () => r(require('@/page/interectDetect')), 'interectDetect');
const history = r => require.ensure([], () => r(require('@/page/history')), 'history');
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
            path: '/workerInfo',
            component: workerInfo,
            meta: ['数据管理', '工人信息'],
        },
            {
                path: '/shuaidaoDetect',
                component: shuaidaoDetect,
                meta: ['摄像头管理', '摔倒检测摄像头'],
            },
            {
                path: '/invade',
                component: invade,
                meta: ['摄像头管理', '入侵检测摄像头'],
            },
            {
                path: '/interectDetect',
                component: interectDetect,
                meta: ['摄像头管理', '交互检测'],
            },
            {
            path: '/olderInfo',
            component: olderInfo,
            meta: ['数据管理', '老人信息管理'],
        },{
            path: '/volunteerInfo',
            component: volunteerInfo,
            meta: ['数据管理', '义工信息'],
        },{
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        },{
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        },{
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        },
            {
                path: '/charts',
                component: charts,
                meta: ['图表', '老人年龄分布'],
            },
            {
                path: '/addCamera',
                component: addCamera,
                meta: ['摄像头管理', '陌生人追踪和情绪识别'],
            },
            {
                path: '/volunteerEcharts',
                component: volunteerEcharts,
                meta: ['图表数据', '义工年龄分布'],
            },
            {
                path: '/workerEcharts',
                component: workerEcharts,
                meta: ['图表数据', '工作人员年龄分布'],
            },
            {
                path: '/history',
                component: history,
                meta: ['摄像头管理', '检测历史'],
            }
        ]
    }
]





export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',

})






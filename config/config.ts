// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
    sass: {
        implementation: require('node-sass'),
    },
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        antd: true,
        baseNavigator: true,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {
                    name: 'login',
                    path: '/user/login',
                    component: './user/login',
                },
            ],
        },
        {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: [
                        {
                            path: '/',
                            redirect: '/welcome',
                        },
                        {
                            path: '/welcome',
                            name: 'welcome',
                            icon: 'smile',
                            component: './Welcome',
                        },
                        //     <net-submenu>
                        //     <template slot="title"><i class="icon icon-life-buoy"></i>问答管理</template>
                        //     <net-menu-item name="1"><i class="icon icon-home"></i>话题列表</net-menu-item>
                        //     <net-menu-item name="2"><i class="icon icon-home"></i>分类列表</net-menu-item>
                        //     <net-menu-item name="3"><i class="icon icon-home"></i>回答列表</net-menu-item>
                        // </net-submenu>
                        // <net-submenu>
                        //     <template slot="title"><i class="icon icon-life-buoy"></i>内容管理</template>
                        //     <net-menu-item name="4"><i class="icon icon-home"></i>文章列表</net-menu-item>
                        //     <net-menu-item name="5"><i class="icon icon-home"></i>分类列表</net-menu-item>
                        //     <net-menu-item name="6"><i class="icon icon-settings"></i>评论列表</net-menu-item>
                        // </net-submenu>
                        {
                            path: '/issues',
                            name: '问答管理',
                            icon: 'smile',
                            routes: [
                                {
                                    path: '/issues/topics',
                                    name: '话题列表',
                                    icon: 'smile',
                                    component: './issues/topics',
                                },
                                {
                                    path: '/issues/categories',
                                    name: '分类列表',
                                    icon: 'smile',
                                    component: './issues/categories',
                                },
                                {
                                    path: '/issues/topics',
                                    name: '回答列表',
                                    icon: 'smile',
                                    component: './issues/categories',
                                },
                            ],
                        },
                        {
                            path: '/admin',
                            name: 'admin',
                            icon: 'crown',
                            component: './Admin',
                            authority: ['admin'],
                            routes: [
                                {
                                    path: '/admin/sub-page',
                                    name: 'sub-page',
                                    icon: 'smile',
                                    component: './Welcome',
                                    authority: ['admin'],
                                },
                            ],
                        },
                        {
                            name: 'list.table-list',
                            icon: 'table',
                            path: '/list',
                            component: './ListTableList',
                        },
                        {
                            component: './404',
                        },
                    ],
                },
                {
                    component: './404',
                },
            ],
        },
        {
            component: './404',
        },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor,
    },
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
});

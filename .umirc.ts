import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Lance-music',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '发现音乐',
      path: '/home',
      component: '@/pages/Home/index',
      icon: 'home',
      // 隐藏子菜单
      hideChildrenInMenu: true,
      // 在面包屑中隐藏
      hideInBreadcrumb: true,
      routes: [
        {
          path: '/home/recommend',
          component: '@/pages/Home/Recommend/index',
          name: '发现音乐'
        },
        {
          path: '/home/mvPlay',
          component: '@/pages/Home/mvPlay/index',
          name: '发现音乐'
        }
      ]
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      'target': 'https://cloud-music-smoky-nu.vercel.app',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
});

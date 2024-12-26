//@ts-nocheck
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
function autoGenerateRoutes() {
  const modules = import.meta.glob('../components/**/*.vue') // 扫描 components 目录下的所有 .vue 文件
  const routes = []

  for (const [path, component] of Object.entries(modules)) { 
    // 提取文件路径并生成路由路径
    const routePath = path
      .replace('../components', '') // 去掉前缀
      .replace(/\.vue$/, '') // 去掉后缀
      .replace(/\/index$/, '/') // 如果是 index 文件，设置为父路径
    routes.push({
      path: routePath.toLowerCase(), // 将路径转换为小写
      component,
      name: routePath.replace(/\//g, '-').toLowerCase(), // 生成唯一的路由名称
    })
  }
  return routes
}
const _routes = autoGenerateRoutes()
// console.log(_routes,'testRoutes')//
// 配置路由信息//
const routes: RouteRecordRaw[] = [
  ..._routes, 
  // {
  //   path: '/',
  //   redirect: '/main',
  // },
  // {
  //   name: 'login',
  //   path: '/login',
  //   component: () => import('/@/views/login/index.vue'),
  // },
  // {
  //   name: 'store',
  //   path: '/store',
  //   component: () => import('/@/views/store/index.vue'),
  // },
  // {
  //   name: 'main',
  //   path: '/main',
  //   component: () => import('/@/views/main/MainPage.vue'),
  //   redirect: '/main/dashboard/workplace',
  //   children: [],
  // },
  // {
  //   name: 'request',
  //   path: '/request',
  //   component: () => import('/@/views/request/index.vue'),
  // },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router

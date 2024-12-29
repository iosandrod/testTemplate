import { createApp } from 'vue'
import App from './App.vue'
// 引入 vue-router
import router from './router'
// 引入 pinia
// import { useUserStore } from './store'
// import store from './store'
// import './assets/css/index'
import 'animate.css'
// 单独引入 ElMessage 和 ElMessageBox 的样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import VueKonva from 'vue-konva'
const app = createApp(App)
// .use(store)
////
// 获取基础数据//
// await useUserStore().getData()// 
////// 
app.use(router).use(VueKonva).mount('#app')
 //
import { createApp } from 'vue'
import store from '@/store/index'
import ArcoVue from '@arco-design/web-vue';
import router from './router/index';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import 'normalize.css/normalize.css'

const app = createApp(App);
app.use(store)
app.use(router);
app.use(ArcoVue);
app.mount('#app');
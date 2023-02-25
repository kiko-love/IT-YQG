import axios from 'axios'
import { Message } from '@arco-design/web-vue';
import router from '@/router'
/**
 * 这是封装的axios请求工具类
 */
//创建axios的一个实例 
let instance = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})

//创建axios对象
const http = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

})


// 请求拦截器  1，可以在这里添加token

http.interceptors.request.use(function (config) {

    // 在发送请求之前做些什么
    return config;

}, function (error) {

    // 对请求错误做些什么
    return Promise.reject(error);

});

// 添加响应拦截器

http.interceptors.response.use(function (response) {

    //   // 2xx 范围内的状态码都会触发该函数。

    //   // 对响应数据做点什么

    return response;

}, function (error) {

    //   // 超出 2xx 范围的状态码都会触发该函数。

    //   // 对响应错误做点什么
    Message.error(error)
    return Promise.reject(error);

});

//最后导出request
export default http
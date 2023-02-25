import http from './http'
import qs from 'qs'

export const loginAccount = (v) => {     //data是参数，里面传入登录信息
    return http({
        method: 'post', //请求方法
        url: '/api/login/account',
        transformRequest: [function () {
            // 对发送的 data 进行任意转换处理
            return qs.stringify(v);

        }],
        data: {
            account: v.account,
            password:v.password

        },
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

    })
}

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/
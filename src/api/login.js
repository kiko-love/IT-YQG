import http from './http'
import qs from 'qs'

export const login = (data) => {     //data是参数，里面传入登录信息
    return http({
        method: 'get', //请求方法
        url: '/api/login/getLoginQr',
        transformRequest: [function () {
            // 对发送的 data 进行任意转换处理
            return qs.stringify(data);

        }],
        params: {
            userId: data.userId
        },
        responseType: "blob",
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
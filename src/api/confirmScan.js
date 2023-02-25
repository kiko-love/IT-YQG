import http from './http'
import qs from 'qs'

export const confirmScan = (data) => {     //data是参数，里面传入登录信息
    return http({
        method: 'get', //请求方法
        url: '/api/login/scan/'+data.uid+'/userId/'+data.userId,
        transformRequest: [function (data, headers) {
            // 对发送的 data 进行任意转换处理
            return qs.stringify(data);

        }],
        headers: {
            'Content-Type': 'application/json',
        },

    })
}

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/
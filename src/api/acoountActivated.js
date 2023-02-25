import http from './http'
import qs from 'qs'

export const acoountActivated = (v) => {     //data是参数，里面传入登录信息
    return http({
        method: 'post', //请求方法
        url: '/api/register/activated/' + v.userId + '/' + v.token,
        data: {
            userId: v.userId,
            token: v.token

        },
        responseType: "json",
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
import http from './http'
import qs from 'qs'
export const adminUpdateStatus = (v) => {     //data是参数，里面传入登录信息
    return http({
        method: 'post', //请求方法
        url: '/api/admin/user/updateStatus',
        data:{
            userId: v.userId,
            status: v.status ? 0 : -1
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
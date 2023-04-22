import http from './http'
import qs from 'qs'

export const adminUpdateUser = (v) => {     //data是参数，里面传入登录信息
    return http({
        method: 'post', //请求方法
        url: '/api/admin/user/update',
        responseType: "json",
        data: {
            userId: v.userId,
            userName: v.userName,
            email: v.email,
            status: v.status ? 0 : -1,
            userDes: v.userDes
        },
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
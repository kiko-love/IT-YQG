import { sha256 } from 'js-sha256'
import http from './http'

export const adminDelUser = (userId) => {     //data是参数，里面传入登录信息
    return http({
        method: 'delete', //请求方法
        url: '/api/admin/user/delete/'+userId,
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
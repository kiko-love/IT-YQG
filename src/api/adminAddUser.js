import { sha256 } from 'js-sha256'
import http from './http'

export const adminAddUser = (v) => {     //data是参数，里面传入登录信息
    return http({
        method: 'post', //请求方法
        url: '/api/admin/user/add',
        responseType: "json",
        data: {
            userName: v.userName,
            email: v.email,
            password: sha256(v.password),
            roleId: v.roleId,
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
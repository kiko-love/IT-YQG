import http from './http'

export const getMsgUid = (v) => {     //data是参数，里面传入登录信息
    return http({
        method: 'get', //请求方法
        url: '/api/message/getMsgUid/'+v,
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
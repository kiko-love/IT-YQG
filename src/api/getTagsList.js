import http from './http'

const getTagsList = () => {     //data是参数，里面传入登录信息
    return http({
        method: 'post', //请求方法
        url: '/api/tags/list',
        responseType: "json",
        headers: {
            'Content-Type': 'application/json',
        },

    })
}

export { getTagsList }

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/
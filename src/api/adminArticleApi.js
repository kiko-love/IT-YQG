import http from './http'

const getArticleList = (v) => {     //data是参数，里面传入登录信息
    return http({
        method: 'post', //请求方法
        url: '/api/admin/article/list',
        data:v,
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

    })
}

export { getArticleList}
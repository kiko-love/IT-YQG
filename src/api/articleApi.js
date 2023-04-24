import http from "./http";

const updateArticle = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "post", //请求方法
    url: "/api/article/add",
    responseType: "json",
    data: v,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getMoreArticles = () => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/article/list/more",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getArticleDetail = (id) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/article/content/" + id,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { updateArticle, getMoreArticles, getArticleDetail };

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/

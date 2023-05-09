import http from "./http";

const addArticle = (v) => {
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

const getArticleDetail = (aid,uid) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/article/content/" + aid+"/"+uid,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const updateArticle = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "post", //请求方法
    url: "/api/article/update",
    responseType: "json",
    data: v,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getHotUserList = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/article/hotUserList",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export {
  addArticle,
  getMoreArticles,
  getArticleDetail,
  updateArticle,
  getHotUserList,
};

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/

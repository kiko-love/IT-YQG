import http from "./http";

const getCommentList = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/comment/list",
    responseType: "json",
    data: v,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const addComment = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "post", //请求方法
    url: "/api/comment/add",
    responseType: "json",
    data: v,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getTopicList = () => {
  return http({
    method: "post", //请求方法
    url: "/api/tags/topicList",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const deleteComment = (cid) => {
  return http({
    method: "delete", //请求方法
    url: "/api/comment/delete/" + cid,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getUrlInfo = (url) => {
  return http({
    method: "post", //请求方法
    url: "/api/comment/linkInfo",
    responseType: "json",
    data: { url: url },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

export { getCommentList, addComment, getTopicList, deleteComment, getUrlInfo };

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/

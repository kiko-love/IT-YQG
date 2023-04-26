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
export { getCommentList, addComment, getTopicList };

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/

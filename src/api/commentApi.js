import http from "./http";

const getCommentList = (pageNum, pageSize) => {
  pageNum = pageNum || 1;
  pageSize = pageSize || 10;
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/comment/list/" + pageNum + "/" + pageSize,
    responseType: "json",
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
const deleteReply = (cid, pid) => {
  return http({
    method: "delete", //请求方法
    url: "/api/comment/delete/reply/" + cid + "/" + pid,
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
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
const getHotCommentList = (pageNum, pageSize) => {
  pageNum = pageNum || 1;
  pageSize = pageSize || 10;
  return http({
    method: "get", //请求方法
    url: "/api/comment/list/hot/" + pageNum + "/" + pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getCommentListByTopic = (topic, pageNum, pageSize) => {
  pageNum = pageNum || 1;
  pageSize = pageSize || 10;
  return http({
    method: "get", //请求方法
    url: "/api/comment/list/topic/" + topic + "/" + pageNum + "/" + pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getReply = (v) => {
  return http({
    method: "get", //请求方法
    url: "/api/comment/children/" + v.parentId + "/" + v.pageNum + "/" + v.pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
const addCommentLike = (v) => {
  return http({
    method: "post", //请求方法
    url: "/api/comment/like",
    responseType: "json",
    data: v,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
const getCommentReplyList = (v) => {
  return http({
    method: "get", //请求方法
    url: "/api/comment/list/reply/" + v.parentId + "/" + v.pageNum + "/" + v.pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
const addCommentReply = (v) => {
  return http({
    method: "post", //请求方法
    url: "/api/comment/reply",
    responseType: "json",
    data: v,
    headers: {
      "Content-Type": "application/json"
    },
  });
};


export {
  getCommentList,
  addComment,
  getTopicList,
  deleteComment,
  getUrlInfo,
  getHotCommentList,
  getCommentListByTopic,
  getReply,
  addCommentLike,
  getCommentReplyList,
  addCommentReply,
  deleteReply,
};

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/

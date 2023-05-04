import http from "./http";

const searchArticle = (k, pageNum, pageSize) => {
  pageNum = pageNum || 1;
  pageSize = pageSize || 10;
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/search/article/" + k + "/" + pageNum + "/" + pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const searchUser = (k, pageNum, pageSize) => {
  pageNum = pageNum || 1;
  pageSize = pageSize || 10;
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/search/user/" + k + "/" + pageNum + "/" + pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const searchResource = (k, pageNum, pageSize) => {
  pageNum = pageNum || 1;
  pageSize = pageSize || 10;
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/search/resource/" + k + "/" + pageNum + "/" + pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export { searchArticle, searchUser, searchResource };

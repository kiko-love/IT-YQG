import http from "./http";

const searchArticle = (k) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/search/article/" + k,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const searchUser = (k) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/search/user/" + k,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const searchResource = (k) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/search/resource/" + k,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export { searchArticle, searchUser, searchResource };

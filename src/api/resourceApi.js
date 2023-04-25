import http from "./http";

const uploadResource = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "post", //请求方法
    url: "/api/resource/upload",
    responseType: "json",
    data: v,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const downloadResource = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "get", //请求方法
    url: "/api/resource/download/" + v.userId + "/" + v.fileId,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getResourceList = (v) => {
  return http({
    method: "get", //请求方法
    url: "/api/resource/list",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getHotList = () => {
  return http({
    method: "get", //请求方法
    url: "/api/resource/hot",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getResourceBytag = (tag) => {
  tag = tag ? "/" + tag : "";
  return http({
    method: "get", //请求方法
    url: "/api/resource/list" + tag,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//data是参数，里面传入登录信息

export {
  uploadResource,
  downloadResource,
  getResourceList,
  getHotList,
  getResourceBytag,
};

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/

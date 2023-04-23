import http from "./http";

const uploadResource = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "post", //请求方法
    url: "/api/resource/upload",
    responseType: "json",
    data: v,
    headers: {
      'Content-Type': 'multipart/form-data',
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

export { uploadResource, downloadResource };

/*
不会写es6，看传统es5写法
export const login = function(req) {
    return http('post','/GetTreeListForSoilByRegion',params)
}
*/

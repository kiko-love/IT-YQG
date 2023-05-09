import http from "./http";

const getArticleList = (v) => {
  //data是参数，里面传入登录信息
  return http({
    method: "post", //请求方法
    url: "/api/admin/article/list",
    data: v,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const getAuditArtcle = (v) => {
  return http({
    method: "get", //请求方法
    url:
      "/api/admin/article/list/" + v.audit + "/" + v.pageNum + "/" + v.pageSize,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
const updateAudit = (v) => {
  return http({
    method: "post", //请求方法
    url: "/api/admin/article/updateAudit",
    data: v,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
const deleteArticle = (aid) => {
  return http({
    method: "delete", //请求方法
    url: "/api/admin/article/delete/" + aid,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const updateArticle = (v)=>{
  return http({
    method: "post", //请求方法
    url: "/api/admin/article/update",
    data:v,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { getArticleList, getAuditArtcle, updateAudit, deleteArticle,updateArticle };

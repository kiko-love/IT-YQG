import http from "./http";
const getAllResource = (v) => {
  return http({
    method: "get", //请求方法
    url: "/api/resource/list/all",
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
const updateAudit = (v) => {
  return http({
    method: "post", //请求方法
    url: "/api/admin/resource/audit",
    data: v,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
const deleteResource = (fileId) => {
  return http({
    method: "delete", //请求方法
    url: "/api/admin/resource/delete/" + fileId,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export { getAllResource, updateAudit, deleteResource };

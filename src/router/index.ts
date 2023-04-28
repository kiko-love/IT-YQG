import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/view/Home/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/view/HomePage/index.vue"),
      },
      {
        path: "/resource",
        name: "resource",
        component: () => import("@/view/resource/index.vue"),
      },
      {
        path: "/communication",
        name: "communication",
        component: () => import("@/view/communication/index.vue"),
      },
      {
        path: "/suggestion",
        name: "suggestion",
        component: () => import("@/view/suggestion/index.vue"),
      },
      {
        path: "/activate/:token/:userId",
        name: "activate",
        component: () => import("@/view/activatedRegister/index.vue"),
      },
      {
        path: "/uploadResource",
        name: "uploadResource",
        component: () => import("@/view/uploadResource/index.vue"),
      },
      {
        path: "/articleDetail/:articleId",
        name: "articleDetail",
        component: () => import("@/view/articleDetail/index.vue"),
      },
      {
        path: "/:pathMatch(.*)",
        name: "error",
        component: () => import("@/view/404/index.vue"),
        meta: { title: "404" },
      },
      {
        path: "/noPermission",
        name: "noPermission",
        component: () => import("@/view/403/index.vue"),
        meta: { title: "403" },
      },
    ],
  },
  {
    path: "/editor/drafts",
    name: "drafts",
    component: () => import("@/view/editor/index.vue"),
    meta: { title: "loginScan" },
  },
  {
    path: "/login/scan",
    name: "loginScan",
    component: () => import("@/view/mockScan/index.vue"),
    meta: { title: "loginScan" },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/admin/view/Login/index.vue"),
  },
  {
    path: "/adminHome",
    name: "adminHome",
    redirect: "/adminHome/info",
    component: () => import("@/admin/view/Home/index.vue"),
    children: [
      {
        path: "info",
        name: "info",
        component: () => import("@/admin/view/Info/index.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/admin/view/User/index.vue"),
      },
      {
        path: "comment",
        name: "comment",
        component: () => import("@/admin/view/Comment/index.vue"),
      },
      {
        path: "article",
        name: "article",
        component: () => import("@/admin/view/Article/index.vue"),
      },
      {
        path: "resources",
        name: "resources",
        component: () => import("@/admin/view/Resource/index.vue"),
      },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)",
  //   name: "error",
  //   component: () => import("@/view/404/index.vue"),
  //   meta: { title: "404" },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const isLogin = function () {
  let login = localStorage.getItem("login_token");
  return !!login;
};

router.beforeEach((to, from, next) => {
  const excludedPaths = [
    "/home",
    "/index",
    "/noPermission",
    "/resource",
    "/communication",
    "/suggestion",
    "/activate",
    "/login/scan",
  ];
  if (excludedPaths.includes(to.path) || to.name === "error") return next();
  //获取token
  const tokenStr = localStorage.getItem("login_token");
  // if (!tokenStr) return next('/noPermission')
  next();
});

export default router;

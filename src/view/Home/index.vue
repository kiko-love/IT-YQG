!<template>
  <div id="ac" class="container">
    <a-layout style="height: 100%;">
      <a-layout-header class="header">
        <div class="top-container">
          <a-row class="grid-top">
            <a-col :xs="0" :sm="0" :md="4" :lg="4" :xl="4" :xxl="4">
              <div class="home-img">
                <a href="/">
                  <img src="@/assets/logo.svg" alt="logo" height="40" />
                </a>
              </div>
            </a-col>
            <a-col :xs="2" :sm="2" :md="0" :lg="0" :xl="0" :xxl="0">
              <div class="home-img">
                <a href="/">
                  <img src="@/assets/logo-icon.svg" alt="logo" height="40" />
                </a>
              </div>
            </a-col>
            <a-col :xs="8" :sm="6" :md="2" :lg="0" :xl="0" :xxl="0">
              <div class="header-breakPoint">
                <div class="breakPoint">
                  <a-dropdown @select="handleSelect" :popup-max-height="false">
                    <a-button type="text">
                      {{dropDownTitle?dropDownTitle:'首页'}}
                      <icon-down />
                    </a-button>
                    <template #content>
                      <a-doption v-for="(i,index) in homeMeun" :value="i.v" :key="index">
                        <div
                          class="dropdown-meun"
                          :class="{'dropdwon-active':i.v === currentPath[0]}"
                        >{{i.name}}</div>
                      </a-doption>
                    </template>
                    <template #footer>
                      <div class="dropdown-footer">
                        <img
                          draggable="false"
                          class="dropdown-footer-img"
                          src="@/assets/logo.png"
                          width="78"
                        />
                      </div>
                    </template>
                  </a-dropdown>
                </div>
              </div>
            </a-col>

            <a-col :xs="0" :sm="0" :md="0" :lg="10" :xl="10" :xxl="9">
              <div class="home-tabs">
                <a-menu
                  mode="horizontal"
                  v-model:selected-keys="currentPath"
                  :default-selected-keys="['home']"
                  show-collapse-button
                  breakpoint="md"
                  @menu-item-click="handleMenuItem"
                >
                  <a-menu-item key="home">首页</a-menu-item>
                  <a-menu-item key="resource">资源库</a-menu-item>
                  <a-menu-item key="communication">交流广场</a-menu-item>
                  <a-menu-item key="suggestion">建议</a-menu-item>
                </a-menu>
              </div>
            </a-col>
            <a-col :xs="14" :sm="16" :md="18" :lg="10" :xl="10" :xxl="11">
              <a-row class="grid-top">
                <a-col class="home-tool" :xs="24" :sm="18" :md="20" :lg="16" :xl="16" :xxl="16">
                  <div class="home-search">
                    <a-trigger
                      trigger="focus"
                      auto-fit-popup-width
                      popup-container=".home-search"
                      update-at-scroll
                    >
                      <a-input-search
                        v-model:model-value="searchContent"
                        class="home-search-input"
                        :class="{'search-active':searchFoucs}"
                        placeholder="搜索猿趣阁"
                        search-button
                        @focus="()=>{searchFoucs = true}"
                        @blur="handleSearchBlur"
                      />
                      <!-- 输入框下方触发器内容 -->
                      <template #content>
                        <div class="search-trigger">
                          <div class="search-trigger-top">
                            <div class="search-trigger-top-tip">
                              <span>搜索历史</span>
                            </div>
                            <div class="search-trigger-top-del">
                              <icon-delete />
                            </div>
                          </div>
                          <a-empty>暂无历史记录</a-empty>
                        </div>
                      </template>
                    </a-trigger>
                    <a-button-group :class="[{'hide':searchFoucs},'search-release']">
                      <a-button type="primary">发布文章</a-button>
                    </a-button-group>
                  </div>
                </a-col>
                <a-col :xs="0" :sm="6" :md="4" :lg="8" :xl="8" :xxl="8">
                  <div v-if="user.loginStatus" class="home-avatar">
                    <div class="popc">
                      <!-- popup-container='.badge' -->
                      <a-popover
                        class="message-pop"
                        position="br"
                        trigger="click"
                        popup-container=".popc"
                      >
                        <a-badge class="badge" :count="2" :max-count="10">
                          <icon-email class="message" :style="{fontSize:'32px',cursor:'pointer'}" />
                        </a-badge>
                        <template #title>
                          <div class="message-tool">
                            <div class="message-pop-title">
                              <a-tabs
                                v-model:activeKey="notificationKey"
                                @change="getMessage(notificationKey)"
                                :hide-content="true"
                              >
                                <a-tab-pane key="1">
                                  <template #title>
                                    <span>未读消息</span>
                                  </template>
                                </a-tab-pane>
                                <a-tab-pane key="2">
                                  <template #title>
                                    <span>全部消息</span>
                                  </template>
                                </a-tab-pane>
                              </a-tabs>
                            </div>
                            <div>
                              <a-button type="text">全部已读</a-button>
                            </div>
                          </div>
                        </template>
                        <template #content>
                          <div class="notification-container">
                            <div v-if="this.notificationLoading" class="notification-spin">
                              <a-spin />
                            </div>
                            <div
                              v-else
                              v-for="(i,index) in 2"
                              class="notification-entry"
                              :key="index"
                            >
                              <div class="n-closeBtn">
                                <a-button type="text" size="mini" shape="round">
                                  <template #icon>
                                    <icon-close :style="{color:'#020300'}" />
                                  </template>
                                </a-button>
                              </div>
                              <div class="n-avatar">
                                <a-avatar
                                  :style="{ backgroundColor: '#3370ff',cursor:'pointer','user-select':'none'}"
                                >
                                  <IconUser />
                                </a-avatar>
                              </div>
                              <div class="n-content">
                                <div class="n-title">猿趣阁</div>
                                <div class="n-text">
                                  消息测试消息测试消息测试消息测试消息测试消
                                  消息测试消息测试消息测试消息测试消息测试消息测试消息测试
                                  消息测试消息测试消息测试
                                </div>
                                <div class="n-time">2023年1月21日 23点59分</div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </a-popover>
                    </div>
                    <div class="myAvatar">
                      <a-popover position="br" trigger="click" popup-container=".myAvatar">
                        <a-avatar
                          :style="{ backgroundColor: '#3370ff',cursor:'pointer','user-select':'none'}"
                          :imageUrl="user.userAvatarUrl"
                        >
                          <IconUser />
                          <!-- <img v-else alt="avatar" :src="user.userAvatarUrl" /> -->
                        </a-avatar>
                        <template #content>
                          <a-card :style="{ width: '180px' }" :bordered="false">
                            <template #actions>
                              <a-button size="mini">
                                个人主页
                                <template #icon>
                                  <icon-home />
                                </template>
                              </a-button>
                              <a-button size="mini" @click="logOut">退出登陆</a-button>
                            </template>
                            <div class="user-info">
                              <div class="user-avatar">
                                <a-avatar
                                  :style="{ backgroundColor: '#3370ff',cursor:'pointer' }"
                                  :imageUrl="user.userAvatarUrl"
                                >
                                  <IconUser />
                                </a-avatar>
                              </div>
                              <div class="user-detail">
                                <div class="user-name">{{this.user.username}}</div>
                                <div class="user-coin">猿石:{{this.user.usercoin}}</div>
                              </div>
                            </div>
                            <div class="user-level">
                              <div class="level-info">
                                <div class="level-tip">
                                  猿等级
                                  <span class="bold">LV.4</span>
                                </div>
                                <div class="level-process">4/5</div>
                              </div>
                              <a-progress
                                :show-text="false"
                                :percent="(this.user.uservalue ? this.user.uservalue : 0) / 500.0"
                                :style="{width:'100%'}"
                              />
                            </div>
                          </a-card>
                        </template>
                      </a-popover>
                    </div>
                  </div>
                  <!-- 未登录区域 -->
                  <div v-else class="login-register">
                    <a-popover position="br" trigger="hover" popup-container=".login-register">
                      <a-button-group type="primary">
                        <a-button @click="handleLoginVisible">登录</a-button>
                        <a-button @click="handleRegisterVisible">注册</a-button>
                      </a-button-group>
                      <template #content>
                        <div class="lr">
                          <div class="lr-title">登录猿趣阁后体验更多功能</div>
                          <div class="lr-permission">
                            <div class="lr-item">
                              <span class="lr-item-icon-wrap">
                                <icon-eye />
                              </span>
                              <span>查看更多文章</span>
                            </div>
                            <div class="lr-item">
                              <span class="lr-item-icon-wrap">
                                <icon-book />
                              </span>

                              <span>解锁更多资源</span>
                            </div>
                            <div class="lr-item">
                              <span class="lr-item-icon-wrap">
                                <icon-apps />
                              </span>
                              <span>体验更多用法</span>
                            </div>
                            <div class="lr-item">
                              <span class="lr-item-icon-wrap">
                                <icon-pen />
                              </span>
                              <span>参与交流分享</span>
                            </div>
                          </div>
                          <div>
                            <a-button type="primary" long @click="handleLoginVisible">立即登录</a-button>
                          </div>
                          <div class="lr-guide-register">
                            <span>还没有账号？</span>
                            <a-button type="text" @click="handleRegisterVisible">立即注册</a-button>
                          </div>
                        </div>
                      </template>
                    </a-popover>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-layout-header>
      <!-- layout布局下方内容区域，负责承担子页面跳转 -->
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <!-- 登录对话框 -->
    <a-modal
      class="login-guide-modal"
      v-model:visible="loginVisible"
      :mask-closable="false"
      :footer="false"
      :width="300"
      @close="handleLoginClose"
      simple
      alignCenter
    >
      <div>
        <div class="login-close">
          <icon-close @click="closeLogin" />
        </div>
        <div class="login-top">
          <a-tabs
            v-model:activeKey="loginModeKey"
            @change="changeLoginMode(loginModeKey)"
            :hideContent="true"
          >
            <a-tab-pane key="1">
              <template #title>扫码登录</template>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #title>密码登录</template>
            </a-tab-pane>
            <!-- <a-tab-pane key="3">
              <template #title>手机登录</template>
            </a-tab-pane>-->
          </a-tabs>
          <!-- <img src="@/assets/favico.png" alt="logo" width="32" />
          <div class="login-title">
            <span>登录猿趣阁</span>
          </div>-->
        </div>
        <div v-if="loginMode==='1'" class="login-qr">
          <span class="img-loading" v-if="QrLoading">
            <a-spin tip="二维码加载中..." />
          </span>
          <span v-else-if="!QrLoading" class="img-qr">
            <img style="object-fit:scale-down" :src="loginQrData" alt width="220" />
            <div v-if="QrExpire">
              <span class="img-mark"></span>
              <span class="img-expireTip">二维码已失效，请重新获取</span>
              <icon-refresh class="img-refresh" @click="refreshQr" />
            </div>
            <div v-if="QrScan">
              <span class="img-mark-confirm"></span>
              <span class="img-expireTip">请在手机上「确认登录」</span>
              <icon-check-circle class="img-check" stroke-linejoin="arcs" />
            </div>
          </span>
          <div v-if="!QrLoading" class="login-qr-tip">打开手机客户端扫一扫进行登录（mock）</div>
          <!-- <a-image width="220" :src="loginQrData" :preview="false"/> -->
        </div>
        <div class="login-account" v-if="loginMode==='2'">
          <a-form :model="loginForm" @submit="handleSubmit" auto-label-width>
            <a-form-item field="account" label="账号">
              <a-input v-model="loginForm.account" placeholder="用户名/邮箱" />
              <template #extra>
                <div></div>
              </template>
            </a-form-item>
            <a-form-item field="password" label="密码">
              <a-input-password v-model="loginForm.password" placeholder="请输入密码" allow-clear />
            </a-form-item>
            <div class="login-findpwdTip">
              <a href>忘记密码</a>
            </div>
            <a-button html-type="submit" type="primary" long @click="pwdLogin">登录</a-button>
          </a-form>
        </div>
      </div>
    </a-modal>

    <!-- 首次登录推荐标签 -->
    <a-modal
      class="tags-guide-modal"
      v-model:visible="tagsVisible"
      :mask-closable="false"
      :footer="false"
      :width="650"
      simple
      alignCenter
    >
      <div>
        <div class="tags-topTitle">
          <span>选择你感兴趣的方向</span>
          <img src="@/assets/ape.png" alt />
        </div>
        <div class="tags-container">
          <a-checkbox-group
            v-model:model-value="tagsCheck"
            :max="4"
            class="tags-list"
            @change="checkChange(value)"
          >
            <template v-for="(item,index) in recommendTags" :key="item">
              <a-checkbox :value="item">
                <template #checkbox="{ checked,disabled }">
                  <a-space
                    align="start"
                    class="custom-checkbox-card"
                    :class="[{ 'custom-checkbox-card-checked': checked },
                    {'custom-checkbox-card-disabled':disabled}
                    ]"
                  >
                    <div class="custom-checkbox-card-mask">
                      <div class="custom-checkbox-card-mask-dot" />
                    </div>
                    <div>
                      <div
                        class="custom-checkbox-card-title"
                        :class="{'custom-checkbox-card-title-disabled':disabled}"
                      >{{ item }}</div>
                      <!-- <a-typography-text type="secondary">标签描述</a-typography-text> -->
                    </div>
                  </a-space>
                </template>
              </a-checkbox>
            </template>
          </a-checkbox-group>
        </div>
        <div class="tags-actions">
          <a-space>
            <a-button @click="skipTags">跳过</a-button>
            <a-button
              type="primary"
              :disabled="!(Array.isArray(tagsCheck) && tagsCheck.length)"
            >{{tagsBtnTip}}</a-button>
          </a-space>
        </div>
      </div>
    </a-modal>
    <!-- 注册对话框 -->
    <a-modal
      v-model:visible="rVisible"
      :mask-closable="false"
      :footer="false"
      :width="350"
      @close="handleRegisterClose"
      simple
      alignCenter
    >
      <div v-if="registerView === '1'">
        <div class="register-tip">
          <div class="register-tip-left">
            <div>
              <img src="@/assets/logo-icon.png" alt="logo" width="32" />
            </div>
            <div class="register-tip-text">加入猿趣阁</div>
          </div>
          <div class="regiter-close">
            <icon-close @click="closeRegister" />
          </div>
        </div>

        <div class="register-container">
          <a-form
            :model="registerForm"
            :style="{width:'100%'}"
            @submit="handleSubmitRegister"
            auto-label-width
          >
            <a-form-item
              field="password"
              label="用户名"
              feedback
              :validate-trigger="registerStatus.accountStatus"
            >
              <a-input
                @blur="checkAccount"
                v-model="registerForm.account"
                placeholder="请输入用户名"
                allow-clear
              />
              <template #help>
                <div
                  style="color:#f53f3f"
                  v-if="registerStatus.accountStatus=='error'"
                >用户名长度介于4-10位，由数字字母和下划线组成</div>
              </template>
            </a-form-item>
            <a-form-item field="password" label="密码" feedback>
              <a-input-password
                @blur="checkPwd"
                v-model="registerForm.pwd1"
                placeholder="请输入密码"
                allow-clear
              />
              <template #help>
                <div
                  style="color:#f53f3f"
                  v-if="registerStatus.pwd1Status=='error'"
                >密码至少长度介于6-16位且至少包含数字和字母</div>
              </template>
            </a-form-item>

            <a-form-item field="password" label="确认密码" feedback>
              <a-input-password
                @blur="confirmPwd"
                v-model="registerForm.pwd2"
                placeholder="请确认密码"
                allow-clear
              />
              <template #help>
                <div style="color:#f53f3f" v-if="registerStatus.pwd2Status=='error'">两次输入密码不一致</div>
              </template>
            </a-form-item>

            <a-form-item style="margin-bottom:1rem" field="name" label="邮箱" feedback>
              <a-input
                @blur="checkEmail(registerForm.email)"
                v-model="registerForm.email"
                placeholder="请输入邮箱"
              />
              <template #help>
                <div style="color:#f53f3f" v-if="registerStatus.emailStatus=='error'">请检查您的邮箱格式是否正确</div>
              </template>
            </a-form-item>
            <a-button type="primary" long @click="regAccount">注册</a-button>
          </a-form>
        </div>
      </div>

      <div v-if="registerView === '2'">
        <a-result status="success" title="账号注册成功">
          <template #subtitle>请前往您的注册邮箱内查看激活链接</template>
          <template #extra>
            <a-space>
              <a-button type="primary" @click="confirmRegister">确认</a-button>
            </a-space>
          </template>
        </a-result>
      </div>
      <div v-if="registerView === '3'">
        <a-result status="error" title="账号注册失败">
          <template #subtitle>注册时遇到了问题，请您重新尝试</template>

          <template #extra>
            <a-space>
              <a-button type="primary" @click="changeRegisterView('1')">返回</a-button>
            </a-space>
          </template>
        </a-result>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  IconUser,
  IconHome,
  IconDown,
  IconEmail,
  IconClose,
  IconEye,
  IconBook,
  IconMessage,
  IconRefresh,
  IconCheckCircle,
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconPen,
  IconDelete
} from "@arco-design/web-vue/es/icon";
import { userStore } from "@/store/userStore";
import { login } from "@/api/login";
import { loginAccount } from "@/api/loginAccount";
import { register } from "@/api/register";
import { ref, reactive } from "vue";
import { sha256 } from "js-sha256";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
export default {
  name: "ItYqgIndex",
  components: {
    IconUser,
    IconHome,
    IconDown,
    IconEmail,
    IconClose,
    IconEye,
    IconBook,
    IconMessage,
    IconRefresh,
    IconCheckCircle,
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconPen,
    IconDelete
  },
  setup(props) {
    const homeMeun = reactive([
      {
        name: "首页",
        v: "home"
      },
      {
        name: "资源库",
        v: "resource"
      },
      {
        name: "交流广场",
        v: "communication"
      },
      {
        name: "建议",
        v: "suggestion"
      }
    ]);
    const recommendTags = reactive([
      "后端",
      "前端",
      "Android",
      "iOS",
      "编程语言",
      "开发工具",
      "区块链",
      "人工智能",
      "大数据"
    ]);
    const loginForm = reactive({
      account: "",
      password: ""
    });
    const registerForm = reactive({
      account: "",
      pwd1: "",
      pwd2: "",
      email: "",
      verCode: ""
    });
    const registerStatus = reactive({
      accountStatus: "",
      pwd1Status: "",
      pwd2Status: "",
      emailStatus: ""
    });
    const router = useRouter();
    const currentPath = ref([router.currentRoute.value.name]);
    // console.log(currentPath.value[0])
    const dropDownTitle = ref(
      homeMeun.find(item => item.v === currentPath.value[0])?.name
    );
    const dropDownValue = ref("home");
    const handleSubmit = data => {
      console.log(data);
    };
    const handleSubmitRegister = data => {
      console.log(data);
    };
    const userInfo = userStore();
    return {
      user: userInfo, //ref(null)
      currentPath,
      dropDownTitle,
      dropDownValue,
      notificationLoading: ref(false),
      notificationKey: ref("1"),
      loginVisible: ref(false),
      tagsVisible: ref(false),
      rVisible: ref(false),
      QrExpire: ref(false),
      QrScan: ref(false),
      QrLoading: ref(true),
      loginModeKey: ref("1"),
      loginMode: ref("1"), //1二维码,2账号密码
      loginQrData: ref(null),
      loginSocket: ref(null),
      tagsCheck: ref([]),
      tagsBtnTip: ref("至少选择一个方向"),
      loginForm,
      handleSubmit,
      handleSubmitRegister,
      recommendTags,
      router,
      homeMeun,
      registerForm,
      searchFoucs: ref(false),
      searchContent: ref(""),
      registerStatus,
      registerView: ref("1")
    };
  },
  created() {
    this.getUserInfo();
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    logOut(){
      localStorage.setItem('user',null);
      this.user = null;

    },
    getUserInfo(){   
      const access_token = localStorage.getItem('login_token');
      const user = JSON.parse(localStorage.getItem("user"));
      this.user.userAvatarUrl = user.userAvatarUrl;
      this.user.usercoin = user.usercoin;
      this.user.username = user.username;
      this.user.userId = user.username;     
      this.user.loginStatus = user.loginStatus;
    },
    confirmRegister() {
      this.registerView = "1";
      this.rVisible = false;
    },
    changeRegisterView(v) {
      v = v ? v : "1";
      this.registerView = v;
    },
    regAccount() {
      const registerStatus = this.registerStatus;
      const registerForm = this.registerForm;
      if (
        registerStatus.accountStatus === "success" &&
        registerStatus.pwd1Status === "success" &&
        registerStatus.pwd2Status === "success" &&
        registerStatus.emailStatus === "success"
      ) {
        let v = {
          account: registerForm.account,
          password: sha256(registerForm.pwd1),
          email: registerForm.email
        };
        const res = register(v);
        let that = this;
        res
          .then(response => {
            //这里是请求成功后的操作
            const result = response.data;
            console.log(result);
            if (result.code === 300) {
              that.registerView = "2";
              Message.success("账号注册成功，请前往您的注册邮箱进行激活操作");
            } else {
              Message.warning("账号注册失败");
            }
          })
          .catch(error => {
            console.log(error);
            Message.error(
              error.code === "ECONNABORTED"
                ? "请求超时"
                : "请求错误，请重新尝试"
            );
            //这里是请求失败后的操作
            console.log(error);
          });
      } else {
        Message.warning("请检查您的输入是否合法");
      }
    },
    pwdLogin() {
      let v = {
        account: this.loginForm.account,
        password: sha256(this.loginForm.password)
      };
      const res = loginAccount(v);
      const that = this;
      res
        .then(response => {
          //这里是请求成功后的操作
          console.log(response);
          const result = response.data;
          if (result === null || result === undefined || result === "") {
            Message.error("请求发生错误，请重新尝试");
            return false;
          }
          //账号未激活
          switch (result.code) {
            case 310:
              Message.warning("账号状态异常，暂时无法登录");
              break;
            case 320:
              Message.warning("您的账号还未激活");
              break;
            case 220:
              // this.loginVisible = false;
              that.user.username = result.data.userName;
              that.user.usercoin = result.data.integral;
              ththatis.user.userId = result.data.userId;
              that.user.userAvatarUrl = result.data.userAvatarUrl;
              that.user.loginStatus = true;
              localStorage.setItem("login_token", result.data.token);
              localStorage.setItem("user", JSON.stringify(that.user));
              Message.success("登录成功，欢迎回来：" + result.data.userName);
              break;
            default:
              Message.warning(result.msg);
          }
        })
        .catch(error => {
          console.log(error);
          Message.error(
            error.code === "ECONNABORTED" ? "请求超时" : "请求错误，请重新尝试"
          );
          //这里是请求失败后的操作
          console.log(error);
        });
    },
    checkEmail(v) {
      if (this.registerForm.email === "") {
        return false;
      }
      let reg = new RegExp(
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      );
      let res = reg.test(v);
      if (res) {
        this.registerStatus.emailStatus = "success";
      } else {
        this.registerStatus.emailStatus = "error";
      }
    },
    checkAccount() {
      if (this.registerForm.account === "") {
        return false;
      }
      let reg = new RegExp("^[0-9a-zA-Z_]{4,10}$");
      let res = reg.test(this.registerForm.account);
      if (res) {
        this.registerStatus.accountStatus = "success";
      } else {
        this.registerStatus.accountStatus = "error";
      }
    },
    checkPwd() {
      if (this.registerForm.pwd1 === "") {
        return false;
      }
      let reg = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$");
      let res = reg.test(this.registerForm.pwd1);
      if (res && this.registerForm.pwd1 !== "") {
        this.registerStatus.pwd1Status = "success";
      } else {
        this.registerStatus.pwd1Status = "error";
      }
    },
    confirmPwd() {
      if (
        this.registerForm.pwd2 !== this.registerForm.pwd1 &&
        this.registerForm.pwd2 !== ""
      ) {
        this.registerStatus.pwd2Status = "error";
      } else {
        this.registerStatus.pwd2Status = "success";
      }
    },
    handleRegisterClose() {
      this.rVisible = false;
    },
    handleRegisterVisible() {
      this.rVisible = true;
    },
    handleSearchBlur() {
      if (this.searchContent === "") {
        this.searchFoucs = false;
      }
    },
    handleMenuItem(v) {
      let drop = this.homeMeun.find(item => item.v === v);
      this.dropDownValue = drop.v;
      this.dropDownTitle = drop.name;
      this.router.push("/" + v);
    },
    handleSelect(v) {
      let drop = this.homeMeun.find(item => item.v === v);
      this.dropDownValue = drop.v;
      this.dropDownTitle = drop.name;
      this.currentPath[0] = this.dropDownValue;
      this.router.push("/" + v);
    },
    checkChange(v) {
      if (this.tagsCheck.length) {
        this.tagsBtnTip = "确定";
      } else {
        this.tagsBtnTip = "至少选择一个方向";
      }
    },
    skipTags() {
      this.tagsVisible = false;
    },
    handleLoginClose() {
      this.loginMode = "1";
      this.loginModeKey = this.loginMode;
      this.loginForm.name = "";
      this.loginForm.password = "";
      this.QrScan = false;
      try {
        this.loginSocket.close();
      } catch (error) {
        console.log(error);
      }
    },
    changeLoginMode(key) {
      this.loginMode = key;
      if (this.loginSocket) {
        this.loginSocket.close();
      }
      if (key === "1") {
        this.QrLoading = true;
        this.refreshQr();
      }
    },
    initWebSocket(uid) {
      const that = this;
      const wsServerPath = "ws://localhost:8081/api/websocket/login/";
      this.loginSocket = new WebSocket(wsServerPath + uid);
      //打开事件
      this.loginSocket.onopen = () => {
        console.log("Socket 已打开");
        this.QrLoading = false;
        //socket.send("这是来自客户端的消息" + location.href + new Date());
      };
      //获得消息事件
      this.loginSocket.onmessage = msg => {
        const data = JSON.parse(msg.data);
        console.log(data);
        if (data.code == 100) {
          //这里存放自己业务需要的数据。怎么放自己看
          Message.success("websocket建立成功");
        } else if (data.code == 20000) {
          Message.success("用户已扫码，请在手机上进行登录确认");
          this.QrScan = true;
        } else if (data.code == 20110) {
          this.QrScan = false;
          Message.warning("二维码已经过期，请重新获取！");
          this.QrExpire = true;
          this.loginSocket.close();
        } else {
          //如果过期了，关闭连接、重置连接、刷新二维码
          this.loginSocket.close();
          refreshQr();
        }
      };
      //关闭事件
      this.loginSocket.onclose = () => {
        console.log("Socket已关闭");
      };
      //发生了错误事件
      this.loginSocket.onerror = () => {
        this.QrLoading = false;
        that.loginQrData = "src/assets/img-error.png";
        Message.error("WebSocket服务器连接失败！");
        console.log("Socket发生了错误");
        //此时可以尝试刷新页面
      };
    },
    async refreshQr() {
      if (this.loginSocket !== null) {
        this.loginSocket.close();
      }
      this.QrExpire = false;
      const that = this;
      const res = login({
        userId: "10001",
        password: this.loginForm.password
      });
      res
        .then(response => {
          //这里是请求成功后的操作
          console.log("二维码uid：", response.headers.token);

          let binary = [];
          binary.push(response.data);
          that.loginQrData = window.URL.createObjectURL(new Blob(binary));
          that.initWebSocket(response.headers.token);
        })
        .catch(error => {
          console.log(error);
          Message.error(
            error.code === "ECONNABORTED" ? "请求超时" : "请求错误，请重新尝试"
          );
          //这里是请求失败后的操作
          console.log(error);
        });
    },
    closeRegister() {
      this.rVisible = false;
    },
    closeLogin() {
      this.loginVisible = false;
    },
    async handleLoginVisible() {
      this.QrLoading = true;
      this.loginVisible = true;
      setTimeout(() => {
        this.refreshQr();
      }, 800);
    },
    getMessage(key) {
      this.notificationLoading = !this.notificationLoading;
      setTimeout(() => {
        this.notificationLoading = !this.notificationLoading;
      }, 500);
    }
  }
};
</script>
<style>
.search-trigger {
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
.search-trigger-top {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-neutral-3);
}
.search-trigger-top-del {
  cursor: pointer;
}
.search-trigger-top-tip {
  color: #8a8a8a;
  margin-right: 8px;
}
.myAvatar {
  position: relative;
}
.popc {
  position: relative;
}
div::-webkit-scrollbar {
  width: 6px;
}
div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b9b9b9;
}
div::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eeeeee;
}
.arco-modal-simple {
  padding: 0px 24px 32px;
}
</style>
<style lang="less" scoped>
/deep/.arco-card-body {
  padding: 12px 5px;
}
/deep/.arco-modal-simple {
  padding: 0px 24px 32px;
}
/deep/.arco-checkbox-group,
.arco-checkbox {
  margin-right: 0;
}

.dropdown-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  padding: 10px;
  .dropdown-footer-img {
    -webkit-user-drag: none;
    user-select: none;
  }
}
.dropdown-meun {
  height: 2.5rem;
  width: 9rem;
  text-align: center;
}
.dropdwon-active {
  color: #165dff;
}
// .dropdwon-active::after {
//   content: "";
//   width: 59px;
//   height: 1px;
//   background-color: #165dff;
//   position: absolute;
//   bottom: 5px;
//   left: 55px;
//   border-radius: 5px;
// }

.breakPoint {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.tags-container {
  height: 240px;
  overflow-y: auto;
  padding: 1rem 0;
}
.tags-actions {
  text-align: right;
  margin: 1rem 1rem 0 2rem;
}
.tags-list {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  justify-content: center;
  user-select: none;
}
.custom-checkbox-card {
  padding: 10px 16px;
  margin: 10px 10px;
  border: 1px solid var(--color-border-3);
  border-radius: 4px;
  width: 200px;
  box-sizing: border-box;
}
.custom-checkbox-card-disabled {
  border: 1px solid var(--color-border-2);
}

.custom-checkbox-card-mask {
  height: 0;
  width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  border: 0 solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 1px;
}

.custom-checkbox-card-title {
  color: var(--color-text-2);
  font-size: 18px;
  // font-weight: bold;
  margin-bottom: 8px;
}
.custom-checkbox-card-title-disabled {
  color: var(--color-text-4);
}

.custom-checkbox-card:hover:not(.custom-checkbox-card-disabled),
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover:not(.custom-checkbox-card-disabled)
  .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
.tags-topTitle {
  font-size: 20px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: rgb(53, 53, 53);
  // user-select: none;
}
.register-tip-left {
  display: flex;
}
.register-tip-text {
  line-height: 34px;
  margin-left: 3px;
}
.register-tip {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
.regiter-close {
  float: right;
  cursor: pointer;
  opacity: 0.4;
  font-size: 17px;
}
.login-close {
  float: right;
  cursor: pointer;
  opacity: 0.4;
  font-size: 17px;
}
.login-close:hover {
  opacity: 1;
}
input[type="password"]::-ms-reveal {
  display: none;
}
input[type="password"]::-ms-clear {
  display: none;
}
input[type="password"]::-o-clear {
  display: none;
}
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 290px;
}
.login-register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px;
  .login-findpwdTip {
    text-align: right;
    font-size: 13px;
    color: #777575;
    margin: 0 0 1rem;
    a {
      color: #777575;
      text-decoration: none;
    }
  }
}
.login-account {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px;
  .login-findpwdTip {
    text-align: right;
    font-size: 13px;
    color: #777575;
    margin: 0 0 1rem;
    a {
      color: #777575;
      text-decoration: none;
    }
  }
}
.login-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 280px;
  .img-qr {
    display: block;
    position: relative;
    height: 220px;
    width: 220px;
    overflow: hidden;
  }
  .img-loading {
    display: flex;
    position: relative;
    height: 220px;
    width: 220px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }
  .img-check {
    display: inline-block;
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    cursor: pointer;
    stroke: rgb(50, 175, 102);
    font-size: 2.8rem;
  }
  .img-refresh {
    display: inline-block;
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    cursor: pointer;
    stroke: #fff;
    font-size: 2.8rem;
  }
  .img-expireTip {
    position: absolute;
    display: block;
    width: 100%;
    bottom: 2rem;
    text-align: center;
    font-size: 12px;
    color: #fff;
    z-index: 10;
    cursor: pointer;
  }
  .img-mark-confirm {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #3b3a3af3;
    font-size: 14px;
    color: #fff;
    box-sizing: border-box;
    line-height: 1.5;
    border-radius: 10px;
  }
  .img-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    color: #fff;
    box-sizing: border-box;
    line-height: 1.5;
    border-radius: 10px;
  }
  .login-qr-tip {
    font-size: 13px;
    color: #777575;
    margin: 1rem 0 1rem;
  }
}
.login-top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 5px;
  width: 100%;
  img {
    object-fit: cover;
    margin: 0 2px 0;
  }
  .login-title {
    font-size: 20px;
    font-weight: 600;
  }
}

.lr {
  display: flex;
  flex-direction: column;
  width: 280px;
  .lr-title {
    font-size: 15px;
    font-weight: 600;
    color: #252933;
    margin-bottom: 24px;
    line-height: 24px;
    width: 100%;
  }
  .lr-permission {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    color: #515767;
    font-size: 14px;
    // line-height: 22px;
    margin-bottom: 10px;
    .lr-item {
      width: 120px;
      margin-bottom: 8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
    }
    .lr-item-icon-wrap {
      border-radius: 50%;
      background-color: #eaf2ff;
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .lr-item svg {
      width: 16px;
      height: 16px;
      stroke: #165dff;
    }
  }
  .lr-guide-register {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
  }
}
.notification-spin {
  display: flex;
  justify-content: center;
  max-width: 300px;
  width: 300px;
  padding: 1rem 1rem;
}
.notification-container::-webkit-scrollbar {
  width: 6px;
}
.notification-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b9b9b9;
}
.notification-container::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eeeeee;
}

.notification-container {
  position: relative;
  max-height: 350px;
  height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  .notification-entry:not(:last-child) {
    padding-bottom: 1rem;
    border-bottom: 1px solid #e4e3e3da;
  }
  .notification-entry:hover {
    background-color: #f4f5f5;
  }
  .notification-entry {
    position: relative;
    display: flex;
    padding: 1rem 1rem;
    max-width: 300px;
    width: 300px;
    .n-closeBtn {
      position: absolute;
      right: 4px;
      top: 3px;
    }
    .n-avatar {
      margin-right: 1rem;
    }
    .n-content {
      display: flex;
      flex-direction: column;
      .n-title {
        font-weight: 600;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .n-text {
        padding: 5px 0 5px 0;
        font-size: 13px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }
      .n-time {
        font-size: 12px;
        color: #a1a1a1;
      }
    }
  }
}
.message-pop {
  position: absolute;
  .message-pop-title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .message-tool {
    display: flex;
    justify-content: space-between;
  }
}
.badge {
  user-select: none;
  position: relative;
}

.message {
  stroke: #8a919f;
  transition: all 0.2s;
}

.message:hover {
  // fill: #e9e9e9;
  stroke: #2e2e2e;
  transition: all 0.15s;
}
.level-info {
  margin: 15px 5px 0 0;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  .bold {
    font-weight: 600;
  }
  .level-tip {
    color: #3b85c2;
  }
  .level-process {
    color: #3b85c2;
  }
}
.user-level {
  width: 100%;
}
.user-coin {
  font-size: 13px;
}
.user-name {
  font-size: 18px;
}
.user-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.user-avatar {
  margin-right: 15px;
}
.user-info {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-register {
  position: relative;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
}
.home-avatar {
  height: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
}
.hide {
  overflow: hidden;
  width: 0 !important;
  padding: 0;
}
.search-release {
  width: 5rem;
  transition: width 0.05s;
}
.home-search {
  position: relative;
  .home-search-input {
    width: 60%;
    margin-right: 8px;
    transition: width 0.1s;
  }
  .search-active {
    width: 100%;
    margin-right: 0;
    transition: width 0.25s;
  }
  width: 45vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.home-tool {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}
.home-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  flex-direction: row-reverse;
  height: 100%;
  margin: 0;
}
.arco-col {
  height: 100%;
}
.grid-top {
  height: 100%;
}
.top-container {
  position: relative;
  height: 100%;
  padding: 0 15px;
}
.home-img {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.header-breakPoint {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 1rem;
}
.container {
  position: relative;
  height: 100%;
}
.content {
  margin-top: 75px;
  background-color: #f4f5f5;
}
.header {
  height: 75px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
  right: 0;
}
</style>
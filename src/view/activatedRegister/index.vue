!<template>
  <div class="activated-container">
    <div v-if="activeStatus==='-1'">
      <a-result title="发生了一点错误">
        <template #icon>
          <icon-face-frown-fill style="color:#f75f5e" class="active-icon" />
        </template>
        <template #subtitle>验证请求出现了问题，请稍后再试</template>

        <template #extra>
          <a-space>
            <a-button type="dashed" da status="danger" @click="backHome">返回首页</a-button>
          </a-space>
        </template>
      </a-result>
    </div>
    <a-result v-if="activeStatus === '0' || activeStatus === '1'">
      <template #icon>
        <icon-lock v-if="activeStatus === '0'" class="active-icon" />
        <icon-unlock v-else class="active-icon" />
      </template>
      <template #title>
        <div v-if="activeStatus === '0'" class="active-title">{{activeStatus_unactivated_title}}</div>
        <div v-else class="active-title">您的账号已经激活，请登录猿趣阁体验更多功能吧~</div>
      </template>
      <template #subtitle>
        <div>
          <div v-if="activeStatus === '0'">{{activeStatus_unactivated_tip}}</div>
        </div>
      </template>
      <template #extra>
        <a-space v-if="activeStatus === '0'">
          <a-button
            type="primary"
            @click="hanldeActivated(activeParam)"
            :loading="activatedBtnLoading"
          >点击激活</a-button>
        </a-space>
        <a-space v-else-if="activeStatus === '1'">
          <a-button type="primary" @click="backHome">返回首页</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script>
import { checkRegStatus } from "@/api/checkRegStatus";
import { acoountActivated } from "@/api/acoountActivated";
import {
  IconLock,
  IconUnlock,
  IconFaceFrownFill
} from "@arco-design/web-vue/es/icon";
import { ref, reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { userStore } from "@/store/userStore";
export default {
  components: {
    IconLock,
    IconUnlock,
    IconFaceFrownFill
  },
  setup(props) {
    const userInfo = userStore();
    return {
      activeStatus: ref("-110"),
      activeParam: ref({}),
      accountActivated: ref(false),
      activeStatus_unactivated_title: ref("激活您的猿趣阁账号"),
      activeStatus_unactivated_tip: ref("点击下方按钮来激活您已经注册的新账号"),
      activatedBtnLoading: ref(false),
      userInfo
    };
  },

  data() {
    return {};
  },
  created() {
    this.checkActived();
  },

  mounted() {},

  methods: {
    backHome() {
      this.$router.replace("/home");
    },
    hanldeActivated(v) {
      // this.activatedBtnLoading = true
      const res = acoountActivated(v);
      const that = this;
      res
        .then(response => {
          //这里是请求成功后的操作
          const result = response.data;
          if (result.code === 60010) {
            that.activeStatus_unactivated_tip =
              "您的激活链接已经超过了有效期，系统已经向您的邮箱再次发送了新的激活链接，请您前往查看";
            Message.warning(
              "链接已经失效，请重新前往您的邮箱查看最新的激活链接"
            );
          } else if (result.code === 60020) {
            that.activeStatus = "1";
            that.userInfo.username = result.data.userName;
            that.userInfo.usercoin = result.data.integral;
            that.userInfo.userId = result.data.userId;
            that.userInfo.userAvatarUrl = result.data.userAvatarUrl;
            sessionStorage.setItem("login_token", result.data.token);
            Message.success("账号激活成功，3s后页面将自动跳转");
            setTimeout(() => {
              that.userInfo.loginStatus = true;
              localStorage.setItem("user", JSON.stringify(that.userInfo));
              that.backHome();
            }, 3000);
          }
          console.log(result);
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
    checkActived() {
      this.activeParam = this.$route.params;
      if (this.activeParam.userId !== "") {
        const res = checkRegStatus(this.activeParam.userId);
        const that = this;
        res
          .then(response => {
            //这里是请求成功后的操作
            const result = response.data;
            if (result.code === 100) {
              if (result.data.activated) {
                that.activeStatus = "1";
              } else {
                that.activeStatus = "0";
              }
            } else {
              that.activeStatus = "-1";
            }
            console.log(result);
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
      }
      console.log(this.activeParam);
    },
    activated() {}
  }
};
</script>

<style lang="less" scoped>
/deep/.arco-result-icon-tip {
  background-color: transparent;
  width: 72px;
  height: 72px;
}
.activated-container {
  .active-icon {
    font-size: 64px;
  }
  .active-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
}
</style>
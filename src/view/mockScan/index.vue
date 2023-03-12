!<template>
  <div class="container">
    <div class="mockIcon">
      <svg
        t="1673438216820"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3145"
        width="200"
        height="200"
      >
        <path
          d="M967.301 71.653H56.699C25.388 71.653 0.006 97.035 0.006 128.346v623.623c0 31.311 25.382 56.692 56.693 56.692H308.76v107.473H170.508c-23.482 0-42.52 19.037-42.52 42.52 0 23.483 19.037 42.52 42.52 42.52h682.984c23.482 0 42.52-19.036 42.52-42.52 0-23.482-19.037-42.52-42.52-42.52H715.24V808.661h252.061c31.311 0 56.693-25.382 56.693-56.692V128.346c0-31.31-25.383-56.693-56.693-56.693z m-3.307 677.008H60.006V131.653h903.988v617.008z"
          fill="#515151"
          p-id="3146"
        />
        <path d="M157.669 227.559h708.662v425.197H157.669z" fill="#515151" p-id="3147" />
      </svg>
    </div>
    <div class="mockTip">猿趣阁网页扫码登录确认</div>
    <div class="mockInfo">
      <div>
        <icon-location />
        <span class="infoText">四川成都</span>
      </div>
      <div>
        <icon-desktop />
        <span class="infoText">Windows11</span>
      </div>
      <div>
        <icon-compass />
        <span class="infoText">chrome100</span>
      </div>
    </div>
    <div class="mockLogin">
      <a-button type="primary" long @click="handleLogin">确认登录</a-button>
      <a-button type="text" long @click="mockCancle">取消</a-button>
    </div>
  </div>
</template>

<script>
import {
  IconDesktop,
  IconLocation,
  IconCompass
} from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
import { confirmScan } from "@/api/confirmScan";
export default {
  name: "ItYqgIndex",
  components: {
    IconDesktop,
    IconLocation,
    IconCompass
  },
  data() {
    return {};
  },
  created() {
    this._confirmScan();
  },

  mounted() {},

  methods: {
    handleLogin(){
      
    },
    _confirmScan() {
      console.log(this.$route.query.uid);
      const that = this;
      const res = confirmScan({
        uid: this.$route.query.uid,
        userId: "10001"
      });
      res
        .then(response => {
          //这里是请求成功后的操作
          console.log(response);
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
    mockCancle() {
      if (
        navigator.userAgent.indexOf("Firefox") != -1 ||
        navigator.userAgent.indexOf("Chrome") != -1
      ) {
        window.location.href = "about:blank";
        window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    }
  }
};
</script>

<style>
body {
  background-color: #fafafa;
}
</style>

<style lang="less" scoped>
.container {
  height: 380px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .mockInfo {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    .infoText {
      font-size: 12px;
    }
  }
  .mockTip {
    color: rgb(94, 94, 94);
    font-size: 16px;
    margin: 0 0 2rem 0;
  }
  .mockIcon {
    margin: 10rem 0 1rem 0;
  }
  .mockLogin {
    width: 220px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 3rem 0 1rem 0;
  }
}
</style>
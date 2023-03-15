!<template>
  <div class="editor-container">
    <a-layout style="height: 100%">
      <a-layout-header>
        <div class="editor-top">
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
            <a-col
              class="tip"
              :xs="14"
              :sm="14"
              :md="14"
              :lg="10"
              :xl="10"
              :xxl="10"
            >
              <div class="top-tip">
                <div class="divide-line"></div>
                <span class="top-tip-t">写文章</span>
                <span class="top-tip-time">
                  <!-- <span><icon-check-circle :size="20" /></span> -->
                  <span><icon-clock-circle :size="20" /></span>
                  {{ saveTime }}</span
                >
              </div>
            </a-col>
            <a-col
              class="user"
              :xs="8"
              :sm="8"
              :md="6"
              :lg="10"
              :xl="10"
              :xxl="10"
            >
              <div class="user-tip">
                <a-popover
                  content-class="img-pop"
                  position="bottom"
                  trigger="click"
                  popup-container=".user-tip"
                >
                  <a-avatar
                    :style="{ backgroundColor: '#3370ff', cursor: 'pointer' }"
                    :imageUrl="userInfo.userAvatarUrl"
                  >
                    <IconUser />
                  </a-avatar>
                  <template #content>
                    <a-space direction="vertical" fill>
                      <a-button size="small" long>
                        <template #icon>
                          <icon-archive />
                        </template>
                        草稿箱</a-button
                      >
                      <a-button size="small" long>
                        <template #icon>
                          <icon-user />
                        </template>
                        个人中心</a-button
                      >
                      <a-button size="small" long>
                        <template #icon> <icon-poweroff /> </template
                        >退出登录</a-button
                      >
                    </a-space>
                  </template>
                </a-popover>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-layout-header>
      <a-layout-content ref="eContainer" class="content-container">
        <div class="container">
          <div class="text-container">
            <a-textarea
              v-model:model-value="textaeraTitle"
              class="top-title"
              :max-length="100"
              placeholder="请输入标题"
              :auto-size="{ minRows: 1, maxRows: 3 }"
              @input="textareaKeydown"
              @keydown="changeTitle"
              show-word-limit
            />
          </div>
          <vue3-tinymce
            v-model="state.content"
            :setting="state.setting"
            script-src="/public/tinymce/tinymce.min.js"
          />
        </div>
        <div class="editor-footer">
          <div class="footer-container">
            <div class="footer-left">
              <div class="back-top">
                <span style="margin-right: 5px" @click="backTop">回到顶部</span
                ><icon-up />
              </div>
              <div>字数：{{ eDataNumber }}</div>
            </div>
            <div>
              <a-button
                class="user-actions"
                @click="previewText"
                :disabled="state.content === ''"
              >
                预览
              </a-button>
              <a-button class="user-actions" type="primary"> 发布 </a-button>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal
      v-model:visible="previewVisible"
      :mask-closable="false"
      :closable="false"
      width="80%"
      hide-cancel
    >
      <template #title> <span style="font-size:20px;">文章预览</span> </template>
      <div v-html="eDataHTML" class="preview-container">
      </div>
    </a-modal>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { userStore } from "@/store/userStore";
import { Decrypt, Encrypt } from "@/utils/encryptUtils";
import {
  IconUser,
  IconPoweroff,
  IconArchive,
  IconClockCircle,
  IconSave,
  IconCheckCircle,
  IconUp,
} from "@arco-design/web-vue/es/icon";
import Vue3Tinymce from "@jsdawn/vue3-tinymce";
export default {
  name: "editor",
  components: {
    Vue3Tinymce,
    IconUser,
    IconPoweroff,
    IconArchive,
    IconClockCircle,
    IconSave,
    IconCheckCircle,
    IconUp,
  },
  setup(props) {
    const draft_key =
      "U2FsdGVkX185BUw0zuGswh3bIZhVU2FFSeuW/mk0w3f4ZMCPvyy7CzYtt8OFkoSW";
    const userInfo = userStore();
    let timer = ref(null);
    const saveTime = ref("");
    const eDataNumber = ref(0);
    //获取当前时间
    const getNowFormatDate = () => {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let strMin = date.getMinutes();
      let strSec = date.getSeconds();
      let strHour = date.getHours();
      if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour;
      }
      if (strSec >= 0 && strSec <= 9) {
        strSec = "0" + strSec;
      }
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (strMin >= 0 && strMin <= 9) {
        strMin = "0" + strMin;
      }
      let currentdate =
        // date.getFullYear() +
        // seperator1 +
        // month +
        // seperator1 +
        // strDate +
        // " " +
        strHour + seperator2 + strMin + seperator2 + strSec;
      return currentdate;
    };
    const previewVisible = ref(false);
    const updateChangeTime = () => {
      saveTime.value = "草稿保存中...";
    };
    const e_languages = reactive([
      { text: "HTML/XML", value: "markup" },
      { text: "JavaScript", value: "javascript" },
      { text: "CSS", value: "css" },
      { text: "PHP", value: "php" },
      { text: "Ruby", value: "ruby" },
      { text: "Python", value: "python" },
      { text: "Java", value: "java" },
      { text: "C", value: "c" },
      { text: "C#", value: "csharp" },
      { text: "C++", value: "cpp" },
    ]);
    const state = reactive({
      content: "",
      // editor 配置项
      setting: {
        placeholder: "输入内容",
        language: "zh-Hans",
        language_url: "/public/tinymce/langs/zh-Hans.js",
        branding: false,
        elementpath: false,
        menubar: false,
        statusbar: false,
        // toolbar_sticky: true,
        toolbar_sticky_offset: 145,
        min_height: 400,
        autoresize_bottom_margin: 50,
        toolbar:
          "bold italic underline h1 h2 h3 hr aligncenter alignjustify alignleft indent forecolor backcolor | blockquote codesample numlist bullist link image | removeformat pastetext",
        plugins: "codesample link image table lists autoresize",
        toolbar_mode: "floating",
        codesample_languages: e_languages,
        default_link_target: "_blank",
        toolbar_mode: "sliding",
        nonbreaking_force_tab: true,
        link_title: false,
        link_default_target: "_blank",
        content_style: "body{font-size: 16px}",
        // 自定义 图片上传模块
        custom_images_upload: true,
        images_upload_url: "your_upload_api_url...",
        custom_images_upload_callback: (res) => {
          res.url;
        },
        custom_images_upload_param: { id: "xxxx01", age: 18 },
        init_instance_callback: (editor) => {
          editor.on("keyup", (e) => {
            updateChangeTime();
            //替换字符串里的换行符
            eDataNumber.value = tinyMCE.activeEditor
              .getContent({ format: "text" })
              .replace(/\n/g, "").length;
            let content = tinyMCE.activeEditor.getContent();
            let lastKeyupTime = e.timeStamp;
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
              if (lastKeyupTime - e.timeStamp == 0) {
                const encrypt_content = Encrypt(content);
                const time = getNowFormatDate();
                saveTime.value = "最近保存 " + time;
                localStorage.setItem("draft_saveData", encrypt_content);
                localStorage.setItem("draft_saveTime", time);
                console.log("保存成功");
              }
            }, 3000);
          });
          editor.on("paste", (e) => {
            eDataNumber.value = tinyMCE.activeEditor
              .getContent({ format: "text" })
              .replace(/\n/g, "").length;
            updateChangeTime();
            let content = tinyMCE.activeEditor.getContent();
            let lastKeyupTime = e.timeStamp;
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
              if (lastKeyupTime - e.timeStamp == 0) {
                const encrypt_content = Encrypt(content);
                const time = getNowFormatDate();
                saveTime.value = "最近保存 " + time;
                localStorage.setItem("draft_saveData", encrypt_content);
                localStorage.setItem("draft_saveTime", time);
                console.log("保存成功");
              }
            }, 3000);
          });
        },
      },
    });
    return {
      userInfo,
      state,
      eData: ref(""),
      eDataHTML: ref(""),
      eDataNumber,
      textaeraTitle: ref(""), // 标题
      saveTime, // 保存时间
      draft_key,
      timer,
      previewVisible,
      getNowFormatDate,
      updateChangeTime,
    };
  },
  data() {
    return {};
  },

  mounted() {
    this.saveTime = "上次保存 " + this.getNowFormatDate();
  },

  methods: {
    previewText() {
      // tinymce.activeEditor.execCommand("mcePreview");
      this.previewVisible = true;
      this.eDataHTML = tinyMCE.activeEditor.getContent();
    },
    textareaKeydown(v,e) {
      this.updateChangeTime();
            //替换字符串里的换行符
            this.eDataNumber = tinyMCE.activeEditor
              .getContent({ format: "text" })
              .replace(/\n/g, "").length;
            let lastKeyupTime = e.timeStamp;
            if (this.timer) {
              clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
              if (lastKeyupTime - e.timeStamp == 0) {
                const encrypt_content = Encrypt(this.textaeraTitle);
                const time = this.getNowFormatDate();
                localStorage.setItem("draft_saveTime", time);
                localStorage.setItem("draft_saveTitle", encrypt_content);
                this.saveTime = "最近保存 " + time;
                console.log("保存标题成功");
              }
            }, 3000);
    },
    changeTitle(e) {
      // this.$refs.textaeraDiv.innerHTML = this.textaeraData
      // console.log(this.$refs.textaeraDiv.innerHTML);
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    },
    backTop() {
      const q = document.querySelector(".content-container");
      // if (q.scrollTop === 0) return;
      // let timer = setInterval(() => {
      //   let ispeed = Math.floor(-q.scrollTop / 20);
      //   q.scrollTop = q.scrollTop + ispeed;
      //   if (q.scrollTop === 0) {
      //     clearInterval(timer);
      //   }
      // }, 5);
      q.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.arco-textarea-wrapper .arco-textarea-word-limit {
  bottom: 2px;
}
/deep/.tox .tox-editor-container {
  // align-items: center;
}
/deep/.tox .tox-sidebar-wrap {
  // width: 100%;
}
/deep/.tox:not(.tox-tinymce-inline) .tox-editor-header {
  box-shadow: none;
  // border-bottom: 1px solid rgb(243, 243, 243);
  position: fixed;
  top: 85px;
}
/deep/.tox-tinymce {
  border: none;
  border-bottom: 1px solid #d0d0d0;
  border-radius: 0;
}
/deep/.arco-textarea {
  background: #ffffff;
  font-size: 30px;
  font-weight: 600;
  min-height: 80px;
  border-bottom: 1px solid e8e8e8;
}
/deep/.arco-textarea-focus {
  border-color: transparent;
}
/deep/.arco-textarea-wrapper:hover {
  background-color: transparent;
}
/deep/.tox .tox-tbtn svg {
  fill: #3b3b3b !important;
}
.preview-container {
  height: 500px;
  overflow: auto;
}
.editor-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  .footer-container {
    color: #828282;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
    .footer-left {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.back-top {
  cursor: pointer;
  margin-right: 1rem;
}
.user-tip {
  position: relative;
  display: flex;
  align-items: center;
}
.user-actions:not(:last-child) {
  margin-right: 1rem;
}
.img-pop {
  padding: 0;
  width: 260px;
  font-size: 20px;
}
.divide-line {
  display: inline-block;
  min-width: 1px;
  max-width: 1px;
  height: 2em;
  margin: 0 12px;
  vertical-align: middle;
  border-left: 2px solid let(--color-neutral-3);
}
.top-title {
  border: none;
}
.preview-container::-webkit-scrollbar {
  width: 8px;
}
.preview-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #dddddd;
}
.preview-container::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eeeeeec0;
}
.preview-container::-webkit-scrollbar-thumb:hover {
  background: #cccccc;
}
.content-container::-webkit-scrollbar {
  width: 8px;
}
.content-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b9b9b9;
}
.content-container::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eeeeee;
}
.content-container {
  overflow: auto;
  background: #f6f6f6;
}
.container {
  overflow: auto;
  padding-left: calc(50% - 27.834rem);
  padding-right: calc(50% - 27.834rem);
  margin-top: 8rem;
  background: #f6f6f6;
}
.user {
  display: flex;
  justify-content: flex-end;
  padding-right: 5rem;
}
.grid-top {
  align-items: center;
}
.box {
  visibility: hidden;
  padding: 0;
  width: 99%;
  font-size: 2.667rem;
  font-weight: 700;
}
.text-container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
  border-bottom: 1px solid #e8e8e8;
}
.title {
  margin: 0;
  padding: 0;
  width: 99%;
  font-size: 2.667rem;
  font-weight: 700;
  color: #000;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
}
.home-img {
  text-align: center;
}
.divider {
  height: 100%;
}
.tip {
  padding-left: 2rem;
  height: 100%;
}
.top-tip {
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
  .top-tip-t {
    font-size: 20px;
    font-weight: 600;
    margin-right: 2rem;
  }
  .top-tip-time {
    font-size: 13px;
    color: rgb(161, 161, 161);
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
.editor-container {
  height: 100%;
}
.editor-top {
  height: 75px;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  z-index: 999;
  background: #ffffff;
}
</style>
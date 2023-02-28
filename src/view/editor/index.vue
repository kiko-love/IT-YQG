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
              :lg="14"
              :xl="14"
              :xxl="14"
            >
              <div class="top-tip">
                <div class="divide-line"></div>
                <span class="top-tip-t">写文章</span>
                <span class="top-tip-time">20点28分</span>
              </div>
            </a-col>
            <a-col
              class="user"
              :xs="8"
              :sm="8"
              :md="6"
              :lg="6"
              :xl="6"
              :xxl="6"
            >
              <div class="user-tip">
                <a-avatar
                  :style="{ backgroundColor: '#3370ff', cursor: 'pointer' }"
                  :imageUrl="userInfo.userAvatarUrl"
                >
                  <IconUser />
                </a-avatar>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-layout-header>
      <a-layout-content class="content-container">
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
              allow-clear
            />
          </div>
          <vue3-tinymce
            v-model="state.content"
            :setting="state.setting"
            script-src="/public/tinymce/tinymce.min.js"
          />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { userStore } from "@/store/userStore";
import { IconUser } from "@arco-design/web-vue/es/icon";
import Vue3Tinymce from "@jsdawn/vue3-tinymce";
export default {
  name: "editor",
  components: {
    Vue3Tinymce,
    IconUser,
  },
  setup(props) {
    const userInfo = userStore();
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
        min_height: 350,
        autoresize_bottom_margin: 50,
        toolbar:
          "preview bold italic underline h1 h2 h3 hr aligncenter alignjustify alignleft indent forecolor backcolor | blockquote codesample numlist bullist link image | removeformat pastetext",
        plugins:
          "codesample link image table lists autoresize autosave preview",
        toolbar_mode: "floating",
        codesample_languages: e_languages,
        default_link_target: "_blank",
        toolbar_mode: "sliding",
        nonbreaking_force_tab: true,
        link_title: false,
        link_default_target: "_blank",
        content_style: "body{font-size: 16px}",
        // 自定义 图片上传模式
        custom_images_upload: true,
        images_upload_url: "your_upload_api_url...",
        custom_images_upload_callback: (res) => {
          res.url;
        },
        custom_images_upload_param: { id: "xxxx01", age: 18 },
      },
    });
    return {
      userInfo,
      state,
      eData: ref(""),
      textaeraTitle: ref(""),
    };
  },
  data() {
    var _this = this;
    return {};
  },

  mounted() {},

  methods: {
    textareaKeydown(v) {},
    changeTitle(e) {
      // this.$refs.textaeraDiv.innerHTML = this.textaeraData
      // console.log(this.$refs.textaeraDiv.innerHTML);
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.arco-textarea-wrapper .arco-textarea-word-limit {
  bottom: 0px;
}
/deep/.tox .tox-editor-container {
  // align-items: center;
}
/deep/.tox .tox-sidebar-wrap {
  // width: 100%;
}
/deep/.tox:not(.tox-tinymce-inline) .tox-editor-header {
  box-shadow: none;
  border-bottom: 1px solid rgb(243, 243, 243);
  position: fixed;
  z-index: 999;
  top: 75px;
}
/deep/.tox-tinymce {
  border: none;
}
/deep/.arco-textarea {
  background: #ffffff;
  font-size: 36px;
  font-weight: 600;
  min-height: 80px;
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
.divide-line {
  display: inline-block;
  min-width: 1px;
  max-width: 1px;
  height: 2em;
  margin: 0 12px;
  vertical-align: middle;
  border-left: 2px solid var(--color-neutral-3);
}
.top-title {
  border: none;
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
}
.container {
  overflow: auto;
  padding-left: calc(50% - 27.834rem);
  padding-right: calc(50% - 27.834rem);
  margin-top: 10rem;
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
  margin-bottom: 1rem;
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
    margin-right: 1rem;
  }
  .top-tip-time {
    color: var(--color-neutral-6);
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
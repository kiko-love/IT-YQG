!<template>
  <div class="resource-container">
    <a-row>
      <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="5" :xxl="5">
        <div class="side-bar">
          <a-menu :default-selected-keys="['1']" :auto-open="true">
            <a-menu-item key="1">
              <template #icon>
                <icon-schedule :size="20" />
              </template>
              最新
            </a-menu-item>
            <a-menu-item key="2">
              <template #icon>
                <icon-fire :size="20" />
              </template>
              热门
            </a-menu-item>
            <a-sub-menu key="3">
              <template #icon><icon-bookmark :size="20" /></template>
              <template #title>推荐主题</template>
              <a-menu-item v-for="(i, k) in recommedTopic" :key="3 + i.id">
                {{ i.title }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="13" :xxl="13">
        <a-card class="r-list" :bordered="false">
          <div class="con-body">
            <a-textarea
              v-model:model-value="editor_content"
              placeholder="在这里和大家分享你的心得吧~"
              class="r-textarea"
              :max-length="1000"
              show-word-limit
              :auto-size="{
                minRows: 5,
                maxRows: 7,
              }"
            />
          </div>
          <div class="toolbar">
            <div class="tools">
              <div class="tool-item"><icon-link />链接</div>
              <div class="tool-item"><icon-tags />标签</div>
            </div>
            <div>
              <a-button type="primary" :disabled="editor_content === ''"
                >发布</a-button
              >
            </div>
          </div>

          <div class="r-container"></div>
        </a-card>
        <a-card v-if="cListLoading">
          <a-skeleton class="c-skeleton" :animation="true">
                  <a-space
                    direction="vertical"
                    :style="{ width: '100%' }"
                    size="large"
                  >
                  <a-skeleton-shape shape="circle" size="large" />
                    <a-skeleton-line
                      :rows="3"
                      :widths="['30%', [], '80%']"
                    />
                  </a-space>
                </a-skeleton>
        </a-card>
        <a-card v-if="!cListLoading" v-for="i in 3" class="c-item">
          <div class="c-header-row">
            <div class="user-group">
              <a-avatar class="user-avatar">
                <IconUser />
                <!-- <img v-else alt="avatar" :src="user.userAvatarUrl" /> -->
              </a-avatar>
              <div>
                <div class="user-title">ZYY</div>
                <div class="user-meta">1天前</div>
              </div>
            </div>
            <div class="user-action">action</div>
          </div>
          <div class="c-content-row">
            <a-typography-paragraph
              class="content-box"
              tooltip=""
              :ellipsis="{
                rows: 4,
                expandable: true,
                showTooltip: false,
              }"
            >
              欢迎来到猿趣阁，这是我的第一条心得分享，希望大家多多支持，我会继续努力的😊
            </a-typography-paragraph>
            <!-- <div class="content-box">
              欢迎来到猿趣阁，这是我的第一条心得分享，希望大家多多支持，我会继续努力的
              欢迎来到猿趣阁，这是我的第一条心得分享，希望大家多多支持，我会继续努力的
              欢迎来到猿趣阁，这是我的第一条心得分享，希望大家多多支持，我会继续努力的
              欢迎来到猿趣阁，这是我的第一条心得分享，希望大家多多支持，我会继续努力的
            </div> -->
          </div>
          <div class="c-action-row">
            <div class="action-box">
              <div class="action"><icon-thumb-up />9</div>
              <div class="action"><icon-message />9</div>
              <div class="action"><icon-star />9</div>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="6" :xxl="6">
        <div class="r-extra-container">
          <a-card :style="{ width: '100%' }">
            <template #title>
              <div>
                <span style="margin-left: 5px">热门心得</span>
              </div>
            </template>
            <div class="rank-container">
              <div class="rank-item" v-for="(i, index) in 3">
                <div class="rank-avatar"></div>
                <div class="rank-username">
                  <div class="rank-header">
                    <div class="rank-title">
                      猿趣阁精选话题：当代年轻人是否需要养生
                    </div>
                    <div class="rank-cover">
                      <a-avatar
                        :style="{ backgroundColor: '#3370ff' }"
                        :size="50"
                        shape="square"
                        >猿</a-avatar
                      >
                    </div>
                  </div>
                  <div class="description">
                    <div><icon-thumb-up :size="15" />99</div>
                    <div><icon-message :size="15" />256</div>
                  </div>
                </div>
              </div>
            </div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Icon } from "@arco-design/web-vue";
import {
  IconThumbUp,
  IconShareInternal,
  IconMore,
  IconUser,
  IconBarChart,
  IconSearch,
  IconStar,
  IconLink,
  IconTags,
  IconMessage,
  IconBookmark,
  IconSchedule,
  IconFire,
} from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";

const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_3869138_hlqdy8cckfp.js",
});

export default {
  setup(props) {
    const recommedTopic = reactive([
      {
        title: "技术交流",
        topic: "001",
        id: 1,
      },
      {
        title: "面试交流",
        topic: "002",
        id: 2,
      },
      {
        title: "闲聊一下",
        topic: "003",
        id: 3,
      },
      {
        title: "今日趣闻",
        topic: "004",
        id: 4,
      },
    ]);
    const editor_content = ref("");
    const cListLoading = ref(true);
    return {
      editor_content,
      recommedTopic,
      cListLoading,
    };
  },
  components: {
    IconFont,
    IconThumbUp,
    IconShareInternal,
    IconMore,
    IconUser,
    IconBarChart,
    IconSearch,
    IconStar,
    IconLink,
    IconTags,
    IconMessage,
    IconBookmark,
    IconSchedule,
    IconFire,
  },
  created() {
    setTimeout(() => {
      this.cListLoading = false;
    }, 2000);
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
<style lang="less" scoped>
.c-skeleton {
  padding: 10px 20px 0;
}
.c-item {
  padding: 10px 20px 0;
  margin-top: 20px;
  .c-action-row {
    margin-top: 10px;
    .action-box {
      margin-bottom: -12px;
      display: flex;
      position: relative;
      height: 36px;
      border-top: 1px solid #e4e6eb;
      .action {
        flex: 1 1 33.333%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100%;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &:hover {
          color: #3370ff;
          // background: #f5f5f5;
        }
      }
      .action svg {
        margin-right: 5px;
      }
    }
  }
  .c-content-row {
    margin: 8px 0 0 50px;
    .content-box {
      padding: 10px 20px;
      background: #f5f5f5;
      border-radius: 4px;
      white-space: pre-line;
    }
  }
  .c-header-row {
    display: flex;
    justify-content: space-between;
  }
  .user-group {
    display: flex;
    align-items: center;
    .user-avatar {
      margin-right: 10px;
      background: #3370ff;
      cursor: pointer;
      user-select: none;
    }
    .user-title {
      font-size: 16px;
    }
    .user-meta {
      color: #999;
      font-size: 12px;
    }
  }
}
.tool-item {
  cursor: pointer;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  margin: 2rem 2rem 0.5rem 2rem;
  .tools {
    display: flex;
    .tool-item svg {
      margin-right: 4px;
    }
    .tool-item {
      margin-right: 1.5rem;
      &:hover {
        color: #4080ff;
      }
    }
  }
}
.con-body {
  max-height: 180px;
  padding: 0 20px;
}
.icon-hover {
  .icon-hover-text {
    font-size: 12px;
    padding-left: 2px;
  }
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  // border-radius: 50%;
}
.list-tab {
  display: flex;
}
.resource-container {
  height: 100%;
  overflow: auto;
}

.rank-title {
  margin-bottom: 10px;
  padding-right: 10px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.rank-cover {
  width: 64px;
  height: 64px;
}
.rank-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.rank-lv {
  margin-left: 10px;
}
.rank-username {
  font-size: 14px;
  margin-left: 10px;
  .description {
    font-size: 12px;
    gap: 1rem;
    color: #909090;
    display: flex;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 190px;
  }
}
.rank-item {
  cursor: pointer;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}
.rank-item:hover {
  background-color: #fafafa;
}
.side-bar {
  width: 200px;
  background: #fff;
  padding: 10px 8px;
  margin: 0 1rem 0 2rem;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 99;
  position: fixed;
  top: 91px;
  max-height: calc(100% - 100px);
  overflow: auto;
}
.r-list {
  margin-top: 1rem;
  padding: 0.5rem 0;
  width: 100%;
  margin-bottom: 1rem;
}
.r-extra-container {
  position: fixed;
  width: 250px;
  padding: 1rem;
  display: flex;
  justify-content: center;
}
.r-container {
  width: 100%;
}
.r-card {
  width: 95%;
  margin-bottom: 1rem;
  border-radius: 5px;
  cursor: pointer;
}
.r-card-col {
  display: flex;
  justify-content: center;
}
.r-card-info {
  display: flex;
  flex-direction: column;
  .r-card-info-time {
    font-size: 12px;
    color: #797979;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    width: 100%;
  }
}
.r-card-a-a {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
}
.r-card-actions {
  display: flex;
  padding: 4px 10px;
  gap: 8px;
  margin-bottom: -2rem;
}
.r-card-avatar {
  padding: 0 8px;
  display: flex;
  align-items: center;
}
.r-card-description {
  text-align: center;
  color: #909090;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 100%;
  margin: 8px 0 0 0;
}
.r-card-title {
  text-align: center;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  width: 100%;
}
.r-cover {
  display: flex;
  align-items: center;
  justify-content: center;
}
.r-cover-img {
  height: 90px;
  width: 90px;
  -o-object-fit: contain;
  object-fit: contain;
}
</style>
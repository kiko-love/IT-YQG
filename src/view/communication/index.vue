<template>
  <div class="resource-container" ref="commentContainer" v-on:scroll="handleListScroll">
    <a-row>
      <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="5" :xxl="5">
        <div class="side-bar">
          <a-menu :default-selected-keys="typeKey" :auto-open="true" @menu-item-click="changeMenu">
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
              <template #title>推荐话题</template>
              <a-menu-item v-for="(i, k) in recommedTopic" :key="i.title">
                {{ i.title }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="13" :xxl="13">
        <div class="c-container">
          <a-card class="r-list" :bordered="false">
            <div class="con-body">
              <a-textarea v-model:model-value="editor_content" placeholder="在这里和大家分享你的心得吧~" class="r-textarea"
                :max-length="1000" show-word-limit :auto-size="{
                  minRows: 5,
                  maxRows: 7,
                }" />
            </div>
            <div class="link-container" v-if="linkInfo.title !== '' || getLinkLoading">
              <div class="link-warpper">
                <icon-close-circle-fill :size="20" class="link-clear" @click="clearLinkInfo" />
                <a-avatar class="link-favicon" :size="40"
                  :class="[{ 'blue-bg': !linkInfo.favicon }, { 'white-bg': linkInfo.favicon }]" shape="square"
                  :imageUrl="linkInfo.favicon">
                  <icon-link v-if="isEmpty(linkInfo.favico)" />
                </a-avatar>
                <div class="link-loading" v-if="getLinkLoading">
                  <div>
                    加载中...
                  </div>
                </div>
                <div v-else class="link-title">
                  <div class="main-title">{{ linkInfo.title }}</div>
                  <div class="sub-title">{{ linkInfo.subtitle }}</div>
                </div>
              </div>
            </div>
            <div class="toolbar">
              <div class="tools">
                <a-popover trigger="click" title="想要分享的话题" position="bl">
                  <div class="tool-item"><icon-tags />话题</div>
                  <template #content>
                    <a-select v-model="myTopic" :style="{ width: '260px', margin: '8px 0' }">
                      <a-option v-for="item of topicList" :value="item.title" :label="item.title" />
                    </a-select>
                  </template>
                </a-popover>
                <a-popover trigger="click" position="bl">
                  <div class="tool-item"><icon-link />链接</div>
                  <template #content>
                    <a-input v-model="linkInfo.url" :style="{ width: '260px', margin: '8px 0' }" placeholder="请输入链接"
                      allow-clear />
                    <div class="link-get-tip">
                      <div>自动获取链接标题和图标</div>
                      <a-button type="primary" size="mini" @click="getLinkInfo" :disabled="getLinkLoading">
                        <template #icon>
                          <icon-plus />
                        </template>
                      </a-button>
                    </div>

                  </template>
                </a-popover>
              </div>
              <div>
                <a-button type="primary" :disabled="editor_content === '' || addCommentLoading || getLinkLoading"
                  :loading="addCommentLoading" @click="addMyComment">发表心得</a-button>
              </div>
            </div>

            <div class="r-container"></div>
          </a-card>
          <a-card v-if="cListLoading">
            <a-skeleton class="c-skeleton" :animation="true">
              <a-space direction="vertical" :style="{ width: '100%' }" size="large">
                <a-skeleton-shape shape="circle" size="large" />
                <a-skeleton-line :rows="3" :widths="['30%', [], '80%']" />
              </a-space>
            </a-skeleton>
          </a-card>
          <a-card v-if="cList?.length === 0 && !cListLoading">
            <a-empty />
          </a-card>
          <a-card v-if="!cListLoading" v-for="(i, k) in cList" class="c-item">
            <div class="c-header-row">
              <div class="user-group">
                <a-avatar class="user-avatar" :image-url="i.user?.userAvatarUrl">
                  <IconUser />
                  <!-- <img v-else alt="avatar" :src="user.userAvatarUrl" /> -->
                </a-avatar>
                <div>
                  <div class="user-title">{{ i.user?.userName }}</div>
                  <div class="user-meta">{{ getDiff(i.createTime) }}</div>
                </div>
              </div>
              <div class="user-action" v-if="user.loginStatus && i.user.userId === user.userId">
                <a-popconfirm @ok="delMyComment(i.commentId)" popup-container="user-action" position="lb"
                  content="是否确认删除您的心得?">
                  <a-button type="text" shape="circle">
                    <template #icon>
                      <icon-delete :style="{ color: 'var(--color-neutral-6)' }" :size="16" />
                    </template>
                  </a-button>
                </a-popconfirm>
              </div>
            </div>
            <div class="c-content-row">
              <a-typography-paragraph class="content-box" tooltip="" :ellipsis="{
                rows: 4,
                expandable: true,
                showTooltip: false,
              }">
                {{ i.content }}
              </a-typography-paragraph>
              <div class="link-container" v-if="i.link !== null">
                <a :href="i.link?.url" target="_blank">
                  <div class="link-warpper-preview">
                    <a-avatar class="link-favicon" :size="40"
                      :class="[{ 'blue-bg': !i.link?.favicon }, { 'white-bg': i.link?.favicon }]" shape="square"
                      :imageUrl="i.link?.favicon">
                      <icon-link v-if="isEmpty(i.link?.favico)" />
                    </a-avatar>
                    <div class="link-title">
                      <div class="main-title">{{ i.link?.title }}</div>
                      <div class="sub-title">
                        <div class="link-info-sub"><icon-link />
                          <div>{{ i.link?.subtitle }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="c-topic-row">
              <div class="topic-box">
                <a-tag v-if="i.topic" class="topic-tag" color="arcoblue">
                  <template #icon>
                    <icon-bookmark />
                  </template>
                  {{ i.topic }}</a-tag>
              </div>
            </div>
            <div class="c-action-row">
              <div class="action-box">
                <div class="action" @click="likeComment(i.commentId)"><icon-thumb-up />{{ i.likeCount }}</div>
                <div class="action" :class="{ 'action-active': cList[k].isOpen }" @click="getReply(i.commentId, k)">
                  <icon-message />{{ i.commentCount }}
                </div>
                <div class="action"><icon-reply /></div>
              </div>
            </div>
            <div v-if="cList[k].isOpen" class="c-reply-row">
              <span class="c-replay-triangle">
                <em class="triangle"> </em>
              </span>
              <div class="reply-box">
                <div class="reply-content">
                  <a-avatar :style="{ backgroundColor: '#3370ff' }" class="reply-avatar" :size="36" shape="square">
                    <IconUser />
                    <!-- <img v-else alt="avatar" :src="user.userAvatarUrl" /> -->
                  </a-avatar>
                  <a-textarea v-model:model-value="i.replyContent" placeholder="输入评论回复（Enter换行）" :auto-size="{
                    minRows: 1,
                    maxRows: 7,
                  }" />
                </div>
                <div class="reply-action">
                  <a-button type="primary" :disabled="i.replyContent === ''"
                    @click="addReply(i.replyContent, i.commentId, k)">回复</a-button>
                </div>
              </div>
              <div v-if="i.commentCount > 0" class="reply-list-wrapper">
                <div class="reply-list-title">全部回复（{{ i.commentCount }}）</div>
                <div class="reply-list">
                  <div class="reply-skeleton" v-if="replyLoading">
                    <a-skeleton animation :style="{ width: '10%' }">
                      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
                        <a-skeleton-shape shape="circle" />
                      </a-space>
                    </a-skeleton>
                    <a-skeleton animation :style="{ width: '70%' }">
                      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
                        <a-skeleton-line :rows="2" :widths="['30%', '100%']" />
                      </a-space>
                    </a-skeleton>
                  </div>
                  <div v-else>
                    <div v-for="(item, index) in i.replyList" class="r-list-item" :key="index">
                      <a-avatar style="background: transparent" class="user-avatar" :image-url="item.user?.userAvatarUrl">
                        <IconUser />
                        <!-- <img v-else alt="avatar" :src="user.userAvatarUrl" /> -->
                      </a-avatar>
                      <div class="item-content-box">
                        <div class="user-box">
                          <div>{{ item.user?.userName }}</div>
                          <a-divider direction="vertical" />
                          <div class="user-time">{{ getDiff(item.createTime) }}</div>
                        </div>
                        <div class="r-content">{{ item.content }}</div>
                      </div>
                      <span class="reply-del" v-if="user.loginStatus && i.user.userId === user.userId">
                        <a-popconfirm @ok="delMyReply(item.commentId, i.commentId, k)" popup-container="user-action"
                          position="lb" content="是否确认删除您的回复?">
                          <a-button type="text" shape="circle">
                            <template #icon>
                              <icon-delete :style="{ color: 'var(--color-neutral-6)' }" :size="16" />
                            </template>
                          </a-button>
                        </a-popconfirm>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a-card>
        </div>
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
              <div class="rank-item" v-for="(i, index) in hotCommentList" :key="index">
                <div class="rank-avatar"></div>
                <div class="rank-username">
                  <div class="rank-header">
                    <div class="rank-title">
                      <a-tooltip :content="i.content" mini>
                        <div>
                          {{ i.content }}
                        </div>
                      </a-tooltip>

                    </div>
                    <div class="rank-cover">
                      <a-avatar :style="{ backgroundColor: '#3370ff' }" :size="50" shape="square">
                        {{ i.content.slice(0, 1) }}
                      </a-avatar>
                    </div>
                  </div>
                  <div class="description">
                    <div><icon-thumb-up :size="15" />{{ i.likeCount }}</div>
                    <div><icon-message :size="15" />{{ i.commentCount }}</div>
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
import { Icon, Message } from "@arco-design/web-vue";
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
  IconMoreVertical,
  IconFire,
  IconReply,
  IconPlus,
  IconCloseCircleFill,
  IconDelete,
} from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";
import TimeUtils from '@/utils/timeUtils'
import {
  getCommentList,
  addComment,
  getTopicList,
  deleteComment,
  getHotCommentList,
  getCommentListByTopic,
  addCommentLike,
  getCommentReplyList,
  addCommentReply,
  deleteReply,
} from '@/api/commentApi'
import { getRandomElementsFromArray } from '@/utils/ArrayUtils'
const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_3869138_hlqdy8cckfp.js",
});
import { userStore } from "@/store/userStore";
export default {
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
    IconMoreVertical,
    IconReply,
    IconPlus,
    IconCloseCircleFill,
    IconDelete,
  },
  setup(props) {
    const linkInfo = reactive({
      url: '',
      title: '',
      subtitle: '',
      favicon: '',
    });
    const user = userStore()
    const cList = ref([])
    const moreCommentList = ref([])
    const pageNum = ref(1)
    const pageSize = ref(5)
    const hotCommentList = ref([])
    const topicList = ref([])
    const replyListLoading = ref(false)
    const addCommentLoading = ref(false)
    const recommedTopic = ref([])
    const typeKey = ref(['1'])
    const editor_content = ref("");
    const editor_reply = ref("");
    const cListLoading = ref(true);
    const getLinkLoading = ref(false);
    const myTopic = ref('')
    const replyLoading = ref(false)
    const getDiff = (timestamp) => {
      return TimeUtils.getTimeDiff(timestamp);
    }
    const getList = async () => {
      const res = await getCommentList(pageNum.value, pageSize.value);
      if (res.data.code === 100) {
        cList.value = res.data.data;
        cList.value.forEach(item => {
          item.replyList = []
          item.replyContent = ''
          item.isOpen = false;
          try {
            item.link = item.link ? JSON.parse(item.link) : null;
          } catch {
            item.link = null;
          }
        })
      } else {
        cList.value = []
      }
    }
    const getTopicCommentList = async (topic) => {
      const res = await getCommentListByTopic(topic);
      if (res.data.code === 100) {
        cList.value = res.data.data;
        cList.value.forEach(item => {
          item.isOpen = false;
          item.link = item.link ? JSON.parse(item.link) : null;
        })
      } else {
        cList.value = []
      }
    }
    const getHotComment = async () => {
      const res = await getHotCommentList(pageNum.value, pageSize.value)
      if (res.data.code === 100) {
        cList.value = res.data.data ? res.data.data : [];
        cList.value.forEach(item => {
          item.isOpen = false;
          item.link = item.link ? JSON.parse(item.link) : null;
        })
      } else {
        cList.value = []
      }
    }
    const clearLinkInfo = () => {
      Object.keys(linkInfo).forEach(key => {
        linkInfo[key] = '';
      });
    }

    const refreshReply = async (cid, k) => {
      const v = {
        parentId: cid,
        pageNum: 1,
        pageSize: 3
      }
      const res = await getCommentReplyList(v)
      if (res.data.code === 100) {
        cList.value[k].replyList = res.data.data.list
        cList.value[k].commentCount = res.data.data.total
      } else {
        cList.value[k].replyList = []
      }
    }
    const getTopic = async () => {
      const res = await getTopicList()
      if (res.data.code === 100) {
        topicList.value = res.data.data
        myTopic.value = topicList.value[0].title
        recommedTopic.value = getRandomElementsFromArray(topicList.value, 4)
      }
    }
    const addMyComment = async () => {
      if (user.loginStatus === false) {
        Message.error('您还没有登录')
        return
      }
      addCommentLoading.value = true
      let v = {
        articleId: '0',
        userId: user.userId,
        content: editor_content.value,
        parentId: '0',
        topic: myTopic.value,
        link: linkInfo.url ? JSON.stringify(linkInfo) : null,
      }
      const res = await addComment(v)
      if (res.data.code === 100) {
        Message.success('发表心得成功')
        editor_content.value = ''
        myTopic.value = topicList.value[0].title
        clearLinkInfo()
        getList()
      } else {
        Message.error('发表心得失败')
      }
      addCommentLoading.value = false
    }
    const delMyComment = async (cid) => {
      const res = await deleteComment(cid)
      if (res.data.code === 100) {
        Message.success('删除成功')
        getList()
      } else {
        Message.error('删除失败')
      }
    }
    const delMyReply = async (cid, pid, k) => {
      const res = await deleteReply(cid, pid)
      if (res.data.code === 100) {
        Message.success('删除回复成功')
        refreshReply(pid, k)
      } else {
        Message.error('删除回复失败')
      }
    }
    const getReply = async (cid, k) => {
      cList.value[k].isOpen = !cList.value[k].isOpen
      if (cList.value[k].commentCount <= 0) {
        return
      }
      if (cList.value[k].isOpen) {
        replyLoading.value = true
        const v = {
          parentId: cid,
          pageNum: 1,
          pageSize: 3
        }
        const res = await getCommentReplyList(v)
        if (res.data.code === 100) {
          cList.value[k].replyList = res.data.data.list
          cList.value[k].commentCount = res.data.data.total
        } else {
          cList.value[k].replyList = []
        }
      } else {
        replyLoading.value = true
      }
      setTimeout(() => {
        replyLoading.value = false
      }, 500);
    }

    const changeMenu = (key) => {
      typeKey.value[0] = key
      console.log(typeKey.value[0]);
      pageNum.value = 1
      cListLoading.value = true
      if (key === '1') {
        getList()
      } else if (key === '2') {
        getHotComment()
      } else {
        getTopicCommentList(key)
      }
      setTimeout(() => {
        cListLoading.value = false
      }, 500);
    }
    const getHotComments = async () => {
      const res = await getHotCommentList(pageNum.value, 3)
      if (res.data.code === 100) {
        hotCommentList.value = res.data.data ? res.data.data : [];
      } else {
        hotCommentList.value = []
      }
    }
    const likeComment = async (cid) => {
      if (user.loginStatus === false) {
        Message.error('请先登录后再操作')
        return
      }
      const v = {
        commentId: cid,
        userId: user.userId
      }
      const res = await addCommentLike(v)
      if (res.data.code === 100) {
        Message.success('点赞成功')
        getList()
      } else {
        Message.error('点赞失败')
      }
    }
    const addReply = async (replyContent, pid, k) => {
      const v = {
        parentId: pid,
        content: replyContent,
        userId: user.userId ? user.userId : null
      }
      const res = await addCommentReply(v)
      if (res.data.code === 100) {
        Message.success("回复成功")
        refreshReply(pid, k)
      } else {
        Message.error("回复失败")
      }
    }
    return {
      editor_content,
      editor_reply,
      recommedTopic,
      cListLoading,
      cList,
      linkInfo,
      clearLinkInfo,
      getLinkLoading,
      getDiff,
      getList,
      myTopic,
      user,
      addMyComment,
      topicList,
      getTopic,
      addCommentLoading,
      getReply,
      delMyComment,
      replyListLoading,
      getHotComment,
      changeMenu,
      moreCommentList,
      pageNum,
      pageSize,
      typeKey,
      getHotComments,
      hotCommentList,
      likeComment,
      addReply,
      delMyReply,
      refreshReply,
      replyLoading,
    };
  },
  created() {
    Promise.all([this.getList(), this.getTopic(), this.getHotComments()]).then(() => {
      setTimeout(() => {
        if (this.cListLoading) {
          this.cListLoading = false;
        }
      }, 1000);
    });

  },
  data() {
    return {};
  },

  mounted() { },

  methods: {
    handleListScroll(e) {
      // 获取滚动容器的高度、滚动高度和内容高度
      const scrollContainer = this.$refs.commentContainer;
      const { scrollTop, offsetHeight, scrollHeight } = scrollContainer;
      // 如果滚动到了底部，执行加载更多数据的操作
      if (scrollTop + offsetHeight >= scrollHeight - 1) {
        if (this.typeKey[0] === '1') {
          this.loadMoreComment();
          console.log('loadMoreComment');
        }
        else if (this.typeKey[0] === '2') {
          this.loadMoreHotComment();
          console.log('loadMoreHotComment');
        }
        else {
          this.loadMoreTopicComment();
          console.log('loadMoreTopicComment');
        }


      }
    },
    async loadMoreTopicComment() {
      this.pageNum++;
      const res = await getCommentListByTopic(this.typeKey, this.pageNum, this.pageSize)
      if (res.data.code === 100) {
        this.moreCommentList = res.data.data ? res.data.data : [];
        this.moreCommentList.forEach(item => {
          item.isOpen = false;
          item.link = item.link ? JSON.parse(item.link) : null;
        })
      } else {
        this.moreCommentList = []
        this.pageNum--;
      }
      this.cList.push(...this.moreCommentList)
    },
    async loadMoreHotComment() {
      this.pageNum++;
      const res = await getHotCommentList(this.pageNum, this.pageSize)
      if (res.data.code === 100) {
        this.moreCommentList = res.data.data ? res.data.data : [];
        this.moreCommentList.forEach(item => {
          item.isOpen = false;
          item.link = item.link ? JSON.parse(item.link) : null;
        })
      } else {
        this.moreCommentList = []
        this.pageNum--;
      }
      this.cList.push(...this.moreCommentList)
    },
    async loadMoreComment() {
      this.pageNum++;
      const res = await getCommentList(this.pageNum, this.pageSize)
      if (res.data.code === 100) {
        this.moreCommentList = res.data.data ? res.data.data : [];
        this.moreCommentList.forEach(item => {
          item.isOpen = false;
          item.link = item.link ? JSON.parse(item.link) : null;
        })
      } else {
        this.moreCommentList = []
        this.pageNum--;
      }
      this.cList.push(...this.moreCommentList)
    },
    isEmpty: (obj) => {
      if (obj === null) return true;
      if (obj === undefined || obj === '') return true;
      if (obj.length && obj.length > 0) return false;
      if (obj.length === 0) return true;
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }
      return true;
    },
    getLinkInfo() {
      const link = this.linkInfo;
      link.favicon = '';
      const that = this
      const urlRegex = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
      if (urlRegex.test(link.url)) {
        that.getLinkLoading = true;
        this.scrapeLink(link.url)
          .then(result => {
            link.title = result.title;
            link.favicon = result.favicon;
            link.subtitle = result.domain;
            that.getLinkLoading = false;
            Message.success("获取链接信息成功");
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        Message.warning("请输入正确的链接");
      }

    },
    async scrapeLink(url) {
      const response = await fetch(`http://localhost:1458/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data.contents, 'text/html');
      const title = htmlDoc.querySelector('title')?.textContent;
      let domain;
      try {
        domain = new URL(url).hostname;
      } catch (error) {
        console.error(error);
      }
      let favicon;
      const linkTags = htmlDoc.getElementsByTagName('link');
      for (let i = 0; i < linkTags.length; i++) {
        if (linkTags[i].getAttribute('rel') === 'shortcut icon' || linkTags[i].getAttribute('rel') === 'icon') {
          favicon = linkTags[i].getAttribute('href');
          break;
        }
      }
      if (favicon) {
        if (favicon.startsWith('//')) {
          favicon = `https:${favicon}`;
        } else if (favicon.startsWith('/')) {
          favicon = `https://${domain}${favicon}`;
        } else if (!favicon.startsWith('http')) {
          favicon = `https://${domain}/${favicon}`;
        }
      }
      return {
        title: title,
        domain: domain,
        favicon: favicon
      };
    }
  },
};
</script>
<style lang="less" scoped>
.loading-skeleton {
  padding: 10px 15px;
}

.user-action {
  position: relative;
}

.blue-bg {
  background: #3370ff;
}

.white-bg {
  background: transparent;
}

.link-container {
  a {
    text-decoration: none;
  }

  .link-warpper {
    position: relative;
    display: flex;
    margin: 1rem 1.5rem;
    padding: 1rem;
    border-radius: 5px;
    background-color: var(--color-neutral-2);

    .link-loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .link-clear {
      position: absolute;
      cursor: pointer;
      right: -3px;
      top: -5px;

    }

    .link-favicon {
      margin-right: 1rem;
      cursor: default;
    }

    .link-title {
      display: flex;
      flex-direction: column;

      .main-title {
        font-size: 16px;
        color: var(--color-neutral-10);
        max-height: 40px;
        font-weight: 500;
        line-height: 1.25;
        color: #121212;
        margin: 0 0 5px;
        letter-spacing: 0.2px;
        word-break: break-all;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      .sub-title {
        font-size: 13px;
        color: var(--color-neutral-6);
        display: -webkit-box;
        font-size: 13px;
        margin: 0;
        line-height: 1.3;
        overflow: hidden;
        word-break: break-word;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }

  .link-info-sub {
    display: flex;
    align-items: flex-end;
    gap: 5px;
  }

  .link-warpper-preview {
    position: relative;
    display: flex;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 5px;
    background-color: var(--color-neutral-2);

    .link-loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .link-clear {
      position: absolute;
      cursor: pointer;
      right: -3px;
      top: -5px;

    }

    .link-favicon {
      margin-right: 1rem;
      cursor: default;
    }

    .link-title {
      display: flex;
      flex-direction: column;

      .main-title {
        font-size: 14px;
        margin-bottom: 5px;
        color: var(--color-neutral-10);
      }

      .sub-title {
        font-size: 13px;
        color: var(--color-neutral-6);
      }
    }
  }

}

.link-get-tip {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--color-neutral-8);
  padding: 6px;
}

.reply-list:not(:last-child) {
  border-bottom: 1px solid #e3e3e3;
}

.reply-list {
  position: relative;

  .reply-skeleton {
    padding: 10px 15px;
    display: flex;
    width: 100%;
  }

  .r-list-item:not(:last-child) {
    border-bottom: 1px solid #f0f1f5;
  }

  .r-list-item {
    display: flex;
    padding: 10px 15px;
    position: relative;

    .reply-del {
      position: absolute;
      right: 0;
    }

    .item-content-box {
      margin-left: 16px;
      max-width: calc(100% - 48px);

      .user-box {
        display: flex;

        .user-time {
          color: #a3a6b4;
        }
      }

      .r-content {
        padding: 15px 0;
        border-radius: 4px;
        white-space: pre-line;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}

.reply-list-wrapper {
  padding-top: 8px;
  padding-bottom: 5px;

  .reply-list-title {
    display: flex;
    align-items: center;
    position: relative;
    line-height: 24px;
    font-weight: 600;
    font-size: 16px;
    color: #1d2129;
    width: 100%;
    padding-bottom: 5px;
  }
}

.c-reply-row {
  padding-top: 15px;
  margin-top: 10px;
  padding-left: 14px;
  padding-right: 0;
  border-top: 1px solid #e4e6eb;
  position: relative;

  .reply-box {
    // border-bottom: 1px solid #e4e6eb;
    padding-bottom: 10px;
  }

  .reply-action {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0 0 0;
  }

  .reply-content {
    display: flex;

    .reply-avatar {
      margin-right: 15px;
      width: 40px;
      height: 40px;
    }
  }

  .c-replay-triangle {
    position: absolute;
    top: 8px;
    left: 50%;
    margin: -7px 0 0 -7px;
    pointer-events: none;

    .triangle {
      position: absolute;
      margin: auto;
      border: none;
      top: -6px;
      left: 0;
      right: 0;
      width: 10px;
      height: 10px;
      transform: rotate(-135deg);
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      background: #fff;
    }
  }
}

.c-container {
  margin-bottom: 4rem;
}

.topic-tag {
  cursor: pointer;
  border-radius: 50px;

  &:hover {
    background: rgba(30, 128, 255, 0.16);
  }
}

.c-topic-row {
  display: flex;

  .topic-box {
    margin-left: 52px;
  }
}

.c-skeleton {
  padding: 10px 20px 0;
}

.c-item {
  padding: 10px 20px 0;
  margin-top: 25px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

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

      .action-active {
        color: #3370ff;
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
      font-size: 15px;
    }
  }

  .c-header-row {
    position: relative;
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
      margin-bottom: 5px;
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
  margin: 1rem 2rem 0 2rem;

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

.rank-container {
  margin: -12px -5px;
}

.rank-cover {
  width: 64px;
  height: 64px;
}

.rank-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  max-width: 212px;
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
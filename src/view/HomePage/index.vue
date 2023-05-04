<template>
  <div style="text-align: center; margin: 10px auto;font-size: 14px;">
    HomePage开发测试 这里是首页内容区域
    文章推送（实现思路：懒加载or分页-基于用户行为的协同过滤CF）
  </div>
  <div ref="scrollContainer" class="content-container" v-on:scroll="handleListScroll">
    <a-row class="col-list">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" :xxl="16">
        <div class="list-container">
          <a-card :style="{ width: '100%' }">
            <template #title>
              <div>
                <a-tabs @change="changeHomeResourceTab" class="list-tab" default-active-key="0" type="rounded">
                  <a-tab-pane key="0" title="推荐"></a-tab-pane>
                  <a-tab-pane key="1" title="最热"></a-tab-pane>
                  <a-tab-pane key="2">
                    <template #title>最新</template>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </template>
            <div>
              <div v-if="listLoading" class="skelenton">
                <a-skeleton :animation="true">
                  <a-space direction="vertical" :style="{ width: '100%' }" size="large">
                    <a-skeleton-line :rows="4" :widths="['30%', [], '80%', '60%']" />
                  </a-space>
                </a-skeleton>
              </div>
              <div ref="content" class="entry-list-container" v-else>
                <a-empty class="empty-tip" v-if="articleList.length === 0" />
                <li class="list-item" v-for="(i, k) in articleList" :key="k">
                  <div @click="handleItem(i.articleId)" class="item-container">
                    <div class="item-header">
                      <div>{{ i.user.userName }}</div>
                      <a-divider direction="vertical" />
                      <div class="item-time">{{ getTimeAgoStr(i.updateTime) }}</div>
                      <a-divider direction="vertical" />
                      <div class="item-tags">
                        <div v-for="(tag, tk) in i.tagsArray" class="item-tag" key="tag">
                          {{ tag }}
                        </div>
                      </div>
                    </div>
                    <div class="item-body">
                      <div>
                        <a-avatar :style="{ backgroundColor: '#fff' }">
                          <IconUser v-if="i.user.userAvatarUrl === ''" />
                          <img :src="i.user.userAvatarUrl" alt="" />
                        </a-avatar>
                      </div>
                      <div>
                        <div class="item-title">{{ i.title }}</div>
                        <div class="item-description">
                          {{ i.summary }}
                        </div>
                      </div>
                    </div>
                    <div class="item-header">
                      <span>
                        <icon-eye />
                        <span class="bottom-number">{{
                          i.readCount
                        }}</span>
                      </span>
                      <a-divider direction="vertical" />
                      <span>
                        <icon-message />
                        <span class="bottom-number">{{
                          i.commentCount
                        }}</span>
                      </span>
                    </div>
                  </div>
                </li>
              </div>
              <div v-if="moreLoading" class="skelenton">
                <a-skeleton :animation="true">
                  <a-space direction="vertical" :style="{ width: '100%' }" size="large">
                    <a-skeleton-line :rows="4" :widths="['30%', [], '80%', '60%']" />
                  </a-space>
                </a-skeleton>
              </div>
            </div>
          </a-card>
          <a-back-top target-container="list-container" :style="{ position: 'absolute' }" />
        </div>
      </a-col>
      <a-col class="col-right" :xs="0" :sm="0" :md="0" :lg="8" :xl="8" :xxl="8">
        <a-affix :offsetTop="80">
          <div class="right-container">
            <div class="right-affix">
              <div>
                <div class="sign">
                  <div class="first-line">
                    <div class="sign-title">{{ signTitle }}</div>
                    <div class="sign-tip">记录在社区的美好时刻</div>
                  </div>
                  <!-- <div class="sign-btn">
                <a-button
                  @click="handleSign"
                  type="primary"
                  :disabled="signDisabled"
                  :loading="signBtnLoading"
                  >{{ signBtnTitle }}</a-button
                >
              </div> -->
                </div>
              </div>
              <div>
                <a-card>
                  <template #title>
                    <div>
                      <icon-bar-chart />
                      <span style="margin-left: 5px">社区作者排行榜</span>
                    </div>
                  </template>
                  <div class="rank-container">
                    <div v-if="rankLoading" class="rank-skeleton">
                      <a-skeleton :animation="true" :style="{ width: '277px' }">
                        <div>
                          <a-skeleton-line :rows="2" :widths="['100%', '100%']" />
                        </div>
                      </a-skeleton>
                    </div>
                    <div v-else>
                      <div class="rank-item" v-for="(i, index) in hotUserList">
                        <div class="rank-number">{{ index + 1 }}</div>
                        <div class="rank-avatar">
                          <a-avatar :style="{ backgroundColor: '#3370ff' }" :image-url="i.userAvatarUrl">
                          </a-avatar>
                        </div>
                        <div class="rank-username">
                          <div class="rank-user">
                            <div>{{ i.userName }}</div>
                            <div class="rank-lv">
                              <a-tag bordered color="arcoblue" size="small">Lv.{{ i.userLevel }}</a-tag>
                            </div>
                          </div>

                          <div class="description">{{ i.userDes ? i.userDes : '暂无简介' }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a-card>
              </div>
            </div>
          </div>
        </a-affix>
      </a-col>
    </a-row>
    <!-- 右下角悬浮组件 -->
    <div class="side-suspension">
      <div class="div-backtoTop">
        <a-button v-if="btnFlag" class="backTop btn" type="primary" shape="circle" @click="backTop">
          <template #icon>
            <icon-to-top />
          </template>
        </a-button>
      </div>
      <div class="div-suggestion">
        <a-tooltip popup-container=".div-suggestion" content="建议反馈" position="left">
          <a-button class="advise btn" type="primary" :shape="btnMsgShape">
            <template #icon>
              <icon-message />
            </template>
          </a-button>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { getMoreArticles, getHotUserList } from "@/api/articleApi";
import {
  IconHeart,
  IconMessage,
  IconEye,
  IconBarChart,
  IconUser,
  IconFaceSmileFill,
  IconToTop,
} from "@arco-design/web-vue/es/icon";
import { ref, reactive } from "vue";
import { userStore } from "@/store/userStore";
import { getRecommendArticle } from "@/api/getRecommendArticle";
import { Message } from '@arco-design/web-vue';
export default {
  components: {
    IconHeart,
    IconMessage,
    IconEye,
    IconBarChart,
    IconUser,
    IconFaceSmileFill,
    IconToTop,
  },
  setup(props) {
    const userInfo = userStore();
    const articleList = ref([]);
    const hotUserList = ref([]);
    const getHotUser = async () => {
      const res = await getHotUserList();
      if (res.data.code === 100) {
        hotUserList.value = res.data.data;
        console.log(hotUserList.value);
      }
    };
    return {
      signTitle: "Hello",
      listLoading: ref(true),
      signBtnLoading: ref(false),
      signDisabled: ref(false),
      btnFlag: ref(false),
      btnMsgShape: ref("circle"),
      signBtnTitle: ref("签到"),
      userInfo,
      backtoTopTip: ref(false),
      articleList,
      moreLoading: ref(false),
      rankLoading: ref(true),
      getHotUser,
      hotUserList,
    };
  },
  data() {
    return {
      q: document.querySelector(".content-container"),
    };
  },

  created() {
    Promise.all([this.getSignTitle(), this.recommendList(), this.getHotUser()])

  },

  mounted() {
    setTimeout(() => {
      this.listLoading = false;
      this.rankLoading = false;
    }, 1000);
  },
  methods: {
    getTimeAgoStr(timestamp) {
      const now = Date.now();
      const diff = now - timestamp;
      if (diff < 60 * 1000) { // 一分钟以内
        return '刚刚';
      } else if (diff < 60 * 60 * 1000) { // 一小时以内
        const minutesAgo = Math.floor(diff / (60 * 1000));
        return `${minutesAgo}分钟前`;
      } else if (diff < 24 * 60 * 60 * 1000) { // 一天以内
        const hoursAgo = Math.floor(diff / (60 * 60 * 1000));
        return `${hoursAgo}小时前`;
      } else if (diff < 30 * 24 * 60 * 60 * 1000) { // 一个月以内
        const daysAgo = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${daysAgo}天前`;
      } else if (diff < 12 * 30 * 24 * 60 * 60 * 1000) { // 一年以内
        const monthsAgo = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
        return `${monthsAgo}个月前`;
      } else { // 一年以上
        const yearsAgo = Math.floor(diff / (12 * 30 * 24 * 60 * 60 * 1000));
        return `${yearsAgo}年前`;
      }
    },
    //判断值是否为空，es6写法
    isEmpty(value) {
      return value === undefined || value === null || value === "";
    },
    recommendList(type) {
      type = this.isEmpty(type) ? 0 : type
      //判断userId是否存在，存在则获取推荐文章，不存在则获取热门文章
      this.userInfo.userId = this.isEmpty(this.userInfo.userId) || !this.userInfo.loginStatus ? 0 : this.userInfo.userId
      getRecommendArticle(this.userInfo.userId, type)
        .then(res => {
          // console.log(res.data)
          this.articleList = res.data.data;
        })
        .catch(err => {
          this.articleList = []
        })
    },
    changeHomeResourceTab(tab) {
      this.listLoading = true;
      setTimeout(() => {
        this.recommendList(tab)
        this.listLoading = false;
      }, 500);
    },
    // 在数据加载完成后计算滚动容器的高度和内容高度
    calculateHeight() {
      this.$nextTick(() => {
        const scrollContainer = this.$refs.scrollContainer;
        const content = this.$refs.content;
        const { offsetHeight } = scrollContainer;

        // 设置滚动容器和内容的高度
        scrollContainer.style.height = offsetHeight + "px";
        // content.style.height = this.articleList.length * 145 + "px";
      });
    },
    loadMoreData(delay) {
      let moreList = [];
      getMoreArticles().then(res => {
        // console.log(res.data)
        moreList = res.data.data;
        setTimeout(() => {
          this.articleList.push(...moreList);
          this.moreLoading = false;
        }, delay);
      })
      // this.moreLoading = false;
    },
    handleListScroll() {
      // 获取滚动容器的高度、滚动高度和内容高度
      const scrollContainer = this.$refs.scrollContainer;
      const { scrollTop, offsetHeight, scrollHeight } = scrollContainer;
      if (scrollTop > 60 * 4) {
        this.btnFlag = true;
      } else {
        this.btnFlag = false;
        this.backtoTopTip = false;
      }
      // 如果滚动到了底部，执行加载更多数据的操作
      if (scrollTop + offsetHeight >= scrollHeight - 1 && this.moreLoading === false) {
        this.moreLoading = true;
        this.loadMoreData(1500);
      }
    },
    handleItem(idx) {
      this.$message.success("文章编号：" + idx);
      this.$router.push('/articleDetail/' + idx)
    },
    handleSign() {
      if (!this.userInfo.loginStatus) {
        this.$message.warning("请您先登录猿趣阁");
        return false;
      }
      this.signBtnLoading = true;
      setTimeout(() => {
        this.userInfo.usercoin = this.userInfo.usercoin + 10;
        this.signBtnLoading = false;
        this.signBtnTitle = "已签到";

        this.signDisabled = true;
        this.$message.success(
          "签到成功，猿币+10，当前猿币：" + this.userInfo.usercoin
        );
      }, 1000);
    },
    getSignTitle() {
      let self = this;
      let date = new Date();

      if (date.getHours() >= 6 && date.getHours() < 12) {
        self.signTitle = "上午好！";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        self.signTitle = "下午好！";
      } else {
        self.signTitle = "晚上好！";
      }
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const scrollContainer = this.$refs.scrollContainer;
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.arco-card-size-medium .arco-card-body {
  padding: 0;
}

.empty-tip {
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rank-skeleton {
  display: flex;
  justify-content: center;
  margin: 15px;

}

.col-list {
  width: 100%;
  margin: 0 1rem;
}

.div-suggestion {
  position: relative;
  width: 80px;
  text-align: center;
}

.div-backtoTop {
  position: relative;
  width: 80px;
  text-align: center;
}

.side-suspension {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  right: 3rem;
  bottom: 4rem;
  z-index: 999;

  .advise {
    color: #333333;
  }

  .backTop {
    color: #333333;
  }

  .btn {
    margin: 1rem 0 0;
    z-index: 999;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    box-shadow: 0 2px 8px rgb(50 50 50 / 4%);
    width: 2.5rem;
    height: 2.5rem;
  }

  .btn:hover {
    box-shadow: 0 0 5px #ddd;
  }
}

.entry-list-container {
  width: 100%;
}

.rank-user {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.rank-number {
  margin-right: 10px;
  font-size: 17px;
  color: #86909c;
}

.rank-lv {
  margin-left: 10px;
}

.rank-username {
  font-size: 14px;
  margin-left: 10px;

  .description {
    font-size: 12px;
    color: #909090;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 190px;
  }
}

.rank-item {
  user-select: none;
  cursor: pointer;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.rank-item:hover {
  background-color: #fafafa;
}

.list-tab {
  display: flex;
}

.skelenton {
  padding: 0 1rem;
  margin: 1rem .5rem;
}

.col-right {
  display: flex;
  justify-content: center;
}

.sign-btn {
  display: flex;
  align-items: center;
}

.first-line {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  .sign-title {
    font-size: 18px;
  }

  .sign-tip {
    color: #86909c;
  }
}

.sign {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  margin-bottom: 16px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}

.right-container {
  // width: 18rem;
  position: relative;
}

.right-affix {
  position: fixed;
  top: 120px;
  right: 70px;
}

.content-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem 0;
  overflow: auto;
  height: 100%;
}

.bottom-number {
  margin-left: 3px;
}

.item-container {
  cursor: pointer;
  padding: 12px 20px 0;
}

.list-item {
  height: 150px;
  border-bottom: 1px solid var(--color-neutral-3);
}

.list-item:hover {
  background-color: #fafafa;
}

.item-description {
  margin: 5px 15px 0 15px;
  color: #86909c;
  font-size: 13px;
  line-height: 22px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.item-title {
  margin-left: 15px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.item-tags {
  display: flex;
}

.item-tag {
  position: relative;
  flex-shrink: 0;
  font-size: 12px;
  padding: 0 8px;
  color: #86909c;
}

.item-tag:not(:last-child):after {
  position: absolute;
  right: -1px;
  top: 6px;
  display: block;
  content: " ";
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #4e5969;
}

.item-time {
  color: #86909c;
  white-space: nowrap;
}

.item-body {
  display: flex;
  margin: 0 0 15px 5px;
}

.item-header {
  display: flex;
  margin: 0 0 15px 10px;
  font-size: 12px;
}

.list-container {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0 1rem;
  margin: 0 1rem;
  margin-bottom: 9rem;
}
</style>
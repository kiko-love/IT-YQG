<template>
  <div class="resource-container">
    <a-row>
      <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="4" :xxl="4">
        <div class="side-bar">
          <a-menu :default-selected-keys="['all']" @menu-item-click="handleMenu">
            <a-menu-item key="all">
              <template #icon>
                <icon-font type="icon-yingyong-moren" :size="20" />
              </template>
              默认
            </a-menu-item>
            <a-menu-item key="前端">
              <template #icon>
                <icon-font type="icon-qianduankaifa" :size="20" />
              </template>
              前端
            </a-menu-item>
            <a-menu-item key="后端">
              <template #icon>
                <icon-font type="icon-houduankaifa" :size="20" />
              </template>
              后端
            </a-menu-item>
            <a-menu-item key="大数据">
              <template #icon>
                <icon-font type="icon-mianshiyaoqing" :size="20" />
              </template>
              大数据
            </a-menu-item>
            <a-menu-item key="算法">
              <template #icon>
                <icon-font type="icon-zhinengsuanfa" :size="20" />
              </template>
              算法
            </a-menu-item>
            <a-menu-item key="数据结构">
              <template #icon>
                <icon-font type="icon-shujushujudian" :size="20" />
              </template>
              数据结构
            </a-menu-item>
            <a-menu-item key="开发工具">
              <template #icon>
                <icon-font type="icon-gongju" :size="20" />
              </template>
              开发工具
            </a-menu-item>
            <a-menu-item key="人工智能">
              <template #icon>
                <icon-font type="icon-rengongzhinengdanao" :size="20" />
              </template>
              人工智能
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14" :xxl="14">
        <a-card class="r-list" :bordered="false">
          <template #title>
            <div>
              <a-tabs class="list-tab" default-active-key="1" type="rounded">
                <a-tab-pane key="1" title="推荐"></a-tab-pane>
                <a-tab-pane key="2" title="最热"></a-tab-pane>
                <a-tab-pane key="3">
                  <template #title>最新</template>
                </a-tab-pane>
              </a-tabs>
            </div>
          </template>
          <template #extra>
            <div>
              <a-input-search :style="{ width: '220px' }" placeholder="搜索资源" allow-clear search-button />
              <!-- <a-button type="text">
              <template #icon>
                <icon-search />
              </template>
              </a-button>-->
            </div>
          </template>
          <div class="r-container">
            <div v-if="listLoading" class="sk-container">
              <a-skeleton class="skeleton" animation v-for="i in 3">
                <a-space direction="vertical" :style="{ width: '100%' }" size="large">
                  <a-skeleton-shape size="large" />
                  <a-skeleton-line :rows="3" :widths="[120, 180, 90]" />
                </a-space>
              </a-skeleton>
            </div>
            <a-row v-if="!listLoading" class="r-grid">
              <a-col class="r-card-col" v-for="(i, k) in pagedResList" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8"
                :key="k">
                <a-card class="r-card" hoverable>
                  <template #actions></template>
                  <template #cover>
                    <div class="r-cover" :style="{
                        height: '110px',
                        overflow: 'hidden',
                      }">
                      <img v-if="i.fileType === 'other'" class="r-cover-img other" alt="dessert"
                        src="https://i.328888.xyz/2023/04/23/iSpr2P.png" />
                      <img v-else-if="i.fileType === 'audio'" class="r-cover-img" alt="dessert"
                        src="@/assets/fileType/audio.png" />
                      <img v-else-if="i.fileType === 'video'" class="r-cover-img" alt="dessert"
                        src="@/assets/fileType/video.png" />
                      <img v-else-if="i.fileType === 'text'" class="r-cover-img" alt="dessert"
                        src="@/assets/fileType/text.png" />
                      <img v-else-if="i.fileType === 'image'" class="r-cover-img" alt="dessert"
                        src="@/assets/fileType/image.png" />
                      <img v-else-if="i.fileType === 'compressed'" class="r-cover-img" alt="dessert"
                        src="@/assets/fileType/zip.png" />
                    </div>
                  </template>
                  <a-card-meta>
                    <template #title>
                      <div class="r-card-title">{{ i.title }}</div>
                    </template>
                    <template #description>
                      <div class="r-card-description">
                        {{ i.description }}
                      </div>
                      <div class="tagArr">
                        <a-tag v-for="(tag, k) in i.tagsArray" :key="k" color="gray">{{ tag }}</a-tag>
                      </div>
                      <div class="r-card-a-a">
                        <div class="r-card-avatar">
                          <div class="avatar-info">
                            <a-avatar :size="32" :style="{
                                marginRight: '8px',
                                background: '#3370ff',
                              }" :image-url="i.user.userAvatarUrl">
                              <IconUser />
                            </a-avatar>

                            <div class="r-card-info">
                              <span>{{ i.user.userName }}</span>
                              <span class="r-card-info-time">{{ formatDate(i.createTime) }}</span>
                            </div>
                          </div>
                          <a-button shape="round" size="mini" status="success"
                            @click="downLoadResource(i.user.userId, i.id)">
                            下载
                          </a-button>
                        </div>
                        <div class="r-card-actions">
                          <div class="icon-group">
                            <span class="icon-hover">
                              <IconThumbUp />
                              <span class="icon-hover-text">{{ i.likeCount }}</span>
                            </span>
                            <span class="icon-hover">
                              <icon-download />
                              <span class="icon-hover-text">{{ i.downloadCount }}</span>
                            </span>
                          </div>
                          <div class="res-tag">
                            <a-tag v-if="i.fee === 0" color="green">免费</a-tag>
                            <a-tag v-else color="orangered">付费</a-tag>
                          </div>

                        </div>
                      </div>
                    </template>
                  </a-card-meta>
                  <div class="footer-page">

                  </div>
                </a-card>
              </a-col>
              <a-empty v-if="pagedResList.length === 0" />
              <!-- <div v-if="resLoading" class="res-spin">
                <a-spin tip="正在加载资源列表..." />
              </div> -->
            </a-row>
          </div>
          <div class="footer-page">
            <a-pagination :current="currentPage" :total="resList.length" :page-size="pageSize" show-total
              @change="handlePageChange" />
          </div>
        </a-card>
      </a-col>
      <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="6" :xxl="6">
        <div class="r-extra-container">
          <a-card :style="{ width: '100%' }">
            <template #title>
              <div>
                <icon-bar-chart />
                <span style="margin-left: 5px">资源排行榜</span>
              </div>
            </template>
            <div class="rank-container">
              <div class="rank-item" v-for="(i, index) in hotList.slice(0, 5)">
                <div class="rank-number">{{ index + 1 }}</div>
                <div class="rank-avatar"></div>
                <div class="rank-username">
                  <div class="rank-user">
                    <div class="rank-title">{{ i.title }}</div>
                    <div class="rank-lv">
                      <!-- <a-rate :count="1" /> -->
                    </div>
                  </div>

                  <div class="description">
                    <div class="hot-info"><icon-fire />{{ calculateHot(i.viewCount, i.likeCount, i.downloadCount) }}</div>
                    <svg class="iconpark-icon">
                      <use href="#html-five"></use>
                    </svg>
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
  IconEye,
  IconStar,
  IconDownload,
  IconFire,
} from "@arco-design/web-vue/es/icon";
import { ref, computed } from "vue";
import { getResourceList, getHotList, getResourceBytag, downloadFile } from '@/api/resourceApi'
import TimeUtils from '@/utils/timeUtils'
import { calculateHotness } from '@/utils/resourceUtils'
import { userStore } from '@/store/userStore'
const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_3869138_qmfhbmthj4o.js",
});

export default {
  setup(props) {
    const user = userStore()
    const pageSize = ref(9);
    const currentPage = ref(1);
    const currentIndex = ref(0);
    const listLoading = ref(true);
    const resList = ref([])
    const hotList = ref([])
    const resLoading = ref(true)
    const pagedResList = computed(() => {
      return resList.value.slice(currentIndex.value, currentIndex.value + pageSize.value);
    });
    const handlePageChange = (page) => {
      currentPage.value = page;
      currentIndex.value = (page - 1) * pageSize.value;
    };
    const getRlist = async () => {
      currentIndex.value = 0
      const res = await getResourceList()
      resList.value = res.data.data
    }
    const getHot = async () => {
      const res = await getHotList()
      hotList.value = res.data.data
    }
    const formatDate = (date) => {
      return TimeUtils.formatTime(date)
    }
    const calculateHot = (viewCount, likeCount, downloadCount) => {
      return calculateHotness(viewCount, likeCount, downloadCount)
    }
    const handleMenu = async (key) => {
      listLoading.value = true;
      currentIndex.value = 0
      resLoading.value = true
      const res = await getResourceBytag(key)
      setTimeout(() => {
        resList.value = res.data.data ? res.data.data : []
        resLoading.value = false
        listLoading.value = false;
      }, 800);
    }
    const downLoadResource = async (uid, rid) => {
      if (user.loginStatus === false) {
        Message.error('请先登录后进行下载')
        return
      }
      const v = {
        userId: uid,
        fileId: rid
      }
      const response = await downloadFile(v)
      console.log(response);
      // 将响应数据转换成 Blob 对象
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      // 创建 URL 和下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // 设置链接的下载属性为服务端返回的文件名
      a.download = response.headers['content-disposition'] ? response.headers['content-disposition'].split('filename=')[1].replace(/^"(.*)"$/, '$1') : 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    return {
      listLoading, resList, getRlist, formatDate,
      pageSize, currentPage, currentIndex,
      handlePageChange, pagedResList, getHot, hotList,
      calculateHot, handleMenu, resLoading, downLoadResource
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
    IconEye,
    IconStar,
    IconDownload,
    IconFire,
  },
  data() {
    return {};
  },

  created() {
    Promise.all([this.getRlist(), this.getHot()])
    setTimeout(() => {
      this.listLoading = false;
    }, 500);
  },

  mounted() { },

  methods: {},
};
</script>

<style lang="less" scoped>
/deep/.arco-menu-icon {
  margin-right: 12px;
}

/deep/.arco-space {
  align-items: center;
}

.res-spin {
  margin: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.rank-container {
  margin: -12px -5px;
}

.footer-page {
  display: flex;
  justify-content: flex-end;
  margin: 2rem .5rem 0 0;
}

.tagArr {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 1rem 0 0 0;
}

.sk-container {
  display: flex;
  margin-bottom: 2rem;
}

.skeleton {
  width: 33.33%;
}


.list-tab {
  display: flex;
}

.resource-container {
  height: 100%;
  overflow: auto;
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
  background: #fff;
  padding: 10px 8px;
  margin: 0 2rem;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 99;
  position: fixed;
  top: 91px;
  max-height: calc(100% - 100px);
  overflow: auto;
}

.r-list {
  margin: 1rem 0;
  padding: 1rem 0;
  width: 100%;
}

.r-extra-container {
  position: fixed;
  width: 250px;
  padding: 1rem;
  display: flex;
  justify-content: center;

  .rank-title {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .rank-user {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .rank-number {
    margin-right: 5px;
    font-size: 17px;
    color: #86909c;
  }

  .rank-lv {
    margin-left: 10px;
  }

  .rank-username {
    font-size: 14px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;

    .description {
      font-size: 12px;
      color: #909090;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 190px;
      display: flex;
      align-items: center;

      .hot-info {
        display: flex;
        align-items: center;
        gap: 2px;
      }
    }
  }
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
  padding: 0 10px 10px 10px;
  gap: 8px;
  margin-bottom: -2rem;
  justify-content: space-between;

  .res-tag {
    display: flex;
    gap: .5rem;
  }

  .icon-group {
    display: flex;

    .icon-hover {
      .icon-hover-text {
        font-size: 12px;
        padding-left: 2px;
      }

      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      // border-radius: 50%;
    }
  }
}

.r-card-avatar {
  padding: 0 8px 10px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar-info {
    display: flex;
  }
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
  height: 70px;
  width: 70px;
  -o-object-fit: contain;
  object-fit: contain;
}

.other {
  height: 100px;
  width: 100px;
}
</style>
!<template>
  <div class="resource-container">
    <a-row>
      <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="4" :xxl="4">
        <div class="side-bar">
          <a-menu :default-selected-keys="['1']">
            <a-menu-item key="1">
              <template #icon>
                <icon-font type="icon-qianduankaifa" :size="24" />
              </template>
              前端
            </a-menu-item>
            <a-menu-item key="2">
              <template #icon>
                <icon-font type="icon-houduankaifa" :size="24" />
              </template>
              后端
            </a-menu-item>
            <a-menu-item key="3">
              <template #icon>
                <icon-font type="icon-mianshiyaoqing" :size="24" />
              </template>
              面试
            </a-menu-item>
            <a-menu-item key="4">
              <template #icon>
                <icon-font type="icon-zhinengsuanfa" :size="24" />
              </template>
              算法
            </a-menu-item>
            <a-menu-item key="5">
              <template #icon>
                <icon-font type="icon-shujushujudian" :size="24" />
              </template>
              数据结构
            </a-menu-item>
            <a-menu-item key="6">
              <template #icon>
                <icon-font type="icon-gongju" :size="24" />
              </template>
              开发工具
            </a-menu-item>
            <a-menu-item key="7">
              <template #icon>
                <icon-font type="icon-rengongzhinengdanao" :size="24" />
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
              <a-input-search
                :style="{width:'220px'}"
                placeholder="搜索资源"
                allow-clear
                search-button
              />
              <!-- <a-button type="text">
              <template #icon>
                <icon-search />
              </template>
              </a-button>-->
            </div>
          </template>
          <div class="r-container">
            <a-row class="r-grid">
              <a-col
                class="r-card-col"
                v-for="i in 10"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="8"
                :xl="8"
                :xxl="8"
              >
                <a-card class="r-card" hoverable>
                  <template #actions></template>
                  <template #cover>
                    <div
                      class="r-cover"
                      :style="{
          height: '110px',
          overflow: 'hidden',
        }"
                    >
                      <img
                        class="r-cover-img"
                        alt="dessert"
                        src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/d83da9d012ddb7ae85f4.png~tplv-t2oaga2asx-no-mark:200:200:0:0.awebp"
                      />
                    </div>
                  </template>
                  <a-card-meta>
                    <template #title>
                      <div class="r-card-title">C语言排序算法代码</div>
                    </template>
                    <template #description>
                      <div class="r-card-description">经典排序算法的C语言实现源码</div>
                      <div class="r-card-a-a">
                        <div class="r-card-avatar">
                          <a-avatar :size="32" :style="{ marginRight: '8px',background:'#3370ff' }">
                            <IconUser />
                          </a-avatar>
                          <div class="r-card-info">
                            <span>ZYY</span>
                            <span class="r-card-info-time">2023年2月1日</span>
                          </div>
                        </div>
                        <div class="r-card-actions">
                          <span class="icon-hover">
                            <IconThumbUp />
                            <span class="icon-hover-text">1w+</span>
                          </span>
                          <span class="icon-hover">
                            <icon-eye />
                            <span class="icon-hover-text">1w+</span>
                          </span>
                          <span class="icon-hover">
                            <a-rate :style="{fontSize: '16px'}" :count="1" allow-clear/>
                            <span class="icon-hover-text">1w+</span>
                          </span>
                        </div>
                      </div>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="6" :xxl="6">
        <div class="r-extra-container">
          <a-card :style="{ width: '100%'}">
            <template #title>
              <div>
                <icon-bar-chart />
                <span style="margin-left:5px">资源排行榜</span>
              </div>
            </template>
            <div class="rank-container">
              <div class="rank-item" v-for="(i,index) in 3">
                <div class="rank-number">{{i}}</div>
                <div class="rank-avatar"></div>
                <div class="rank-username">
                  <div class="rank-user">
                    <div class="rank-title">C语言排序算法代码</div>
                    <div class="rank-lv">
                      <a-rate :count="1" />
                    </div>
                  </div>

                  <div class="description">
                    <div>
                      <icon-eye />1w+浏览
                    </div>
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
  IconEye,
  IconStar
} from "@arco-design/web-vue/es/icon";

const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_3869138_hlqdy8cckfp.js"
});

export default {
  setup(props) {},
  components: {
    IconFont,
    IconThumbUp,
    IconShareInternal,
    IconMore,
    IconUser,
    IconBarChart,
    IconSearch,
    IconEye,
    IconStar
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="less" scoped>
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
.icon-hover:hover {
  // background-color: rgb(var(--gray-2));
}
.list-tab {
  display: flex;
}
.resource-container {
  height: 100%;
  overflow: auto;
}
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
  border-radius: 5px;
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
}
.r-extra-container {
  width: 250px;
  padding: 1rem;
  display: flex;
  justify-content: center;
}
.r-container {
  width: 100%;
}
.r-grid {
  // display: grid;
  // grid-template-columns: repeat(2, 40%);
  // justify-content: center;
  // grid-gap: 20px 5rem;
  // padding: 1rem;
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
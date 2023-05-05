<template>
    <div class="search-container" ref="searchTable" v-on:scroll="handleListScroll">
        <div class="search-type">
            <a-card>
                <a-radio-group v-model="type" @change="changeMenu">
                    <a-radio value="0">
                        <template #radio="{ checked }">
                            <a-tag size="large" color="arcoblue" :checked="checked" checkable>文章</a-tag>
                        </template>
                    </a-radio>
                    <a-radio value="1">
                        <template #radio="{ checked }">
                            <a-tag size="large" color="arcoblue" :checked="checked" checkable>用户</a-tag>
                        </template>
                    </a-radio>
                    <a-radio value="2">
                        <template #radio="{ checked }">
                            <a-tag size="large" color="arcoblue" :checked="checked" checkable>资源</a-tag>
                        </template>
                    </a-radio>
                </a-radio-group>
            </a-card>
        </div>
        <a-row class="grid-demo">
            <a-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" :xxl="8">
                <div></div>
            </a-col>
            <a-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" :xxl="8">
                <div class="res-container">
                    <a-card v-if="resLoading">
                        <div class="res-spin">
                            <a-spin tip="搜索结果加载中…" />
                        </div>
                    </a-card>
                    <a-list v-if="type === '0' && !resLoading" class="res-list">
                        <template #header>
                            搜索结果
                        </template>
                        <a-list-item v-for="(i, k) in articleList">
                            <div class="article-header-info">
                                <div class="article-user-info">
                                    <a-space :size="0">
                                        <template #split>
                                            <a-divider direction="vertical" />
                                        </template>
                                        <div>{{ i.user?.userName }}</div>
                                        <span style="margin-top:1px">{{ getTimeDiff(i.createTime) }}</span>
                                    </a-space>
                                </div>
                                <div>
                                    <a-space>
                                        <template #split>
                                            <a-divider direction="vertical" />
                                        </template>
                                        <span v-for="(tag, index) in i.tags?.split(',')" class="header-tag">{{ tag }}</span>
                                    </a-space>
                                </div>
                            </div>
                            <a-list-item-meta>
                                <template #title>
                                    <div style="height: 24px;">
                                        <span class="article-title" @click="toArticleDetail(i.articleId)">{{ i.title
                                        }}</span>
                                    </div>
                                </template>
                                <template #description>
                                    <div class="article-summary">
                                        {{ i.summary }}
                                    </div>
                                </template>
                                <template #avatar>
                                    <a-avatar shape="square" :image-url="i.user?.userAvatarUrl">
                                    </a-avatar>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                    <a-list v-if="type === '1' && !resLoading" class="res-list">
                        <template #header>
                            搜索结果
                        </template>
                        <a-list-item v-for="(i, k) in userList">
                            <a-list-item-meta>
                                <template #title>
                                    <div class="user-main-info">
                                        <div class="user-name">
                                            {{ i.userName }}
                                        </div>
                                        <div><a-tag color="arcoblue">Lv.{{ i.userLevel }}</a-tag></div>

                                    </div>
                                </template>
                                <template #avatar>
                                    <a-avatar shape="square" :image-url="i.userAvatarUrl">
                                    </a-avatar>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                    <a-list v-if="type === '2' && !resLoading" class="res-list">
                        <template #header>
                            搜索结果
                        </template>
                        <a-list-item v-for="(i, k) in resourceList">
                            <div class="article-header-info">
                                <div class="article-user-info">
                                    <a-space :size="0">
                                        <template #split>
                                            <a-divider direction="vertical" />
                                        </template>
                                        <span style="margin-top:1px">{{ getTimeDiff(i.createTime) }}</span>
                                        <span v-for="(tag, index) in i.tags.split(',')" class="header-tag">{{ tag }}</span>
                                    </a-space>
                                </div>
                            </div>
                            <a-list-item-meta>
                                <template #title>
                                    <div class="resource-main-info">
                                        <div class="resource-name">
                                            {{ i.title }}
                                            <a-tag v-if="i.fee === 0" color="green" size="small">免费</a-tag>
                                            <a-tag v-if="i.fee === 1" color="orangered" size="small">付费</a-tag>
                                        </div>
                                    </div>
                                </template>
                                <template #description>
                                    <div class="article-summary">
                                        {{ i.description }}
                                    </div>
                                </template>
                                <template #avatar>
                                    <a-avatar shape="square" :style="{ background: 'transparent' }">
                                        <img :src="i.cover" alt="">
                                    </a-avatar>
                                </template>
                            </a-list-item-meta>
                            <template #actions>
                                <a-button size="mini" type="primary" @click="downLoadResource(i.userId, i.id)">
                                    下载
                                </a-button>
                            </template>
                        </a-list-item>
                    </a-list>
                    <!-- <div>已经到底了</div> -->
                </div>
            </a-col>
            <a-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" :xxl="8">
                <div></div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchArticle, searchUser, searchResource } from '@/api/searchApi'
import { downloadFile } from '@/api/resourceApi'
import TimeUtils from '@/utils/timeUtils'
import { userStore } from '@/store/userStore'
import { Message } from "@arco-design/web-vue";
export default {
    setup() {
        const pageNum = ref(1);
        const pageSize = ref(10);
        const user = userStore();
        const router = useRouter();
        const route = useRoute();
        const type = ref(0)//router.currentRoute.value.params.type;
        const keyword = ref('')//router.currentRoute.value.params.keyword;
        type.value = router.currentRoute.value.params.type;
        keyword.value = router.currentRoute.value.params.keyword;
        const articleList = ref([]);
        const moreArticleList = ref([]);
        const userList = ref([]);
        const moreUserList = ref([]);
        const resourceList = ref([]);
        const moreResourceList = ref([]);
        const resLoading = ref(false);
        const getTimeDiff = (time) => {
            return TimeUtils.getTimeDiff(time);
        }

        const searchRes = async () => {
            resLoading.value = true;
            if (type.value == 0) {
                const res = await searchArticle(keyword.value, pageNum.value, pageSize.value);
                articleList.value = res.data.data;
            } else if (type.value == 1) {
                const res = await searchUser(keyword.value, pageNum.value, pageSize.value);
                userList.value = res.data.data;
                console.log(res.data);
            } else if (type.value == 2) {
                const res = await searchResource(keyword.value, pageNum.value, pageSize.value);
                if (res.data.code == 100) {
                    resourceList.value = res.data.data;
                    resourceList.value.forEach((i) => {
                        if (i.fileType === 'other') { i.cover = 'https://i.328888.xyz/2023/04/23/iSpr2P.png' }
                        if (i.fileType === 'audio') { i.cover = 'https://files.catbox.moe/7g3plb.png' }
                        if (i.fileType === 'video') { i.cover = 'https://files.catbox.moe/x3mn23.png' }
                        if (i.fileType === 'text') { i.cover = 'https://files.catbox.moe/zgqnek.png' }
                        if (i.fileType === 'image') { i.cover = 'https://files.catbox.moe/o2dh79.png' }
                        if (i.fileType === 'compressed') { i.cover = 'https://files.catbox.moe/h25aou.png' }
                    })
                } else {
                    resourceList.value = [];
                }
                console.log(res);
            }
            setTimeout(() => {
                resLoading.value = false;
            }, 500);
        }
        const toArticleDetail = (aid) => {
            router.push('/articleDetail/' + aid)
        }
        const changeMenu = (k) => {
            type.value = k;
            pageNum.value = 1;
            router.push('/search/' + k + '/' + keyword.value)
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
        console.log(type.value, keyword.value);
        searchRes();
        watch(() => route.params,
            (newValue, oldValue) => {
                type.value = newValue.type;
                keyword.value = newValue.keyword;
                pageNum.value = 1;
                searchRes();
            },
            { immediate: true });
        return {
            type,
            keyword,
            router,
            articleList,
            userList,
            resourceList,
            searchRes,
            getTimeDiff,
            toArticleDetail,
            resLoading,
            changeMenu,
            downLoadResource,
            pageNum,
            pageSize,
            moreArticleList,
            moreUserList,
            moreResourceList,
        };
    },
    methods: {
        handleListScroll(e) {
            // 获取滚动容器的高度、滚动高度和内容高度
            const scrollContainer = this.$refs.searchTable;
            const { scrollTop, offsetHeight, scrollHeight } = scrollContainer;
            // 如果滚动到了底部，执行加载更多数据的操作
            if (scrollTop + offsetHeight >= scrollHeight - 1) {
                this.loadMoreArticle();
            }
        },
        async loadMoreArticle() {
            this.pageNum++;
            const res = await searchArticle(this.keyword, this.pageNum, this.pageSize);
            this.moreArticleList = res.data.data ? res.data.data : [];
            this.articleList.push(...this.moreArticleList);

        },
        async loadMoreUser() {
            this.pageNum++;
            const res = await searchUser(this.keyword, this.pageNum, this.pageSize);
            this.moreUserList = res.data.data ? res.data.data : [];
            this.userList.push(...this.moreUserList);

        },
        async loadMoreResource() {
            this.pageNum++;
            const res = await searchResource(this.keyword, this.pageNum, this.pageSize);
            this.moreResourceList = res.data.data ? res.data.data : [];
            this.resourceList.push(...this.moreResourceList);

        },
    },

}
</script>
<style lang="less">
.resource-main-info {
    display: flex;
    align-items: center;
    gap: 8px;

    .resource-name {
        font-size: 1rem;
    }
}

.user-main-info {
    display: flex;
    align-items: center;
    gap: 8px;

    .user-name {
        font-size: 1rem;
    }
}

.article-header-info {
    display: flex;
    gap: 2rem;
    margin-bottom: .5rem;

    .article-user-info {
        color: var(--color-neutral-6);
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    .header-tag {
        color: var(--color-neutral-6);
        font-size: 12px;
    }
}

.article-title {
    font-size: 16px;
    cursor: pointer;
    transition: .1s;

    &:hover {
        color: rgb(var(--arcoblue-6));
    }
}

.article-summary {
    line-height: 22px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: var(--color-neutral-6);
}

.search-container {
    position: relative;
    height: -webkit-fill-available;
    overflow: auto;
}

.res-container {
    .res-spin {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    margin: 4.5rem 0 3rem 0;
}

.res-list {
    background: #fff;

}

.search-type {
    position: fixed;
    // top: 0;
    right: 0;
    width: 100%;
    // height: 100%;
    padding-right: 6px;
    /* 在右侧留出20px宽度的空间 */
    overflow-y: auto;
    /* 添加滚动条 */
    background-color: transparent;
    z-index: 99;
    /* 确保这个元素在其他元素之上 */
    text-align: center;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);

}
</style>
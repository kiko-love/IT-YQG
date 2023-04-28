<template>
    <div class="search-container" ref="searchTable">
        <a-affix :offsetTop="75" :target="searchTable">
            <div class="search-type">
                <a-card>
                    <a-radio-group default-value="1">
                        <a-radio value="1">
                            <template #radio="{ checked }">
                                <a-tag size="large" color="arcoblue" :checked="checked" checkable>文章</a-tag>
                            </template>
                        </a-radio>
                        <a-radio value="2">
                            <template #radio="{ checked }">
                                <a-tag size="large" color="arcoblue" :checked="checked" checkable>资源</a-tag>
                            </template>
                        </a-radio>
                        <a-radio value="3">
                            <template #radio="{ checked }">
                                <a-tag size="large" color="arcoblue" :checked="checked" checkable>用户</a-tag>
                            </template>
                        </a-radio>
                    </a-radio-group>
                </a-card>
            </div>
        </a-affix>
        <a-row class="grid-demo">
            <a-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" :xxl="8">
                <div></div>
            </a-col>
            <a-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" :xxl="8">
                <a-list v-if="type === '0'" class="res-list">
                    <template #header>
                        搜索结果
                    </template>
                    <a-list-item v-for="(i, k) in articleList">
                        <div>123</div>
                        <a-list-item-meta>
                            <template #title>
                                {{ i.title }}
                            </template>
                            <template #description>
                                {{ i.summary }}
                            </template>
                            <template #avatar>
                                <a-avatar shape="square" :image-url="i.user?.userAvatarUrl">
                                </a-avatar>
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>

            </a-col>
            <a-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" :xxl="8">
                <div></div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { searchArticle, searchUser, searchResource } from '@/api/searchApi'
export default {
    setup() {
        const router = useRouter();
        const type = router.currentRoute.value.params.type;
        const keyword = router.currentRoute.value.params.keyword;
        const articleList = ref([]);
        const userList = ref([]);
        const resourceList = ref([]);
        const searchRes = async () => {
            if (type == 0) {
                const res = await searchArticle(keyword);
                articleList.value = res.data.data;
                console.log(res.data);
            } else if (type == 1) {
                const res = await searchUser(keyword);
                userList.value = res.data.data;
                console.log(res.data);
            } else if (type == 2) {
                const res = await searchResource(keyword);
                resourceList.value = res.data.data;
                console.log(res);
            }
        }
        console.log(type, keyword);
        searchRes();
        return {
            type,
            keyword,
            router,
            articleList,
            userList,
            resourceList,
            searchRes
        };
    },

}
</script>
<style lang="less">
.grid-demo {
    // margin-top: 5rem;
}

.search-container {
    position: relative;
    height: -webkit-fill-available;
    overflow: auto;
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
    z-index: 999;
    /* 确保这个元素在其他元素之上 */
    text-align: center;

}</style>
<template>
    <div>
        <a-card class="top-card">
            <div class="user-top">
                <div class="top-title">
                    <icon-book />文章管理
                </div>

                <div class="top-actions">
                    <a-button shape="round" @click="refreshArticleList">
                        <template #icon>
                            <icon-refresh />
                        </template>
                    </a-button>
                    <div>
                        <a-select v-model="aListType" defaultValue="全部" :style="{ width: '100px' }"
                            @change="handleAuditChange">
                            <a-option value="100">全部</a-option>
                            <a-option value="1">已通过</a-option>
                            <a-option value="-1">未通过</a-option>
                            <a-option value="0">待审核</a-option>
                        </a-select>
                    </div>
                </div>
            </div>
        </a-card>
        <a-list class="artice-list">
            <a-list-item v-for="(idx, k) in aList" :key="idx">
                <a-list-item-meta>
                    <template #title>
                        <div class="title-info">
                            <div class="title">{{ idx.title }}</div>
                            <div>
                                <a-tag v-if="idx.audit === 0" color="arcoblue">待审核</a-tag>
                                <a-tag v-else-if="idx.audit === 1" color="green">已审核通过</a-tag>
                                <a-tag v-else-if="idx.audit === -1" color="red">审核未通过</a-tag>
                            </div>
                        </div>
                    </template>
                    <template #description>
                        <div class="sumary">{{ idx.summary }}</div>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <a-tooltip content="点击预览该文章">
                        <icon-eye @click="previewArticle(idx.articleId)" />
                    </a-tooltip>
                    <icon-edit @click="editArticle(k)" />

                    <a-popconfirm type="error" content="该操作不可逆，是否删除该文章?" @ok="delArticle(idx.articleId)">
                        <icon-delete />
                    </a-popconfirm>

                </template>
            </a-list-item>
        </a-list>
        <div class="footer-page">
            <a-pagination :current="currentPage" :total="total" :page-size="pageSize" show-total
                @change="handlePageChange" />
        </div>
    </div>
    <a-modal v-model:visible="detailVisible" simple :footer="null">
        <template #title>
            文章信息修改
        </template>
        <div>
            <a-form :model="articleForm" @submit="handleSubmit">
                <a-form-item field="artileId" label="文章Id">
                    <a-input v-model="articleForm.articleId" disabled />
                </a-form-item>
                <a-form-item field="title" label="文章标题">
                    <a-input v-model="articleForm.title" />
                </a-form-item>
                <a-form-item field="email" label="文章摘要">
                    <a-input v-model="articleForm.summary" />
                </a-form-item>
                <a-form-item field="createTime" label="发布日期">
                    <div>{{ dateToNow(articleForm.createTime) }}</div>
                </a-form-item>
                <a-form-item field="summary" label="文章摘要">
                    <a-textarea v-model="articleForm.summary" :auto-size="{
                            minRows: 2,
                            maxRows: 5
                        }" />
                </a-form-item>
                <a-form-item field="audit" label="审核状态">
                    <a-switch v-model="articleForm.auditStatus" @change="switchAudit" />
                </a-form-item>
                <a-form-item class="edit-btn">
                    <div class="btns">
                        <div class="btn"><a-button type="primary" html-type="submit">提交</a-button></div>
                        <div class="btn"><a-button @click="cancelEdit">取消</a-button></div>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
</template>

<script>
import TimeUtils from '@/utils/timeUtils';
import { ref, reactive, computed } from 'vue';
import { getArticleList, getAuditArtcle, updateAudit, deleteArticle } from '@/api/adminArticleApi'
import {
    IconEdit,
    IconDelete,
    IconIdcard,
    IconMessage,
    IconUser,
    IconRefresh,
    IconBook,
    IconApps,
    IconPoweroff,
    IconLock,
    IconEye,
} from '@arco-design/web-vue/es/icon';
import { Icon, Message } from "@arco-design/web-vue";
export default {
    components: {
        IconEdit,
        IconDelete,
        IconIdcard,
        IconMessage,
        IconUser,
        IconRefresh,
        IconBook,
        IconApps,
        IconPoweroff,
        TimeUtils,
        IconLock,
        IconEye,
    },
    setup() {
        const currentPage = ref(1);
        const pageSize = ref(10);
        const aList = ref([]);
        const total = ref(0);
        const articleForm = ref({})
        const aListType = ref('100');
        const detailVisible = ref(false);
        const editArticle = (k) => {
            articleForm.value = JSON.parse(JSON.stringify(aList.value[k]));
            detailVisible.value = true;
        };
        const cancelEdit = () => {
            detailVisible.value = false;
        };
        const handleSubmit = () => {
            console.log(articleForm);
        };
        const dateToNow = (timestamp) => {
            return TimeUtils.getTimeDiff(timestamp)
        };
        const handlePageChange = async (page) => {
            currentPage.value = page;
            const v = {
                audit: aListType.value,
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            };
            const res = await getAuditArtcle(v);
            aList.value = res.data.data ? res.data.data.list : [];
            total.value = res.data.data ? res.data.data.total : 0;
            aList.value.forEach((item) => {
                item.auditStatus = item.audit === 1 ? true : false;
            });
        };
        const previewArticle = (id) => {
            window.open(`/articleDetail/${id}`);
        };

        const handleAuditChange = async () => {
            const v = {
                audit: aListType.value,
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            };
            const res = await getAuditArtcle(v);
            aList.value = res.data.data ? res.data.data.list : [];
            total.value = res.data.data ? res.data.data.total : 0;
            aList.value.forEach((item) => {
                item.auditStatus = item.audit === 1 ? true : false;
            });
        }

        const getAList = async () => {
            const v = {
                audit: 100,
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            };
            const res = await getAuditArtcle(v);
            aList.value = res.data.data ? res.data.data.list : [];
            total.value = res.data.data ? res.data.data.total : 0;
            aList.value.forEach((item) => {
                item.auditStatus = item.audit === 1 ? true : false;
            });
        };
        const switchAudit = async (value) => {
            const v = {
                articleId: articleForm.value.articleId,
                audit: value ? 1 : 0
            }
            const res = await updateAudit(v);
            if (res.data.code === 100) {
                Message.success('审核状态修改成功');

            } else {
                Message.error('审核状态修改失败');
            }
            getAList();
        }
        const delArticle = async (aid) => {
            const res = await deleteArticle(aid);
            if (res.data.code === 100) {
                Message.success('删除成功');
            } else {
                Message.error('删除失败');
            }
            handleAuditChange();
        }
        const refreshArticleList = async () => {
            currentPage.value = 1;
            const v = {
                audit: aListType.value,
                pageNum: currentPage.value,
                pageSize: pageSize.value,
            };
            const res = await getAuditArtcle(v);
            if (res.data.code === 100) {
                aList.value = res.data.data ? res.data.data.list : [];
                total.value = res.data.data ? res.data.data.total : 0;
                aList.value.forEach((item) => {
                    item.auditStatus = item.audit === 1 ? true : false;
                });
                Message.success('文章列表刷新成功');
            } else {
                Message.error('文章列表刷新失败');
            }


        }
        return {
            detailVisible,
            editArticle,
            articleForm,
            cancelEdit,
            dateToNow,
            handleSubmit,
            aList,
            getAList,
            currentPage,
            pageSize,
            handlePageChange,
            total,
            aListType,
            handleAuditChange,
            switchAudit,
            delArticle,
            previewArticle,
            refreshArticleList
        };
    },
    created() {
        this.getAList();
    },
    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="less" scoped>
.top-actions {
    display: flex;
    gap: 1rem;
}

.footer-page {
    display: flex;
    justify-content: flex-end;
    margin: 1rem;
}

.edit-btn {
    .btns {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        width: 100%;

        .btn {
            display: flex;
            justify-content: flex-end;
        }
    }

}

.artice-list {
    margin: 1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);

    .title-info {
        display: flex;
        align-items: center;

        .title {
            font-size: 16px;
            color: var(--color-neutral-10);
            margin-right: .5rem;
        }
    }


    .sumary {
        font-size: 12px;
        color: var(--color-neutral-6);
        line-height: 22px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        max-width: 90%;
    }
}

.top-card {
    margin: 1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.user-top {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .top-title {
        display: flex;
        align-items: flex-end;
        gap: 5px;
        margin-left: 1rem;
        font-size: 1.5rem;
    }
}
</style>
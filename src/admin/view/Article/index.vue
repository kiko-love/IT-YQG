<template>
    <div>
        <a-card class="top-card">
            <div class="user-top">
                <div class="top-title">
                    <icon-book />文章管理
                </div>
                <div class="top-actions">
                    <a-button shape="round">
                        <template #icon>
                            <icon-refresh />
                        </template>
                    </a-button>
                </div>
            </div>
        </a-card>
        <a-list class="user-list">
            <a-list-item v-for="idx in 4" :key="idx">
                <a-list-item-meta>
                    <template #title>
                        <div class="title">文章标题</div>
                    </template>
                    <template #description>
                        <div class="sumary">文章摘要</div>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <icon-edit @click="editArticle" />
                    <icon-delete />
                </template>
            </a-list-item>
        </a-list>
    </div>
    <a-modal v-model:visible="detailVisible" simple :footer="null">
        <template #title>
            文章信息修改
        </template>
        <div>
            <a-form :model="articleForm" @submit="handleSubmit">
                <a-form-item field="artileId" label="文章Id">
                    <a-input v-model="articleForm.artileId" disabled />
                </a-form-item>
                <a-form-item field="title" label="文章标题">
                    <a-input v-model="articleForm.title" />
                </a-form-item>
                <a-form-item field="email" label="文章摘要">
                    <a-input v-model="articleForm.summary" />
                </a-form-item>
                <a-form-item field="createTime" label="注册日期">
                    <div>{{ timestampShow }}</div>
                </a-form-item>
                <a-form-item field="content" label="文章内容">
                    <a-textarea v-model="articleForm.content" :auto-size="{
                            minRows: 2,
                            maxRows: 5
                        }" />
                </a-form-item>
                <a-form-item field="audit" label="审核状态">
                    <a-switch v-model="articleForm.audit" disabled />
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
} from '@arco-design/web-vue/es/icon';
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
    },
    setup() {
        const articleForm = reactive({
            artileId: '',
            title: '',
            summary: '',
            content: '',
            likeCount: 0,
            readCount: 0,
            commentCount: 0,
            userId: '',
            createTime: '',
            audit: false,
        });
        const detailVisible = ref(false);
        const editArticle = () => {
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
        const timestampShow = computed(()=>{
            return dateToNow(articleForm.createTime)
        })
        return {
            detailVisible,
            editArticle,
            articleForm,
            cancelEdit,
            dateToNow,
            handleSubmit,
            timestampShow,
        };
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

.user-list {
    margin: 1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);

    .title {
        font-size: 16px;
        color: var(--color-neutral-10);
    }

    .sumary {
        font-size: 12px;
        color: var(--color-neutral-6);
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
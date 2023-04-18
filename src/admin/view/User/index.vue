<template>
    <div>
        <a-card class="top-card">
            <div class="user-top">
                <div class="top-title">
                    <IconUser />用户管理
                </div>
            </div>
        </a-card>
        <a-list class="user-list">
            <a-list-item v-for="idx in 10" :key="idx">
                <a-list-item-meta>
                    <template #title>
                        <div class="user-name-id">
                            <div class="name">ZYY</div>
                            <div class="id">(10000)</div>
                        </div>
                    </template>
                    <template #description>
                        <div class="user-des">
                            热爱前端，喜欢学习新的技术，希望能够成为一名优秀的前端工程师
                        </div>
                    </template>
                    <template #avatar>
                        <a-avatar shape="circle">
                            <img alt="avatar"
                                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                        </a-avatar>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <icon-edit @click="editUser" />
                    <a-popconfirm position="tr" content="是否确认删除该用户?"><icon-delete /></a-popconfirm>

                </template>
            </a-list-item>
        </a-list>
        <div class="footer-page">
            <a-pagination :total="50" :page-size="pageSize" show-total/>
        </div>
    </div>
    <a-modal v-model:visible="detailVisible" @ok="handleCancel" @cancel="handleCancel" simple :footer="null">
        <template #title>
            用户信息修改
        </template>
        <div>
            <a-form :model="editForm" @submit="handleSubmit">
                <a-form-item field="post" tooltip="对应每个用户的唯一ID" label="用户ID">
                    <a-input v-model="editForm.userId" />
                </a-form-item>
                <a-form-item field="name" label="用户名">
                    <a-input v-model="editForm.userName" />
                </a-form-item>
                <a-form-item field="password" tooltip="可以直接该用户密码" label="密码">
                    <a-input-password v-model="editForm.password" allow-clear/>
                </a-form-item>
                <a-form-item field="description" label="用户简介">
                    <a-textarea v-model="editForm.userDes" :auto-size="{
                        minRows: 2,
                        maxRows: 5
                    }" />
                </a-form-item>
                <a-form-item class="edit-btn">
                    <div class="btn"><a-button type="primary" html-type="submit">确认</a-button></div>
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
</template>
<script>
import { ref } from 'vue';
import {
    IconCaretRight,
    IconCaretLeft,
    IconIdcard,
    IconMessage,
    IconUser,
    IconUserGroup,
    IconBook,
    IconApps,
    IconEdit,
    IconDelete
} from '@arco-design/web-vue/es/icon';
export default {
    components: {
        IconCaretRight,
        IconCaretLeft,
        IconIdcard,
        IconMessage,
        IconUser,
        IconUserGroup,
        IconBook,
        IconApps,
        IconEdit,
        IconDelete
    },
    setup() {
        const pageSize = ref(10);
        const editForm = ref({
            userName: 'ZYY',
            userId: '10001',
            password: '12456',
            userDes: '热爱开发，喜欢学习新的技术，希望能够成为一名优秀的前端工程师'
        });
        const detailVisible = ref(false);
        const editUser = (index) => {
            detailVisible.value = true;
        };
        const handleCancel = () => {
            detailVisible.value = false;
        };
        const handleSubmit = () => {
            console.log(editForm.value);
            // detailVisible.value = false;
        };
        return {
            detailVisible,
            editForm,
            pageSize,
            editUser,
            handleCancel,
            handleSubmit
        };
    }
}
</script>
<style lang="less">
.footer-page{
    display: flex;
    justify-content: flex-end;
    margin: 1rem;
}
.edit-btn {
    text-align: center;

    .btn {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
}

.user-name-id {
    display: flex;
    align-items: center;
    gap: 5px;

    .name {
        font-size: 1rem;
    }

    .id {
        font-size: 1rem;
        color: #999;
    }
}

.user-des {
    font-size: 12px;
    color: #999;
}

.top-card {
    margin: 1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.user-list {
    margin: 1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.user-top {
    height: 2rem;
    display: flex;
    align-items: center;

    .top-title {
        display: flex;
        align-items: flex-end;
        gap: 5px;
        margin-left: 1rem;
        font-size: 1.5rem;
    }
}
</style>
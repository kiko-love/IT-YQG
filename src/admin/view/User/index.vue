<template>
    <div>
        <a-card class="top-card">
            <div class="user-top">
                <div class="top-title">
                    <IconUser />用户管理
                </div>
                <div class="top-actions">
                    <a-button shape="round">
                        <template #icon>
                            <icon-refresh @click="refreshUserList" />
                        </template>
                    </a-button>
                    <a-button type="primary" shape="round">
                        <template #icon>
                            <icon-plus @click="addUser" />
                        </template>
                    </a-button>
                </div>
            </div>
        </a-card>
        <a-card v-if="userListloading" class="spin-row">
            <a-spin tip="用户列表加载中..." />
        </a-card>
        <a-list v-else class="user-list">
            <a-list-item v-for="(i, k) in pagedUserList" :key="k">
                <a-list-item-meta>
                    <template #title>
                        <div class="user-name-id">
                            <div class="name">{{ i.userName }}</div>
                            <div class="id">（{{ i.userId }}）</div>
                            <div class="tags">
                                <a-tag v-if="i.roleId === '10002'" color="red" bordered>管理员</a-tag>
                                <a-tag v-else-if="i.roleId === '10001'" color="arcoblue" bordered>用户</a-tag>
                                <a-tag v-if="i.status === -1" color="gray" bordered>未激活</a-tag>
                            </div>
                        </div>
                    </template>
                    <template #description>
                        <div class="user-des">
                            {{ i.userDes ? i.userDes : '暂无简介' }}
                        </div>
                    </template>
                    <template #avatar>
                        <a-avatar shape="circle">
                            <img alt="avatar" :src="i.userAvatarUrl" />
                        </a-avatar>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <icon-edit @click="editUser(k)" />
                    <a-popconfirm @ok="delUser(k)" position="tr" content="是否确认删除该用户?"><icon-delete /></a-popconfirm>

                </template>
            </a-list-item>
        </a-list>
        <div class="footer-page">
            <a-pagination :current="currentPage" :total="userList.length" :page-size="pageSize" show-total
                @change="handlePageChange" />
        </div>
    </div>
    <a-modal v-model:visible="detailVisible" simple :footer="null">
        <template #title>
            用户信息修改
        </template>
        <div>
            <a-form :model="editForm" @submit="handleSubmit">
                <a-form-item field="userId" label="用户ID" tooltip="用户ID不可修改">
                    <a-input v-model="editForm.userId" disabled />
                </a-form-item>
                <a-form-item field="userName" label="用户名">
                    <a-input v-model="editForm.userName" />
                </a-form-item>
                <a-form-item field="email" label="用户邮箱">
                    <a-input v-model="editForm.email" />
                </a-form-item>
                <a-form-item field="createTime" label="注册日期">
                    <div class="form-createTime">{{ handleCreateTime(editForm.createTime) }}</div>
                </a-form-item>
                <a-form-item field="description" label="用户简介">
                    <a-textarea v-model="editForm.userDes" :auto-size="{
                        minRows: 2,
                        maxRows: 5
                    }" />
                </a-form-item>
                <a-form-item field="status" label="激活状态">
                    <a-switch v-model="editForm.status" @change="statusChange" :loading="switchLoading" />
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
    <a-modal v-model:visible="addVisible" simple :footer="null">
        <template #title>
            新增用户
        </template>
        <div>
            <a-form :model="addForm" @submit="handleAddSubmit">
                <a-form-item field="userName" label="用户名">
                    <a-input v-model="addForm.userName" placeholder="用户名" />
                </a-form-item>
                <a-form-item field="email" label="用户邮箱">
                    <a-input v-model="addForm.email" placeholder="用户绑定的邮箱" />
                </a-form-item>
                <a-form-item field="password" label="密码">
                    <a-input-password v-model="addForm.password" placeholder="用户密码" />
                </a-form-item>
                <a-form-item field="roleId" label="用户角色">
                    <a-radio-group v-model="addForm.roleId">
                        <a-radio value="10001">用户</a-radio>
                        <a-radio value="10002">管理员</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item field="description" label="用户简介">
                    <a-textarea v-model="addForm.userDes" placeholder="简介（选填）" :auto-size="{
                        minRows: 2,
                        maxRows: 5
                    }" />
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
import { adminUserlist } from '@/api/adminUserlist'
import { adminUpdateStatus } from '@/api/adminUpdateStatus'
import { adminUpdateUser } from '@/api/adminUpdateUser'
import { adminAddUser } from '@/api/adminAddUser'
import { adminDelUser } from '@/api/adminDelUser'
import { computed, reactive, ref } from 'vue';
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
    IconDelete,
    IconPlus,
    IconRefresh,
} from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';
import TimeUtils from '@/utils/timeUtils'
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
        IconDelete,
        IconPlus,
        IconRefresh,
    },
    methods: {
        handleCreateTime(time) {
            return TimeUtils.formatTime(time)
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        handleSubmit({ values, errors }) {
            console.log(values);
            adminUpdateUser(values).then(res => {
                console.log(res.data);
                if (res.data.code === 100) {
                    Message.success('用户信息修改成功');
                    this.detailVisible = false;
                } else {
                    Message.error('修改失败');
                }
            });
        },
    },
    created() {
        adminUserlist().then(res => {
            this.userList = res.data.data
            this.userList.forEach(element => {
                element.status = element.status === 0 ? true : false;
            });
            //深拷贝
            this.editForm = Object.assign({}, this.userList[this.currentIndex])

        });
    },
    setup() {
        const currentIndex = ref(0);
        const userList = ref([]);
        const pagedUserList = computed(() => {
            return userList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
        });
        const userListloading = ref(false);
        const switchLoading = ref(false);
        const pageSize = ref(5);
        const currentPage = ref(1);
        const refreshUserList = () => {
            userListloading.value = true;
            adminUserlist().then(res => {
                userList.value = res.data.data
                userList.value.forEach(element => {
                    element.status = element.status === 0 ? true : false;
                });
                if (res.data.code === 100) {
                    Message.success('刷新成功');
                } else {
                    Message.error('刷新失败');
                }
            }).catch(err => {
                if (err) {
                    Message.error(err);
                }
            }).finally(() => {
                userListloading.value = false;
            });
        }
        const addUser = () => {
            addVisible.value = true;
        }
        const delUser = (k) => {
            const userId = userList.value[k].userId;
            adminDelUser(userId).then(res => {
                if (res.data.code === 100) {
                    Message.success('用户删除成功');
                    adminUserlist().then(res => {
                        userList.value = res.data.data
                        userList.value.forEach(element => {
                            element.status = element.status === 0 ? true : false;
                        });
                    });
                } else {
                    Message.error('删除失败');
                }
            }).catch(err => {
                Message.error(err);
            });
        }
        const editForm = ref({});
        const addForm = reactive({});
        const handleAddSubmit = ({ values, errors }) => {
            console.log(values);
            adminAddUser(values).then(res => {
                console.log(res.data);
                if (res.data.code === 100) {
                    Message.success('用户添加成功');
                    addVisible.value = false;
                } else {
                    Message.error('添加失败');
                }
            }).catch(err => {
                Message.error(err);
            }).finally(() => {
                adminUserlist().then(res => {
                    userList.value = res.data.data
                    userList.value.forEach(element => {
                        element.status = element.status === 0 ? true : false;
                    });
                });
            });
        }
        const statusChange = () => {
            switchLoading.value = true;
            const v = {
                userId: editForm.value.userId,
                status: editForm.value.status
            }
            adminUpdateStatus(v).then(res => {
                if (res.data.code === 100) {
                    Message.success("用户状态修改成功");
                } else {
                    Message.error(res.data.msg);
                }
            }).catch(err => {
                Message.error(err);
            }).finally(() => {
                switchLoading.value = false;
            });
        }
        const detailVisible = ref(false);
        const addVisible = ref(false);
        const editUser = (index) => {
            currentIndex.value = index;
            editForm.value = Object.assign({}, userList.value[index]);
            detailVisible.value = true;
        };
        const cancelEdit = () => {
            detailVisible.value = false;
        };
        const handleCancel = () => {
            detailVisible.value = false;
        };
        return {
            detailVisible,
            addVisible,
            editForm,
            pageSize,
            editUser,
            handleCancel,
            userList,
            currentIndex,
            cancelEdit,
            statusChange,
            switchLoading,
            addUser,
            handleAddSubmit,
            addForm,
            currentPage,
            pagedUserList,
            delUser,
            refreshUserList,
            userListloading
        };
    }
}
</script>
<style lang="less">
.form-createTime {
    color: var(--color-neutral-6);
}

.spin-row {
    display: flex;
    margin: 1rem;
    justify-content: center;
}

.top-actions {
    display: flex;
    justify-content: flex-end;
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

.user-name-id {
    display: flex;
    align-items: center;
    gap: 8px;

    .name {
        font-size: 1rem;
    }

    .id {
        font-size: 13px;
        color: #999;
    }

    .tags {
        display: flex;
        gap: 5px;

        .tag {
            font-size: 12px;
            color: #999;
        }
    }
}

.user-des {
    margin-right: 2rem;
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
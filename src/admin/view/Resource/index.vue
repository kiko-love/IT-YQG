<template>
    <div>
        <a-card class="top-card">
            <div class="user-top">
                <div class="top-title">
                    <IconUser />资源管理
                </div>
                <div class="top-actions">
                    <a-button shape="round" @click="refreshResourceList">
                        <template #icon>
                            <icon-refresh />
                        </template>
                    </a-button>
                </div>
            </div>
        </a-card>
        <a-card v-if="resListloading" class="spin-row">
            <a-spin tip="资源列表加载中..." />
        </a-card>
        <a-list v-else class="user-list">
            <a-list-item v-for="(i, k) in pageResourceList" :key="k">
                <a-list-item-meta>
                    <template #title>
                        <div class="user-name-id">
                            <div class="name">{{ i.title }}</div>
                            <div class="id">
                                <!-- <a-tag v-if="i.fee === 0" color="green">免费</a-tag>
                                <a-tag v-else color="red">付费</a-tag> -->
                            </div>
                            <div class="tags">
                                <a-tag class="status-tag" color="green" v-if="i.status === 1">已审核通过</a-tag>
                                <a-tag class="status-tag" color="red" v-else-if="i.status === -1">审核未通过</a-tag>
                                <a-tag class="status-tag" color="arcoblue" v-else>待审核</a-tag>
                            </div>
                        </div>
                    </template>
                    <template #description>
                        <div class="user-des">
                            {{ i.description ? i.description : '暂无简介' }}
                        </div>
                    </template>
                    <template #avatar>
                        <a-avatar shape="circle" :style="{ background: 'transparent' }">
                            <img alt="avatar" src="https://i.328888.xyz/2023/04/23/iSpr2P.png" />
                        </a-avatar>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <icon-edit @click="editResource(k)" />
                    <a-popconfirm @ok="delResource(i.id)" position="tr" content="是否确认删除该资源?"><icon-delete /></a-popconfirm>

                </template>
            </a-list-item>
        </a-list>
        <div class="footer-page">
            <a-pagination :current="currentPage" :total="resList.length" :page-size="pageSize" show-total
                @change="handlePageChange" />
        </div>
    </div>
    <a-modal v-model:visible="detailVisible" simple :footer="null">
        <template #title>
            资源审核
        </template>
        <div>
            <a-form :model="editForm" @submit="handleSubmit">
                <a-form-item field="id" label="资源ID" tooltip="资源ID不可修改">
                    <a-input v-model="editForm.id" disabled />
                </a-form-item>
                <a-form-item field="title" label="资源名">
                    {{ editForm.title }}
                </a-form-item>
                <a-form-item field="fileType" label="资源类型">
                    {{ editForm.fileType }}
                </a-form-item>
                <a-form-item label="上传用户">
                    <div class="userForm-item">
                        <a-avatar :image-url="editForm.user?.userAvatarUrl">
                        </a-avatar>
                        <div>
                            <div class="userName">{{ editForm.user?.userName }}</div>
                            <div class="userId">{{ editForm.user?.userId }}</div>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item field="createTime" label="注册日期">
                    <div class="form-createTime">{{ handleCreateTime(editForm.createTime) }}</div>
                </a-form-item>
                <a-form-item field="description" label="资源简介">
                    <a-textarea v-model="editForm.description" :auto-size="{
                            minRows: 2,
                            maxRows: 5
                        }" />
                </a-form-item>
                <a-form-item field="status" label="审核状态">
                    <a-tag class="status-tag" color="green" v-if="editForm.status === 1">已审核通过</a-tag>
                    <a-tag class="status-tag" color="red" v-else-if="editForm.status === -1">审核未通过</a-tag>
                    <a-tag class="status-tag" color="arcoblue" v-else>待审核</a-tag>
                </a-form-item>
                <a-form-item class="edit-btn">
                    <div class="btns">
                        <div class="btn"><a-button type="primary" status="success"
                                @click="handleAudit(editForm.id, 1)">通过</a-button>
                        </div>
                        <div class="btn"><a-button type="primary" status="danger"
                                @click="handleAudit(editForm.id, -1)">不通过</a-button>
                        </div>
                        <!-- <div class="btn"><a-button @click="cancelEdit">取消</a-button></div> -->
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
    <a-modal v-model:visible="addVisible" simple :footer="null">
        <template #title>
            新增资源
        </template>
        <div>
            <a-form :model="addForm" @submit="handleAddSubmit">
                <a-form-item field="userName" label="资源名">
                    <a-input v-model="addForm.title" placeholder="资源名" />
                </a-form-item>
                <a-form-item field="fileType" label="资源类型">
                    <a-input v-model="addForm.fileType" />
                </a-form-item>
                <a-form-item field="password" label="密码">
                    <a-input-password v-model="addForm.password" placeholder="资源密码" />
                </a-form-item>
                <a-form-item field="roleId" label="资源角色">
                    <a-radio-group v-model="addForm.roleId">
                        <a-radio value="10001">资源</a-radio>
                        <a-radio value="10002">管理员</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item field="description" label="资源简介">
                    <a-textarea v-model="addForm.description" placeholder="" :auto-size="{
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
import { getAllResource, updateAudit, deleteResource } from "@/api/adminResourceApi"
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
                    Message.success('资源信息修改成功');
                    this.detailVisible = false;
                } else {
                    Message.error('修改失败');
                }
            });
        },
    },
    created() {
        this.getAllList()
    },
    setup() {
        const currentIndex = ref(0);
        const resList = ref([]);
        const pageResourceList = computed(() => {
            return resList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
        });
        const resListloading = ref(false);
        const switchLoading = ref(false);
        const pageSize = ref(5);
        const currentPage = ref(1);
        const editForm = ref({});
        const addForm = reactive({});
        const getAllList = () => {
            getAllResource().then(res => {
                resList.value = res.data.data
                resList.value.forEach(item => {
                    item.auditStatus = item.status === 1 ? true : false
                })
                //深拷贝
                editForm.value = Object.assign({}, resList.value[currentIndex.value])

            });
        }
        const handleAddSubmit = ({ values, errors }) => {
            console.log(values);
            adminAddUser(values).then(res => {
                console.log(res.data);
                if (res.data.code === 100) {
                    Message.success('资源添加成功');
                    addVisible.value = false;
                } else {
                    Message.error('添加失败');
                }
            }).catch(err => {
                Message.error(err);
            }).finally(() => {
                adminUserlist().then(res => {
                    resList.value = res.data.data
                    resList.value.forEach(element => {
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
                    Message.success("资源状态修改成功");
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
        const editResource = (index) => {
            currentIndex.value = index;
            editForm.value = Object.assign({}, resList.value[index]);
            console.log(editForm.value);
            detailVisible.value = true;
        };
        const cancelEdit = () => {
            detailVisible.value = false;
        };
        const handleCancel = () => {
            detailVisible.value = false;
        };
        const handleAudit = async (rfileId, raudit) => {
            const v = {
                fileId: rfileId,
                audit: raudit
            }
            const res = await updateAudit(v)
            if (res.data.code === 100) {
                Message.success("资源审核成功");
            } else {
                Message.error(res.data.msg);

            }
            getAllList()
            detailVisible.value = false;

        }
        const delResource = async (fid) => {
            const res = await deleteResource(fid)
            if (res.data.code === 100) {
                Message.success("资源删除成功");
            } else {
                Message.error(res.data.msg);

            }
            getAllList()
            detailVisible.value = false;
        }
        const refreshResourceList = async ()=>{
            const res = await getAllResource()
            if (res.data.code === 100) {
                resList.value = res.data.data
                resList.value.forEach(item => {
                    item.auditStatus = item.status === 1 ? true : false
                })
                Message.success("资源列表刷新成功");
            } else {
                Message.error(res.data.msg);

            }
        }
        return {
            detailVisible,
            addVisible,
            editForm,
            pageSize,
            editResource,
            handleCancel,
            resList,
            currentIndex,
            cancelEdit,
            statusChange,
            switchLoading,
            handleAddSubmit,
            addForm,
            currentPage,
            pageResourceList,
            resListloading,
            handleAudit,
            getAllList,
            delResource,
            refreshResourceList,
        };
    }
}
</script>
<style lang="less">
.userForm-item {
    display: flex;
    align-items: center;
    gap: .5rem;
    .userName{
        font-size: 16px;
    }
    .userId{
        font-size: 12px;
        color: var(--color-neutral-6);
    }
}

.status-tag {
    margin-left: .5rem;
}

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
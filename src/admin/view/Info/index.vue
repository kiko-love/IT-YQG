<template>
    <div>
        <a-card class="admin-info-card">
            <div class="info-main">
                <a-avatar
                class="info-avatar"
                :style="{
                    backgroundColor: '#3370ff',
                    'user-select': 'none',
                }"
                :size="64">
                    <IconUser />
                    <!-- <img v-else alt="avatar" :src="user.userAvatarUrl" /> -->
                </a-avatar>
                <div class="info-tags"><a-tag color="red">管理员</a-tag></div>
                <a-typography>
                    <a-typography-title :heading="6">
                        用户名：ZYY
                    </a-typography-title>
                    <a-typography-title :heading="6">
                        用户ID：10000
                    </a-typography-title>
                    <a-typography-title :heading="6">
                        用户权限：all
                    </a-typography-title>
                </a-typography>
            </div>
        </a-card>
    </div>
</template>
<script lang="ts">
import {
    IconCaretRight,
    IconCaretLeft,
    IconIdcard,
    IconMessage,
    IconUser,
    IconUserGroup,
    IconBook,
    IconApps
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
        IconApps
    },
    setup(props, ctx) {
        
        return {};
    },

}
</script>
<style lang="less">
.admin-info-card {
    margin: 1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    .info-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        .info-tags {
            margin-top: 1rem;
        }
        .info-avatar{
        }
    }
}
</style>
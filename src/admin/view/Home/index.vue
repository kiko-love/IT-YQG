<template>
    <a-layout style="height: 100%;">
        <a-layout-header class="admin-header">
            <div>
                <div class="admin-logo">
                    <img src="@/assets/logo-icon.svg" alt="logo" height="40" />
                    <div class="title">猿趣阁后台终端</div>
                </div>
            </div>
            <div class="admin-avatar">
                <a-popover position="br" trigger="click" popup-container=".myAvatar">
                    <a-avatar :style="{
                        backgroundColor: '#3370ff',
                        cursor: 'pointer',
                        'user-select': 'none',
                    }">
                        <IconUser />
                        <!-- <img v-else alt="avatar" :src="user.userAvatarUrl" /> -->
                    </a-avatar>
                </a-popover>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider collapsible>
                <a-menu :defaultSelectedKeys="['info']" :style="{ width: '100%' }" @menuItemClick="onClickMenuItem">
                    <a-menu-item key="info">
                        <icon-idcard />
                        管理员信息
                    </a-menu-item>
                    <a-menu-item key="user">
                        <icon-user-group />
                        用户管理
                    </a-menu-item>
                    <a-menu-item key="comment">
                        <icon-message />
                        评论管理
                    </a-menu-item>
                    <a-sub-menu key="1">
                        <template #title>
                            <span>
                                <icon-book />文章
                            </span>
                        </template>
                        <a-menu-item key="articleManager">文章管理</a-menu-item>
                        <a-menu-item key="articleAudit">文章审核</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="4">
                        <template #title>
                            <span>
                                <icon-apps />资源
                            </span>
                        </template>
                        <a-menu-item key="resourceManager">资源管理</a-menu-item>
                        <a-menu-item key="resourceAudit">资源审核</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout-content>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
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
    setup() {
        const router = useRouter();
        const collapsed = ref(false);
        const onClickMenuItem = (e) => {
            console.log(e);
        };
        return {
            collapsed,
            onClickMenuItem,
        };
    },

}
</script>
<style lang="less">
.admin-header {
    height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .admin-avatar {
        margin-right: 2rem;
    }

    .admin-logo {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 1rem;

        .title {
            font-size: 20px;
            font-weight: 600;
            margin-left: 5px;
        }
    }
}
</style>
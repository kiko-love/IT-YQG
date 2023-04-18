<template>
    <div class="admin-login-container">
        <a-layout style="height: 100%;">
            <a-layout>
                <a-layout-sider class="login-sider" theme="dark">
                    <div class="ape-logo">
                        <div><img src="@/assets/logo-icon.svg" width="33" alt="logo"></div>
                        <div class="title">Ape Fun Pavilion</div>
                    </div>
                </a-layout-sider>
                <a-layout-content class="content">
                    <div>
                        <div class="content-inner">
                            <a-typography-title :heading="4">
                                登录猿趣阁后台
                            </a-typography-title>
                            <a-typography-title class="sub-title" :heading="6">
                                请使用管理员账号登录
                            </a-typography-title>
                            <a-form :model="loginform" auto-label-width @submit="login">
                                <a-form-item field="username" hide-label>
                                    <a-input v-model="loginform.username" placeholder="admin用户名">
                                        <template #prefix>
                                            <icon-user />
                                        </template>
                                    </a-input>
                                </a-form-item>
                                <a-form-item field="password" hide-label>
                                    <a-input-password v-model="loginform.password" placeholder="密码" allow-clear>
                                        <template #prefix>
                                            <icon-lock />
                                        </template>
                                    </a-input-password>
                                </a-form-item>
                                <a-form-item field="isRead" hide-label>
                                    <a-checkbox v-model="loginform.remember"> 记住密码 </a-checkbox>
                                </a-form-item>
                                <a-form-item hide-label>
                                    <a-button type="primary" html-type="submit" long>登录</a-button>
                                </a-form-item>
                            </a-form>
                        </div>

                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>
<script>
import { reactive } from 'vue'
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon'
import { Message } from '@arco-design/web-vue';
import sha256 from 'js-sha256'
import { useRouter } from 'vue-router'
export default {
    components: {
        IconUser,
        IconLock
    },
    setup() {
        const router = useRouter()
        const loginform = reactive({
            username: '',
            password: '',
            remember: false
        })
        const initLoginForm = ()=>{
            const loginInfo = JSON.parse(localStorage.getItem('loginForm'))
            if(loginInfo){
                loginform.username = loginInfo.username
                loginform.password = loginInfo.password
                loginform.remember = loginInfo.remember
            }
        }
        initLoginForm()
        const login = (data) => {
            if (data.values.remember) {
                localStorage.setItem('loginForm', JSON.stringify(data.values))
            }
            Message.success({
                content:'登录成功',
                onClose:()=>{
                    router.replace('/adminHome')
                }
            })
        }
        return {
            loginform,
            login
        }
    }

}
</script>
<style lang="less" scoped>
.admin-login-container {
    height: 100%;

    .login-sider {
        width: 550px !important;
        background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);

        .ape-logo {
            display: flex;
            margin:1rem;
            align-items: center;
            .title {
                color: var(--color-fill-1);
                font-size: 20px;
                font-weight: 500;
                margin: 1rem 2rem 1rem 0.2rem;
            }
        }
    }

    .content {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        height: 100vh;

        .content-inner {
            width: 320px;
            margin-top: -5rem;
            .sub-title {
                color: var(--color-text-3);
                margin: 1rem 0;
            }
        }
    }
}
</style>
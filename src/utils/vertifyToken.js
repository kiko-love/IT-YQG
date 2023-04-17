import { userStore } from "@/store/userStore";
import { Message } from '@arco-design/web-vue';
import { validateToken } from "@/api/validateToken";
import { useRouter, useRoute } from "vue-router";

const vertifyToken = async () => {
    const userInfo = userStore();
    const router = useRouter();
    const route = useRoute()
    const token = localStorage.getItem('login_token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
        // 发送请求验证 token 是否有效
        const v = {
            token: token,
            userId: user.userId
        }
        const res = await validateToken(v);
        const isExpire = res.data.data.isExpire;
        if (isExpire) {
            // token 有效，继续导航
            userInfo.loginStatus = true;
        } else {
            // token 无效，跳转到登录页面
            localStorage.removeItem("login_token");
            userInfo.loginStatus = false;
            Message.info({
                content: '登录已过期，请重新登录',
                onClose: () => {
                    if (route.name !== 'home') {
                        router.replace('/home')
                    }
                },
            }
            );

        }
    } else {
        // 没有 token，跳转到登录页面

    }
}

export { vertifyToken }

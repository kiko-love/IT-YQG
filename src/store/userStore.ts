import { defineStore } from 'pinia'

export const userStore = defineStore({
    id: 'userInfo',  // 命名，唯一
    state: () => {
        return {
            userId:'',
            username: "ZYY",
            usercoin: 9999,
            userexp:400,//500最大值
            userAvatarUrl:'',
            loginStatus:false,
        }
    },
    actions: {
        setUserName(name:string) {
            // 可直接通过this访问state属性
            this.username = name;
        },
        setUserCoin(coin:number) {
            this.usercoin = coin
        },
        setUserValue(value:number) {
            this.userexp = value
        },
    }
})

<template>
    <div class="detail-row">
        <a-row v-if="!notFountShow">
            <a-col :xs="0" :sm="2" :md="2" :lg="2" :xl="2" :xxl="2">

            </a-col>
            <a-col :xs="24" :sm="22" :md="22" :lg="16" :xl="16" :xxl="16">
                <div>
                    <a-card class="detail-card">
                        <div class="detail-top">
                            <div class="d-title">{{ article?.title }}</div>
                            <div class="d-user">
                                <a-avatar class="user-avatar" :style="{ backgroundColor: '#3370ff' }"
                                    :image-url="article.user?.userAvatarUrl">
                                    <IconUser />
                                    <!-- <img :src="article.user.userAvatarUrl" alt=""> -->
                                </a-avatar>
                                <div class="user-info">
                                    <div class="username">{{ article.user?.userName }}</div>
                                    <div class="creatime">{{ article.createTime }}</div>
                                </div>
                            </div>
                            <div class="d-tags">
                                <a-tag v-for="(i, k) in article.tagsArray" color="blue" :key="k">{{ i }}</a-tag>
                            </div>
                            <div>
                                <a-space>
                                    <template #split>
                                        <a-divider direction="vertical" />
                                    </template>
                                    <div class="d-num-info">
                                        <div>
                                            <icon-eye />
                                            <span>阅读</span>
                                        </div>
                                        <div>{{ article.readCount }}</div>
                                    </div>
                                    <div class="d-num-info">
                                        <div><icon-thumb-up /><span>点赞</span></div>
                                        <div>{{ article.likeCount }}</div>
                                    </div>
                                </a-space>
                            </div>
                            <a-divider />
                            <div>
                            </div>
                        </div>
                        <div class="d-content" id="htmlContent" ref="content" v-html="article.detailContent"></div>
                    </a-card>
                </div>
            </a-col>
            <a-col :xs="0" :sm="0" :md="0" :lg="6" :xl="6" :xxl="6">
                <div class="detail-right">
                    <a-card class="affix-outline">
                        <div id="toc">
                            <div class="tip">目录</div>
                            <a-divider />
                            <div v-if="toc.length">
                                <Toc :nodes="toc"></Toc>
                            </div>
                        </div>
                    </a-card>
                </div>
            </a-col>
        </a-row>

        <a-card v-else>
            <a-result :status="null">
                <template #icon>
                    🐱‍🏍
                </template>
                <template #title>

                    <div class="notfound-title">
                        文章好像飞到三体星去了
                    </div>
                </template>
                <template #subtitle>
                    <div>
                        <div>若无法访问文章内容，请查看您的文章是否处于
                            <span class="a-audit">审核</span>
                            或者
                            <span class="a-hide">隐藏</span>
                            状态
                        </div>
                        <img src="https://i.328888.xyz/2023/04/24/iSsOGP.png" height="200" alt="">
                    </div>
                </template>

            </a-result>
        </a-card>
    </div>
</template>
<script>
import { IconUser, IconEye, IconThumbUp } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'
import { getArticleDetail } from '@/api/articleApi'
import { reactive, ref } from 'vue'
import Toc from '@/components/Toc.vue';

export default {
    name: 'articleDetail',
    components: {
        IconUser,
        IconEye,
        IconThumbUp,
        Toc
    },
    setup() {
        const content = ref(null)
        const toc = ref([])
        const router = useRouter()
        const article = ref({})
        const notFountShow = ref(false)
        const aid = router.currentRoute.value.params.articleId
        const getDetail = (aid) => {
            getArticleDetail(aid).then(res => {

                if (res.data.code === 100) {
                    article.value = res.data.data
                } else {
                    notFountShow.value = true
                }
            })
        }
        getDetail(aid)
        return {
            router,
            aid,
            getDetail,
            article,
            notFountShow,
            toc,
            content,
        }
    },
    mounted() {

        setTimeout(() => {
            this.content = this.$refs.content;
            this.toc = this.generateToc();
        }, 1000)
    },
    methods: {
        getLink(node) {
            return '#' + node.title.toLowerCase().replace(/\s+/g, '-')
        },
        generateToc() {
            let headings = this.content.querySelectorAll('h1,h2,h3');
            console.log(this.buildTree(headings));
            return this.buildTree(headings);

        },
        buildTree(headings) {
            let toc = [];
            let stack = [];
            for (let i = 0; i < headings.length; i++) {
                let title = headings[i].textContent;
                let level = parseInt(headings[i].tagName.charAt(1));
                let node = { title: title, children: [] };

                while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                    stack.pop();
                }

                if (stack.length > 0) {
                    stack[stack.length - 1].children.push(node);
                } else {
                    toc.push(node);
                }

                node.level = level;
                stack.push(node);
            }

            return toc;
        }
    }
}

</script>
<style lang="less">
#toc {
    .tip {
        font-weight: 500;
        margin: 0 1.667rem;
        font-size: 20px;
        line-height: 2rem;
        color: #1d2129;
    }
}

.d-content {

    img {
        max-width: 100%;
        border-style: none;
        object-fit: cover;
    }

    a {
        color: #0269c8;
        text-decoration: none;
        border-bottom: 1px dashed rgb(var(--arcoblue-3));
    }

    h2 {
        font-size: 22px;
        line-height: 34px;
        padding-bottom: 12px;
        border-bottom: 1px solid #ececec;
    }

    h3 {
        font-size: 20px;
        line-height: 28px;
        margin: 1rem 0;
    }

    p {
        line-height: 1.5rem;
        margin-top: 22px;
        margin-bottom: 22px;
    }

}

.a-audit {
    color: rgb(var(--arcoblue-6));
}

.a-hide {
    color: var(--color-neutral-6);
}

.notfound-title {
    font-size: 18px;
    color: var(--color-neutral-8);
    margin-bottom: 1rem;
}

.detail-card {
    padding: 1.5rem;
    margin-bottom: 5rem;
}

.detail-right {
    // padding: 1rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;

    .affix-outline{
        position: fixed;
        min-width: 244px;
    }
}


.detail-row {
    padding: 1rem;
    overflow: auto;
    height: 100%;
}

.d-num-info {
    display: flex;
    gap: .625rem;
    color: var(--color-neutral-6);
}

.d-tags {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
}

.d-user {
    display: flex;
    align-items: center;
    padding: 1rem;

    .user-avatar {
        width: 40px;
        height: 40px;
        margin-right: 1rem;
    }

    .user-info {
        display: flex;
        flex-direction: column;

        .username {
            font-size: 18px;
            color: var(--color-neutral-8);
        }

        .creatime {
            font-size: 14px;
            color: var(--color-neutral-5);
        }
    }

    .ant-avatar {
        margin-right: 10px;
    }
}

.detail-top {
    .d-title {
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 2rem;
        color: var(--color-neutral-10);
    }

}
</style>
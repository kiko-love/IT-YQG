<template>
    <div class="toc-list">
        <ul class="toc">
            <li v-for="(node, k) in nodes">
                <div class="a-container" :class="{ 'hash-active': nextHash === getLink(node.id) }" :title="node.title">
                    <a :href="getLink(node.id)" :class="node.children ? 'has-children' : ''"
                        @click="toActive(getLink(node))">{{ node.title }}</a>
                </div>
                <Toc v-if="node.children" :nodes="node.children"></Toc>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default {
    name: 'Toc',
    props: {
        nodes: {
            type: Array,
            default: () => []
        },
        uuidList: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const router = useRouter()
        const nextHash = ref('')
        const firstLoad = ref(true)
        const ulist = ref([])
        const toActive = (hash) => {
            router.beforeEach((to, from, next) => {
                nextHash.value = to.hash;
                next(); // 确保导航成功
            });
        }
        toActive()
        ulist.value = props.uuidList
        return {
            toActive,
            nextHash,
            firstLoad,
            ulist,
        }
    },
    created() {
        // this.nextHash = this.getLink(this.$props.nodes[0])
    },
    methods: {
        getLink(node) {
            return '#' + node
        },

    }
}
</script>
  
<style lang="less" scoped>
.a-container {
    padding: 10px 0 10px 16px;
    border-radius: 4px;
    margin-bottom: 10px;

    &:hover {
        background: #f4f4f4;

    }
}

.hash-active {
    background: #f4f4f4;
    font-weight: bold;
    position: relative;

    a {
        color: rgb(var(--arcoblue-6)) !important;
    }

    &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 0;
        margin-top: 7px;
        width: 4px;
        height: 24px;
        background: rgb(var(--arcoblue-5));
        border-radius: 0 2px 2px 0;
    }
}

.toc-list {
    position: relative;
    line-height: 1rem;
}

/* 添加以下样式 */
.toc {
    list-style: none;
    margin: 0;
    padding: 0;
    font-weight: 500;
    color: var(--color-neutral-8);
}

.toc li {
    margin: 0;
    padding: 0;
}

.toc a {
    color: var(--color-neutral-8);
    text-decoration: none;
    display: inline-block;
    width: 99%;
    height: 100%;
    white-space: nowrap;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.toc a:hover {}

.toc .has-children::before {
    color: #777;
}

.toc:not(.has-children) {
    padding-left: 15px;
    margin-right: 5px;

}
</style>
  
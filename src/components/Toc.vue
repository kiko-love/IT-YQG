<template>
    <div class="toc-list">
        <ul class="toc">
        <li v-for="node in nodes">
            <div class="a-container" :title="node.title">
                <a :href="getLink(node)" :class="node.children ? 'has-children' : ''" >{{ node.title }}</a>
            </div>
            <Toc v-if="node.children" :nodes="node.children"></Toc>
        </li>
    </ul>
    </div>
</template>
  
<script>
export default {
    name: 'Toc',
    props: ['nodes'],
    methods: {
        getLink(node) {
            return '#' + node.title.toLowerCase().replace(/\s+/g, '-')
        }
    }
}
</script>
  
<style lang="less" scoped>
.a-container{
    padding: 12px;
    &:hover{
        background: #f4f4f4;
    }
}
.toc-list{
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
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.toc a:hover {

}

.toc .has-children::before {
    color: #777;
}
.toc:not(.has-children){
    padding-left: 26px;
}
</style>
  
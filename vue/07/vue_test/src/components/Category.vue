<template>
    <div class="categroy">
        <h3>{{title}}</h3>
        <!-- 具名插槽 -->
        <slot name="title"></slot>
        <ul>
            <li v-for="(item, index) in listData" :key="index">{{ item }}</li>
        </ul>
        <!-- 定义一个插槽（挖个坑，等着组件使用者进行填充） -->
        <slot>我是默认值，当没有传递具体结构时，会展示这个，如果传了，则会覆盖这里的内容</slot>
    </div>
</template>
<script>

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        listData: {
            type: Array,
            default: []
        }
    }
}
</script>


<style scoped>
    .categroy{
        background-color: aqua;
        width: 200px;
        margin: 20px;
    }
    .categroy ul li {
        width: 200px;
        height: 50px;
    }
    .categroy img {
        width: 200px;
    }
</style>
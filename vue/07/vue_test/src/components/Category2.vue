<template>
    <div class="categroy">
        <h3>{{title}}</h3>
        <slot :games2="games2"></slot>
    </div>
</template>
<script>

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        // listData: {
        //     type: Array,
        //     default: []
        // }
    },
    data() {
        return {
            games2: ['消消乐','糖吃蛇','打豆豆','打地鼠'],
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
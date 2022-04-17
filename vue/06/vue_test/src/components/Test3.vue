<template>
<!-- 多个元素过渡需要用 transition-group -->
    <div>
        <button @click="change">显示/隐藏</button>
        <transition-group name="hello">
            <h1 v-show="isShow" key='1'>你好呀</h1>
            <h1 v-show="isShow" key='2'>你好呀</h1>
        </transition-group>
    </div>
</template>
<script>

export default {
    name: 'School',
    props:['getSchoolName'],
    data() {
        return {
            isShow: true,
        }
    },
    methods: {
        change() {
            this.isShow = !this.isShow;
        }
    },
    
}
</script>

<style scoped>
    h1 {
        background-color: #ccc;
    }
    
    /* 进入的起点 */
    .hello-enter {
        transform: translateX(-100%);
    }
    /* 进入的过程 */
    .hello-enter-active {
        transition: 0.5 linear;
    }
    /* 进入的终点 */
    .hello-enter-to {
        transform: translateX(0);
    }
    /* 离开的起点 */
    .hello-leave {
        transform: translateX(0);
    }
    /* 离开的终点 */
    .hello-leave-to {
        transform: translateX(-100%);
    }
    /* 离开的过程 */
    .hello-leave-active {
        transition: 0.5 linear;
    }
</style>
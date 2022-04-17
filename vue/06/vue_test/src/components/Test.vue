<template>
<!-- 用动画写 -->
    <div>
        <button @click="change">显示/隐藏</button>
        <!-- appear: 在一开始的时候有个动画 -->
        <transition appear>
            <h1 v-show="isShow">你好呀</h1>
        </transition>

        <!-- 还可以加上name属性，但是加上之后，下面的样式不能用 v-而要用属性值hell- -->
        <transition appear name="hello">
            <h1 v-show="isShow">你好呀</h1>
        </transition>
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

<style>
    h1 {
        background-color: #ccc;
    }
    .v-enter-active{ 
        animation: test1 1s;
    }
    .v-leave-active {
        animation: test1 1s reverse;
    }
    .hello-enter-active{ 
        animation: test1 1s;
    }
    .hello-leave-active {
        animation: test1 1s reverse;
    }
    /* 动画 */
    @keyframes test1 {
        from {
            transform: translateX(-100px);
        }
        to {
            transform: translateX(0px);
        }
    }
</style>
<template>
<!-- 多个元素过渡需要用 transition-group -->
    <div>
        <button @click="change">显示/隐藏</button>
        <transition-group
         name="animate__animated animate__bounce"
         enter-active-class="animate__swing"
         leave-active-class="animate__rollOut"
        >
            <h1 v-show="isShow" key='1'>你好呀</h1>
        </transition-group>
    </div>
</template>
<script>
import 'animate.css';

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
</style>
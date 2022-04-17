<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <button @click="showDom" ref="btn">点我展示输出上方的DOM</button>
        <School ref="school" />
    </div>
</template>

<script>
import School from './components/School.vue'

export default {
    name: 'App',
    components: {
        School,
    },
    data() {
        return {
            msg: '欢迎光临'
        }
    },
    methods: {
        showDom() {
            console.log('Dom', this.$refs);
        }
    }
}
</script>

<template>
    <div class="student">
        <h3>学生名字：{{ name }}</h3>
        <h3>学生性别:{{ sex }}</h3>
        <button @click="sendStudentName">把学生名给School组件</button>
    </div>
</template>
<script>
export default {
    name: 'Student',
    data() {
        return {
            name: '张三',
            sex: '男',
            age: 18
        }
    },
    methods: {
        sendStudentName() {
            this.$bus.$emit('hello', 666);
        }
    }
    
}
</script>

<style>
    .student {
        background-color: beige;
    }
</style>
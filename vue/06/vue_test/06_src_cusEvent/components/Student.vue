<template>
    <div class="student">
        <h2 >学生名字：{{ name }}</h2>
        <h2>学生性别:{{ sex }}</h2>
        <h2>学生年龄：{{ age }}</h2>
        <button @click="sendSchoolName">把学生名字传给父组件</button>
        <button @click="unbind">解绑事件</button>
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
        sendSchoolName() {
            // 触发Student组件实例身上的test事件（因为是给Sutdent组件绑定的事件，所以肯定是在使用的时候进行绑定）
            this.$emit('test', this.name);
        },
        unbind() {
            this.$off('test'); // 解绑一个自定义事件
            // 解绑多个
            // this.$off(['test', 'xxx', ...]), // 多个事件名以数组的形式传入
            // this.$off(); // 解绑多个
        }
    }
    
}
</script>

<style>
    .student {
        background-color: aqua;
    }
</style>
<template>
<!-- 组件的结构 -->
    <div>
        <h2>学生名字：{{ name }}</h2>
        <h2>学生性别：{{ age }}</h2>
    </div>
</template>

<script>
// 组件交互相关的代码（数据，方法等）
export default {
        name: 'School', // 可以使用name配置项指定组件在开发者工具中呈现的名字
        data() {
            return {
                name: '张三',
                age: '女',
            }
        },
        methods: {
            showSchoolName() {
                alert(this.name);
            }
        }
    };
</script>
    
<style>
/* 组件的样式 */
.demo {
    background-color: aqua;
}
</style>
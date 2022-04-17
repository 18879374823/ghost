<template>
<!-- 组件的结构 -->
    <div>
        <h2>学校名称：{{ name }}</h2>
        <h2>学校地址：{{ address }}</h2>
    </div>
</template>

<script>
// 组件交互相关的代码（数据，方法等）
export default {
        name: 'School', // 可以使用name配置项指定组件在开发者工具中呈现的名字
        data() {
            return {
                name: '开心就好大学',
                address: '深圳',
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
<template>
    <div class="school">
        <h2 @click="showName">学校名称：{{ name }}</h2>
        <h2>学校地址:{{ address }}</h2>
    </div>
</template>
<script>
// 局部混合
// import { mixin, data } from '../mixin.js';
export default {
    name: 'School',
    data() {
        return {
            name: '开心大学',
            address: '深圳'
        }
    },
    // methods: {
    //     showSchool() {
    //         alert(this.name);
    //     }
    // },
    // mixins: [mixin, data]
}
</script>

<style>
    
</style>
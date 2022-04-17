<template>
    <div class="school">
        <h3>学校名称：{{ name }}</h3>
        <h3>学校地址:{{ address }}</h3>
    </div>
</template>
<script>

export default {
    name: 'School',
    props:['getSchoolName'],
    data() {
        return {
            name: '开心大学',
            address: '深圳'
        }
    },
    methods: {
        
    },
    mounted() {
        this.$bus.$on('hello', (val)=> {
            console.log('val', val);
        })
    },
    beforeDestory() {
        this.$off('hello');
    },
}
</script>

<style>
    .school {
        background-color: beige;
    }
</style>
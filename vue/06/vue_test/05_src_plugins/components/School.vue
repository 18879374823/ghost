<template>
    <div class="school">
        <h2>学校名称：{{ name }}</h2>
        <h2>学校地址:{{ address }}</h2>
    </div>
</template>
<script>

export default {
    name: 'School',
    data() {
        return {
            name: '开心大学',
            address: '深圳'
        }
    },
}
</script>

<style>
    
</style>
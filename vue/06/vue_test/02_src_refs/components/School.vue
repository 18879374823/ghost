<template>
    <div>
        <h2>学校名称：{{ name }}</h2>
        <h2>学校地址：{{ address }}</h2>
    </div>
</template>
<script>

export default {
    name: 'School',
    data() {
        return {
            name: '哈哈哈大学',
            address: '哪里',
        }
    }
}
</script>

<style>
    .school {
        background-color: aqua;
    }
</style>
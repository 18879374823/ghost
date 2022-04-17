<template>
    <div class="school">
        <h3>学校名称：{{ name }}</h3>
        <h3>学校地址:{{ address }}</h3>
        <div>
            <p v-show="!edit">{{ schoolDesc }}</p>
            <input type="text" v-show='edit' ref='editInput' />
            <button @click="eidtDesc">编辑学校描述</button>
        </div>
    </div>
</template>
<script>

export default {
    name: 'School',
    props:['getSchoolName'],
    data() {
        return {
            name: '开心大学',
            address: '深圳',
            schoolDesc: '好的大学',
            edit: false,
        }
    },
    methods: {
        eidtDesc() {
            this.edit = true;
            this.$nextTick(function() {
                this.$refs.editInput.focus();
            })
            
        }
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
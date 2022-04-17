<template>
    <div>
        <Student name="张三" sex="男" :age="18" />
    </div>
</template>

<script>
import Student from './components/Student.vue'

export default {
    name: 'App',
    components: {
        Student,
    },
    data() {
        return {
            msg: '欢迎光临'
        }
    },
    methods: {}
}
</script>

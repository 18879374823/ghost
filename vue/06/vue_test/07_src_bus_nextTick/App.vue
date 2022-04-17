<template>
    <div class="app">
        <School />
        <Student />
    </div>
</template>

<script>
import Student from './components/Student.vue';
import School from './components/School.vue';

export default {
    name: 'App',
    components: {
        Student,
        School
    },
    data() {
        return {
            msg: '欢迎光临',
            studentName: '',
        }
    },
    methods: {
    },
}
</script>
<style>
    .app {
        padding: 10px;
        background-color: #ccc;
    }
</style>

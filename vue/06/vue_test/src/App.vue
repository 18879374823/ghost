<template>
    <div>
        <Test />
        <Test2 />
        <Test3 />
        <Test4 />
    </div>
</template>

<script>
import Test from './components/Test.vue';
import Test2 from './components/Test2.vue';
import Test3 from './components/Test3.vue';
import Test4 from './components/Test4.vue'

export default {
    name: 'App',
    components: {
        Test,
        Test2,
        Test3,
        Test4
    },
    data() {
        return {
            msg: '欢迎光临',
        }
    },
    methods: {
    },
}
</script>
<style>
    /* .app {
        padding: 10px;
        background-color: #ccc;
    } */
</style>

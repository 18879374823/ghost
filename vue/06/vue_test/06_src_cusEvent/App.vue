<template>
    <div>
        <div>
            学生名字是：{{ studentName }}
        </div>

        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <School :getSchoolName="getSchoolName" />

        <!-- 通过父组件给子组件绑定一个自定义事件，子给父传递数据 （第一种写法，通过@或v-on） -->
        <Student v-on:test="getStudentName" @click.native="show" />
        <!-- 通过父组件给子组件绑定一个自定义事件，子给父传递数据  (第二种写法，通过ref) --> 
        <!-- <student ref="student" /> -->
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
        getSchoolName(val){
            console.log(val);
        },
        getStudentName(val) {
            this.studentName = val;
            console.log('demo被调用了', val);
        },
        show() {
            console.log('hhh')
        }
    },
    mounted() {
        // 绑定自定义事件
        // this.$refs.student.$on('test', this.getStudentName);
        // this.$refs.student.$once('test', this.getStudentName); // 只调用一次

        // this.$refs.student.$on('test', function() {
        //     console.log(this); // 这里的this是Student实例对象，而不是App实例对象（谁调用的函数，this就指向谁）
        // })
    }
}
</script>

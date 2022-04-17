<template>
    <div class="student">
        <h1>{{ msg }}</h1>
        <h2>学生名字：{{ name }}</h2>
        <h2>学生性别:{{ sex }}</h2>
        <h2>学生年龄：{{ age }}</h2>
    </div>
</template>
<script>

export default {
    name: 'School',
    // 接收的数据不能修改！！！
    
    // props: ['name', 'sex', 'age'], // 简单接收

    // 接收数据的同时对数据类型进行限制
    // props: {
    //     name: String,
    //     sex: String,
    //     age: Number
    // },

    // 接收数据的同时，进行类型限制+默认值的指定+必要性的限制
    props: {
        name: {
            type: String, // 类型是字符串
            required: true, // 必须
        },
        age: {
            type: Number,
            default: 99, // 默认值
        },
        sex: {
            type: String, // 类型是字符串
            required: true, // 必须
        },
    },
    
    data() {
        return {
            msg: '我是一个学生',
        }
    }
}
</script>

<style>
    .student {
        background-color: aqua;
    }
</style>
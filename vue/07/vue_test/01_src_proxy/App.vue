<template>
  <div id="app">
    <h1>hello</h1>
    <button @click="getData">gg</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {
  },
  methods: {
    getData() {
      console.log(this);
      // 方式一写：http://localhost:8080/sugrec
      axios.get('http://localhost:8080/api/sugrec').then(response=> {
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

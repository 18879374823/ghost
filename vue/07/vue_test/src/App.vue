<template>
  <div id="app">
    <div class="box">
      <Categroy :listData="foods" title="美食">
        <!-- 使用时，用slot属性标明放在那个插槽里 -->
        <a href="http" slot="title">dizhi</a>
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F7%2F10%2Fb87c8e05-344a-48d1-869f-ef6929fc8b17.jpg&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652795340&t=45a00f00e613411acda5d706955fa365" alt="">
      </Categroy>
      <Categroy :listData="games" title="游戏">
        <!-- v-slot:title写法只能用在template中 -->
        <template v-slot:title>
          <a href="http">使用template标签时，可以用 v-slot:xxx 写法</a>
        </template>
      </Categroy>
      <Categroy :listData="films" title="电影" />
    </div>
    <hr>
    <div class="box">
      <!-- 作用域插槽 -->
      <Category2 title="电影">
        <template slot-scope="dataa">
          <ul>
            <li v-for="(item, index) in dataa.games2" :key="index">{{ item }}</li>
          </ul>
        </template>
      </Category2>
      <Category2 title="电影">
        <template slot-scope="dataa">
          <ol>
            <li v-for="(item, index) in dataa.games2" :key="index">{{ item }}</li>
          </ol>
        </template>
        
      </Category2>
      <Category2 title="电影">
        <template slot-scope="dataa">
          <h4 v-for="(item, index) in dataa.games2" :key="index">{{ item }}</h4>
        </template>
        
      </Category2>

    </div>
    
  </div>
</template>

<script>
import Categroy from './components/Category.vue';
import Category2 from './components/Category2.vue';

export default {
  name: 'App',
  components: {
    Categroy,
    Category2
  },
  // 
  data() {
    return {
      foods: ['鸡蛋','油条','黄瓜','青菜'],
      games: ['消消乐','糖吃蛇','打豆豆','打地鼠'],
      films: ['开心就好','清爽','黄瓜大餐','青菜大餐'],
    }
  },
  methods: {
    

  }
}
</script>

<style>
  #app .box{
    display: flex;
  }

</style>

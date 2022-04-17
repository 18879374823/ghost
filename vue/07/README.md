# 浏览器本地存储
    localStorage
    sessionStorage


1、存储内容大小一般支持5MB左右（不同浏览器可能不太一样）
2、浏览器端通过Window.sessionStorage 和Window.localStorage属性来实现本地存储机制
3、相关API
    1、xxxStorage.setItem('key', 'value');
    2、xxxStorage.getItem('key');
    3、xxxStorage.removeItem('key');
    1、xxxStorage.clear();
4、备注
    1、SessionStorage存储的内容会随着浏览器窗口关闭而消失
    2、LocalStorage存储的内容，需要手动清除才会消失
    3、xxxStorage.getItem('xxx')，如果xxx对应的value值不存在，那么getItem获取到的值是null
    4、Json.parse(null)的结果还是null

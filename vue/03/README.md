# 数据代理

## Object.defineProperty 方法
> Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性
用法：Object.defineProperty(obj, prop, desc)
        obj 需要定义属性的当前对象
        prop 当前需要定义的属性名
        desc 属性描述符
例：
    let person = {
            name: '张三',
            color: 'white',
        };
        Object.defineProperty(person, 'age', { 
            value: 18,
            enumerable: true, // 控制属性是否可以枚举，即是否可以遍历，默认是false
            writable: true, // 控制属性是否可以被修改，默认是false
            configurable: true, // 控制属性是否可以被删除，默认是false
        });
        // getter
        let like = 'football';
        Object.defineProperty(person, 'hobby', { 
            // 当有人读取person的hobby属性时，get函数（getter）就会被调用，且返回值就是hobby的值
            get: function() {
                return like;
            },
            // 当有人修改person的hobby属性时，set函数（setter）就会被调用，且会收到修改的具体值
            set: function(value) {
                console.log('修改时的值：', value);
                // 当在这里设置like的值时，就实现了person.hobby和like的联动
                /*
                    开始：通过set将like赋值给了person.hobby
                    然后：修改person.hobby时，触发set，获取修改的person.hobby值，将person.hobby重新赋值给like（如果没有这一步，则读取person.hobby时，值不会变，还是原来的值）, 这里like就变了
                    最后：当你去读取person的时候，又会触发get，将上一步的like又赋值给person.hobby
                    最终：实现了数据的双向绑定
                */
               like = value;
            }
        });

    
## 数据代理
> 通过一个对象代理对另一个对象中属性的操作（读/写）
简单例子：
        // 通过修改obj2的属性来达到修改obj1中属性的要求
        let obj1 = { x: 100 };
        let obj2 = { y: 200 };
        Object.defineProperty(obj2, 'x', {
            get() {
                return obj1.x;
            },
            set(value) {
                obj1.x = value;
            }
        })


## Vue 中的数据代理
1、通过vm对象来代理data对象中属性的操作（读/写）
2、好处：更加方便的操作data中的数据
3、基本原理：
    通过Object.defineProperty() 把data对象中所有属性添加到vm上
    为每一个添加到vm上的属性，都指定一个getter/setter
    在getter/setter内部去操作（读/写）data中对应的属性

## 事件处理
事件的基本使用：
    1、使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名
    2、事件的回调需要配置在methods对象中，最终会在vm上
    3、methods中配置的函数，不要用箭头函数，否则this就不是vm了
    4、methods中配置的函数，都是被Vue管理的函数，this的指向是vm或者组件实例对象
    5、@click="demo"和@click="demo($event)"效果一致，但是后者可以传参

## 事件修饰符
Vue 中事件修饰符
    1、.stop：阻止事件冒泡
    2、.prevent：阻止默认事件
    3、.capture：使用事件的补货模式
    4、.self：只有event.target是当前操作的元素时才触发事件
    5、.once：事件只触发一次
    6、.passive：事件的默认行为立即执行，无需等待事件回调执行完毕

如：<a href="www.baidu.com" @click.prevent="showInfo">click</a>

## 键盘事件
1、Vue中常用的按键别名
    .enter
    .tab
    .delete (捕获“删除”和“退格”键)
    .esc
    .space
    .up
    .down
    .left
    .right
    例：<input type="text" placeholder="按下回车提示符" @keyup.enter="showInfo" />
    注意: 对于tab键，需要配合 keydown使用，keyup无法捕获到

2、Vue中未提供别名的按键，可以使用按键原始的key值去绑定，但要注意转成 kebab-base（短横线命名）
3、系统修饰键（用法特殊）：.ctrl .alt .shift .meta
    1、配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，时间才被出发
    2、配合keydown使用，正常触发事件
4、也可以使用keyCode去指定具体的按键（不推荐）
5、Vue.config.keyCodes.自定义键名 = 建码，可以去定制按键别名


## 计算属性
1、定义：要用的属性不存在，要通过已有的属性计算得来
2、原理：底层借助了Object.defineProperty方法提供的getter和setter
3、get函数什么时候执行
    1、初次读取时会执行一次
    2、当依赖的数据发生变化时会再次被调用
4、优势：与methods相比，内部有缓存机制（复用），效率更高，调试更方便
5、备注：
    1、计算属性最终会出现在vm上，直接读取使用即可
    2、如果计算属性要被修改，那么必须用set函数去响应修改，且set中要引起计算时依赖的数据发生变化
例：
    computed: {
        fullName: {
            // get有什么作用：当有人读取fullName时，get会被调用，且返回值就作为fullName的值返回
            // get什么时候调用：1、初次读取fullName时  2、所依赖的数据发生变化时
            get() {
                // get()中的this指向vm
                return `${this.firstName}-${this.lastName}`;
            },
            // 非必要，只有需要修改时可以加
            set(val) {
                // set() 什么时候调用：当fullName被修改时
                const arr = val.split('-');
                this.firstName = arr[0];
                this.lastName = arr[1];
            }
        }
    }

#### 计算属性简写
> 上面是完整写法
    // 简写：只展示，不修改时可以简写
    fullName2() {
        return `${this.firstName}-${this.lastName}`;
    }


## 监视属性watch
1、当监视的属性发生变化时，回调函数自动调用，进行相关操作
2、监视的属性必须存在，才能进行监视
3、监视属性的两种写法
    1、new Vue 时传入watch配置
    2、通过 vm.$watch() 进行监视
#### 深度监视
1、Vue中的watch默认不监测对象内部值的改变（一层）
2、配置deep:true 可以监测对象内部值的改变（多层）
备注：
    1、Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以
    2、使用watch是根据数据的具体结构，决定是否采用深度监测
例：
    watch: {
        // computed中的属性也可以监听
        // 对象中的key是字符串，其实应该这样写：'isHot',isHot只是简写
        isHot: {
            immediate: true, // 初始化时让handler调用一下
            // handler什么时候调用？ 当isHot发生变化时
            handler(newVal, oldValue) {
                console.log('isHot修改了', newVal, oldValue);
            }
        },
        // 深度监测，如监测numbers.a
        // 监视多级结构中某个属性的变化
        'numbers.a': {
            handler(newVal, oldValue) {
                console.log('a修改了', newVal, oldValue);
            }
        },
        // 监视多级结构中所有属性的变化 deep: true,
        numbers: {
            deep: true,
            handler(newVal, oldValue) {
                console.log('a修改了', newVal, oldValue);
            }
        },
    },
#### 简写
    // 简写，其他属性不需要，只要一个handler时
    simple(newVal, oldValue) {
        console.log('simple修改了', newVal, oldValue);
    }

    vm.$watch('simple', function(newVal, oldValue){

    })
#### computed与watch的区别
    1、computed能完成的，watch都能完成
    2、watch能完成的，computed不一定能完成，如：watch可以进行异步操作
小原则：
    1、所有被Vue管理的函数，最好写成普通函数，这样this的指向才是vm或组件的实例
    2、所有不被Vue管理的函数（如定时器的回调函数，ajax的回调函数等，promise），最好写成箭头函数，这样this的指向才是vm或组件的实例

## 绑定样式
> 看绑定样式.html 文件

## 条件渲染
1、v-if：
        写法：
            1):v-if="表达式"
            2):v-else-if="表达式"
            3):v-else
        适用于：切换频率较低的场景
        特点：不展示的DOM元素直接被移除
        注意：v-if，v-else-if，v-else一起使用时，结构不能被打断
2、v-show
    写法：v-show="表达式"
    适用于：切换频率较高的场景
    特点：不展示的DOM元素未被移除，仅仅是使用样式（display: none）隐藏
备注：使用v-if时，元素可能无法获取，而使用v-show一定可以获取
    template标签只能与v-if一起使用，不能和v-show一起使用

## 列表渲染
    1、用于展示列表数据
    2、语法：v-for="(item, index) in xxx"  :key="yyy"
        key值需要是唯一的
    3、可遍历：数组，对象，字符串（用的很少），指定次数（用的很少）
    例：
        <!--  遍历数组 -->
        <ul>
            <li v-for="(p, index) in persons" :key="p.id">{{ p.name }}-{{ p.age }}---{{ index }}</li>
        </ul>
        <!-- 遍历对象 -->
        <ul>
            <li v-for="(value, key) in carInfo">{{ value }}---{{ key }}</li>
        </ul>
        <!-- 还可以遍历字符串 -->
        <ul>
            <li v-for="(s, k) in str">{{ s }}---{{ k }}</li>
        </ul>
        <!--  遍历指定次数 -->
        <ul>
            <li v-for="(number, key) in 5">{{ number }}---{{ key }}</li>
        </ul>
#### key的作用和原理
> 以index作为key
    <button @click.once="addPerson">在首部添加</button>
    <ul>
        <li v-for="(p, index) in persons" :key="index">
            {{ p.name }}-{{ p.age }}
            <input type="text">
        </li>
    </ul>
    初始数据->生成虚拟DOM->将虚拟DOM转成真实DOM
                \         
            虚拟DOM对比算法（根据key值去对比，相同则直接展示，不同需要重新渲染，注意这里对比的是虚拟DOM，上面第一个的key和新增的key相同了，所以在案例中会错位）
                  \      
    更新数据后->生成虚拟DOM->(对比之后)将虚拟DOM转成真实DOM

> 以id为key值
    <button @click.once="addPerson">在首部添加</button>
    <ul>
        <li v-for="(p, index) in persons" :key="p.id">
            {{ p.name }}-{{ p.age }}
            <input type="text">
        </li>
    </ul>
    初始数据->生成虚拟DOM->将虚拟DOM转成真实DOM
                \         
            虚拟DOM对比算法(这里key值都是不同的)
                  \      
    更新数据后->生成虚拟DOM->(对比之后)将虚拟DOM转成真实DOM

> 总结：
    1、虚拟DOM中key的作用：
        key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】，随后Vue进行【新的虚拟DOM】和【旧的虚拟DOM】的差异比较，比较规则如下
    
    2、对比规则;
        1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
            1、若虚拟DOM内容没变，直接使用之前的真实DOM
            2、若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM
        2).旧虚拟DOM中未找到与新虚拟DOM相同的key：
            创建新的真实DOM，随后渲染到页面
    
    3、用index作为key可能会引发的问题：
        1、若对数据进行逆序添加，逆序删除等破坏顺序操作，会产生没有必要的真实DOM更新，界面效果没问题，但是效率低
        2、如果结构中还包含输入类的DOM，会产生错误DOM更新，界面有问题
    4、开发中如何选择key:
        1、最好使用每条数据中唯一标识作为key，比如id，身份证号等
        2、如果不存在对数据的逆序添加，逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

#### 列表过滤&排序
    // 用watch写(不建议)
    watch: {
        /**
            * 这里不能改变原数据，因为一旦改了，则后面的过滤都是在修改后的数据上进行的，会导致越搜索越少的情况，所以这里要用另一个参数来接收
            * 用另一个参数来接收时，会出现一开始无数据的情况，这里可以配置immediate: true，使其在一开始就赋值
            * str.indexOf(''):返回0
        */
        // keyWord: {
        //     immediate: true,
        //     handler(val) {
        //         this.filterPersons = this.persons.filter( (item) => {
        //             return item.name.indexOf(val) !== -1;
        //         })
        //     }
        // }
    },
    // 用计算属性来写（建议）
    computed: {
        // filterPersons() {
        //     return this.persons.filter( (item) => {
        //         return item.name.indexOf(this.keyWord) !== -1;
        //     })
        // },

        // 加上排序的
        filterPersons() {
            const arr =  this.persons.filter( (item) => {
                return item.name.indexOf(this.keyWord) !== -1;
            });
            if(this.sortType) {
                arr.sort((p1, p2) => {
                    return this.sortType === 1 ? p1.age - p2.age : p2.age - p1.age;
                })
            };
            return arr;
        },

    },

## Vue检测数据的原理
    数据更新时会出现数据改变，但页面未更新的情况，如 更新时的一个问题.html 中展示
1、vue会监视data中所有层次的数据
2、如何检测对象中的数据
    通过setter实现监视，且要在new Vue时就传入要监测的数据
    1）对象中后追加的属性，Vue默认不做响应式处理
    2）如需给后添加的属性做响应式，请使用如下API
        Vue.set(target, propertyName/index, value) 或
        Vm.$set(target, propertyName/index, value)
3、如何检测数组中的数据
    通过包裹数据组更新元素的方法实现，本质就是做了两件事
    1）调用原生对应的方法对数组进行更新
    2）重新解析模板，进而更新页面
4、在Vue中修改数组中的某个元素一定要用如此啊方法：
    1）使用这些API：push(),pop(),shift(),unshift(),splice(),reserve()
    2）使用Vue.set()或vm.$set()
特别注意：Vue.set()和vm.$set()不能给vm或vm的根数据对象添加属性



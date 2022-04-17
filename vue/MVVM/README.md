# MVVM 模型
> M 模型（Model）: 对应data中的数据
  V 视图（View）：模板
  VM 视图模型（ViewModel）：Vue实例对象

发现：
    1、data中的所有属性，最后都出现在vm上，
    2、vm身上的所有属性及vue原型上的所有属性，在vue模板中可以直接使用
<!--
 * @Author: mn
 * @Date: 2022-08-18 14:31:13
 * @LastEditors: mn
 * @LastEditTime: 2022-08-18 14:31:18
 * @Description: 
-->
Vue.mixin和minxins

Vue.mixin即是混入。mixin的作用是多个组件可以共享数据和方法，在使用mixin的组件中引入后，mixin中的方法和属性也就并入到该组件中，可以直接使用，在已有的组件数据和方法进行了扩充。Vue.mixin()可以把你创建的自定义方法混入所有的 Vue 实例（就是所有添加的组件都会混入你自定义的方法）。

mixins的特点:方法和参数在各组件中不共享

import xxx from '@/mixins/xxx'
 组件调用 mixins: [xxx],

<!--
 * @Author: mn
 * @Date: 2023-05-09 14:29:52
 * @LastEditors: mn
 * @LastEditTime: 2023-05-09 17:20:40
 * @Description: 
-->
<template>
  <div class="app-container">
    <m-card>
      <div slot="header" class="headerLabel">
        Class类
        <el-link
          type="success"
          href="https://es6.ruanyifeng.com/#docs/class#%E7%B1%BB%E7%9A%84%E7%94%B1%E6%9D%A5"
          target="_blank"
        >
          (链接)
        </el-link>
      </div>
      <preview-code :code="code"></preview-code>
      <preview-code :code="code1"></preview-code>
    </m-card>
    <m-card>
      <div slot="header" class="headerLabel">Class类继承</div>
      <preview-code :code="code2"></preview-code>
      <preview-code :code="code3"></preview-code>
      <el-image style="width: 100px; height: 100px" :src="es5" :preview-src-list="srcList"></el-image>
      <el-image style="width: 100px; height: 100px" :src="es6" :preview-src-list="srcList"></el-image>
    </m-card>
  </div>
</template>

<script>
import es5 from './es5.png'
import es6 from './es6.png'
export default {
  name: 'class',
  data() {
    return {
      code: '',
      code1: '',
      code2: '',
      code3: '',
      es5,
      es6,
      srcList: [es5, es6]
    }
  },
  created() {
    this.init()
    this.init1()
  },
  methods: {
    init() {
      this.code = `
      // 实例对象的传统方法是通过构造函数
      function Point(x, y) {
        this.x = x;
        this.y = y;
      }

      Point.prototype.toString = function () {
        return '(' + this.x + ', ' + this.y + ')';
      };

      var p = new Point(1, 2);

      // ES6 的class
      class Point {
        // this关键字则代表实例对象
        //constructor()方法是类的默认方法,通过new命令生成对象实例时,自动调用该方法。
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
        toString() {
          return '(' + this.x + ', ' + this.y + ')';
        }
      }
      var point = new Point(2, 3);
      point.toString() // (2, 3)
      // 类的属性和方法,除非显式定义在其本身(即定义在this对象上),否则都是定义在原型上(即定义在class上)
      point.hasOwnProperty('x') // true
      point.hasOwnProperty('y') // true
      point.hasOwnProperty('toString') // false
      point.__proto__.hasOwnProperty('toString') // true
    `
      this.code1 = `
      //类相当于实例的原型,所有在类中定义的方法,都会被实例继承。如果在一个方法前,加上static关键字,就表示该方法不会被实例继承,而是直接通过类来调用,这就称为“静态方法”。
      class Foo {
        static classMethod() {
          return 'hello';
        }
      }
      Foo.classMethod() // 'hello'
      var foo = new Foo();
      foo.classMethod()  // TypeError: foo.classMethod is not a function
      // 静态属性、
      // 新写法
        class Foo {
          static prop = 1;
        }
    `
      class Point {
        constructor(x, y) {
          this.x = x
          this.y = y
        }
        toString() {
          return '(' + this.x + ', ' + this.y + ')'
        }
      }
      console.log(new Point(1, 2).toString(), 'new')
      console.log(Point.prototype, 'Point')
      console.log(Object.keys(Point.prototype), 'Point.prototype')
      // es6中 toString()方法是Point类内部定义的方法，它是不可枚举的
      console.log(Object.getOwnPropertyNames(Point.prototype), 'Point.prototype')
    },
    init1() {
      this.code2 = `
      // ES6 的继承必须先调用super()方法,因为这一步会生成一个继承父类的this对象
      // Bar继承了Foo,
       class Foo {
        constructor() {
          console.log(1);
        }
      }

      class Bar extends Foo {
        constructor() {
          // 先调用
          super();
          console.log(2);
        }
      }

      const bar = new Bar();

      //子类没有定义constructor()方法,这个方法会默认添加,并且里面会调用super()
      class ColorPoint extends Point {}
      // 等同于
      class ColorPoint extends Point {
        constructor(...args) {
          super(...args);
        }
      }
      `
      this.code3 = `
        // 每一个对象都有__proto__属性,指向对应的构造函数的prototype属性,lass 作为构造函数的语法糖,同时有prototype属性和__proto__属性,因此同时存在两条继承链。
        (1)子类的__proto__属性,表示构造函数的继承，总是指向父类。
        (2)子类prototype属性的__proto__属性,表示方法的继承,总是指向父类的prototype属性。
        class A {
        }

        class B extends A {
        }

        B.__proto__ === A // true
        B.prototype.__proto__ === A.prototype // true
      `
    }
  }
}
</script>

<style lang="scss" scoped></style>

闭包(Closure)的秘密
===
1.闭包的概念
---
- 闭包在我理解来看就是一个函数，一个能够读取函数内部变量的函数，一个连接函数内部和函数外部的桥梁


2.javascript中变量的作用域
---
- 理解闭包重要的是理解变量的作用域，变量的作用域无非两种：全局变量和局部变量
- 在javascript中，函数内部可以读取全局变量
```
var a = 111;
function foo1() {
    console.log(a)
}
foo1();//111
```
- 在函数外部无法读取函数内部的变量
```
function foo2() {
    var b = 222;
}
console.log(b)// Uncaught ReferenceError: b is not defined(报错)
```
- 在函数内部定义局部变量的时候一定要使用声变量的命令(如var，let)，否则相当于声明了一个全局变量（一下3种情况让我对这个函数内部声明的变量有了那么一丢丢不一样的认识，希望对大家也是哦）
```
function foo3() {
    c = 333;
}
console.log(c)// Uncaught ReferenceError: c is not defined(报错)
```
```
function foo2() {
    var b = 222;
}
foo2()
console.log(b)// Uncaught ReferenceError: b is not defined(报错)
```
```
function foo3() {
    c = 333;
}
foo2();
console.log(c)//333
```
3.从外部读取函数内部的变量
---
- 以上关于作用域的说明中看到了作用域控制之下，函数内部与函数外部就好像是小家跟大家的区分，小家是不会主动的把好东西拿出来大家共享的，那大家有难需要小家支援的时候怎么拿到小家的好东西呢？让我康康
- 那就是在函数的内部，再定义一个函数。
```
function foo2() {
    var b = 222;
    function foo4() {
        console.log(b)//222;
    }
} 
```
- foo2内部定义的变量b对，foo2内部的函数foo4来说是可见的，所以foo4内输出b的时候发现，变量可以正常输出。那反过来想想如果把foo4作为foo2的返回值，那么是不是在foo2外部就可以访问到foo2内部定义的变量了呢？let me try try！
```
function foo2() {
    var b = 222;

    function foo4() {
        console.log(b)
    }
    return foo4
}
var result = foo2()
result();//222;
```

4.闭包的用途
---
- 知道了闭包是什么，也知道了怎么搭建一个闭包，那接下里就是怎么用闭包了。

  1. 从上面的演示可以看出，闭包的一个很重要的作用就是读取函数内部的变量；
  2. 闭包另一个重要的用途就是可以让这些变量始终保存在内存中。
```
function f1() {
    var n = 999;
    nAdd = function () { n += 1 }//没有使用变量定义命令，相当于定义了一个全局变量
    function f2() {
        console.log(n);
    }
    return f2;
}

var result = f1();
result(); // 999
nAdd();
result(); // 1000
```  
代码解释：在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

这段代码中另一个值得注意的地方，就是"nAdd=function(){n+=1}"这一行，首先在nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

5.使用闭包的主要事项
---
- 闭包是有很重要的用处，那有有点大概率会有缺点，以下使用闭包的几点注意事项

  1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

  2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

6.闭包思考
---
- 例一
```
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};
console.log(object.getNameFunc()());
```
- 例二
```
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };
    }
};
console.log(object.getNameFunc()());
```




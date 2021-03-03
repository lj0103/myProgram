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
--
- 以上关于作用域的说明中看到了作用域控制之下，函数内部与函数外部就好像是小家跟大家的区分，小家是不会主动的把好东西拿出来大家共享的，那大家有难需要小家支援的时候怎么拿到小家的好东西呢？让我康康
- 1.那就是在函数的内部，再定义一个函数。
  ```
  ```
Javascript 类
===
一、构造函数法
---
> 用构造函数模拟"类"，在其内部用this关键字指代实例对象。
```
function Cat() {
    this.name = "大喵"
}
```
> 生成实例的时候，使用new关键字。
```
var cat = new Cat();
console.log(cat.name)
```
> 类的属性和方法，还可以定义在构造函数的prototype对象之上。
```
Cat.prototype.makeColor = function() {
    console.log("white")
}

Cat.prototype.makeSound = "喵喵喵"
```

二、Object.create()法
---
> 为了解决"构造函数法"的缺点，更方便地生成对象，Javascript的国际标准ECMAScript第五版（目前通行的是第三版），提出了一个新的方法Object.create()。
用这个方法，"类"就是一个对象，不是函数。
```
var Cat = {
    name: "大喵",
    makeColor: function() {
        console.log("white")
    }
}
```
> 然后，直接用Object.create()生成实例，不需要用到new。
```
var cat = Object.create(Cat)
console.log(cat)
//{}
__proto__:
makeColor: ƒ ()
name: "大喵"  

console.log(cat.name)//大喵

console.log(cat.makeColor)
//ƒ () {
        console.log("white")
    }

cat.makeColor();//white
```
> 目前，各大浏览器的最新版本（包括IE9）都部署了这个方法。如果遇到老式浏览器，可以用下面的代码自行部署。
```
if (!Object.create) {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}
```
> 这种方法比"构造函数法"简单，但是不能实现私有属性和私有方法，实例对象之间也不能共享数据，对"类"的模拟不够全面。
> 
三、极简主义法
---
 1) 封装
    > 首先，它也是用一个对象模拟"类"。在这个类里面，定义一个构造函数createNew()，用来生成实例。
    ```
    var Cat = {
        createNew: function() {

        }
    }
    ```
    > 然后，在createNew()里面，定义一个实例对象，把这个实例对象作为返回值。
    ```
    var Cat = {
        createNew: function() {
            var cat = {};
            cat.name = "大喵";
            cat.makeColor = function() {
                console.log("white")
            }
            return cat;
        }
    }
    ```
    > 使用的时候，调用createNew()方法，就可以得到实例对象。
    ```
    var cat1 = Cat.createNew();
    console.log(cat1)
    console.log(cat1.name)
    console.log(cat1.makeColor)
    cat1.makeColor()
    ```

 2) 继承
    > 让一个类继承另一个类，实现起来很方便。只要在前者的createNew()方法中，调用后者的createNew()方法即可。 先定义一个Animal类。
    ```
    var Animal = {
        createNew: function() {
            var animal = {};
            animal.sleep = function() {
                console.log("睡懒觉")
            }
            return animal;
        }
    }
    ```
    > 然后，在Cat的createNew()方法中，调用Animal的createNew()方法。
    ```
    var Cat = {
        createNew: function() {
            var cat = Animal.createNew();
            cat.naem = "大喵";
            cat.makeColor = function() {
                console.log("white")
            }
            return cat;
        }
    }
    ```
    > 这样得到的Cat实例，就会同时继承Cat类和Animal类。
    ```
    var cat1 = Cat.createNew();
    console.log(cat1);
    cat1.sleep()
    ```
 3) 私有属性和私有方法

    > 在createNew()方法中，只要不是定义在cat对象上的方法和属性，都是私有的。
    ```
    var Cat = {
        createNew: function() {
            var cat = Animal.createNew();
            cat.name = "大喵";
            var sound = "喵喵喵"
            cat.makeColor = function() {
                console.log("white")
            }
            cat.makeSound = function() {
                console.log(sound)
            }
            return cat;
        }
    }
    ```
    > 上例的内部变量sound，外部无法读取，只有通过cat的公有方法makeSound()来读取。
    ```
    var cat1 = Cat.createNew();
    console.log(cat1.sound)
    cat1.makeSound()
    ```
 4) 数据共享
    > 有时候，我们需要所有实例对象，能够读写同一项内部数据。这个时候，只要把这个内部数据，封装在类对象的里面、createNew()方法的外面即可。
    ```
    var Cat = {　　　　
        sound: "喵喵喵",
        　　　　createNew: function() {　　　　　　
            var cat = {};
            cat.makeSound = function() { alert(Cat.sound); };
            cat.changeSound = function(x) { Cat.sound = x; };　　　　　　
            return cat;　　　　
        }　　
    };
    ```
    > 然后，生成两个实例对象：
    ```
    var cat1 = Cat.createNew();　　
    var cat2 = Cat.createNew();　　
    cat1.makeSound(); // 喵喵喵
    ```
    > 这时，如果有一个实例对象，修改了共享的数据，另一个实例对象也会受到影响。
    ```
    cat2.changeSound("啦啦啦");　　
    cat1.makeSound(); // 啦啦啦
    ```
//构造函数
// function Cat() {
//     this.name = "大喵"
// }
// //实例化
// var cat = new Cat();
// console.log(cat.name)

// Cat.prototype.makeColor = function() {
//     console.log("white")
// }

// Cat.prototype.makeSound = "喵喵喵"
// console.log(cat)
// console.log(cat.makeSound)


// Object.create()法
// var Cat = {
//     name: "大喵",
//     makeColor: function() {
//         console.log("white")
//     }
// }

// var cat = Object.create(Cat)
// console.log(cat)
// console.log(cat.name)
// console.log(cat.makeColor)
// cat.makeColor();


// if (!Object.create) {
//     Object.create = function(o) {
//         function F() {}
//         F.prototype = o;
//         return new F();
//     };
// }


//极简主义
var Cat = {
        createNew: function() {

        }
    }
    // 然后，在createNew()里面，定义一个实例对象，把这个实例对象作为返回值。
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
    // 使用的时候，调用createNew()方法，就可以得到实例对象。

// var cat1 = Cat.createNew();
// console.log(cat1)
// console.log(cat1.name)
// console.log(cat1.makeColor)
// cat1.makeColor()


//继承
// 让一个类继承另一个类，实现起来很方便。只要在前者的createNew()方法中，调用后者的createNew()方法即可。
// 先定义一个Animal类。
var Animal = {
        createNew: function() {
            var animal = {};
            animal.sleep = function() {
                console.log("睡懒觉")
            }
            return animal;
        }
    }
    // 然后，在Cat的createNew()方法中，调用Animal的createNew()方法。
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
    // 这样得到的Cat实例，就会同时继承Cat类和Animal类。
var cat1 = Cat.createNew();
console.log(cat1);
cat1.sleep()


// 在createNew()方法中，只要不是定义在cat对象上的方法和属性，都是私有的。
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
    // 上例的内部变量sound，外部无法读取，只有通过cat的公有方法makeSound()来读取。
var cat1 = Cat.createNew();
console.log(cat1.sound)
cat1.makeSound()


// 有时候，我们需要所有实例对象，能够读写同一项内部数据。
// 这个时候，只要把这个内部数据，封装在类对象的里面、createNew()方法的外面即可。
var Cat = {　　　　
    sound: "喵喵喵",
    　　　　createNew: function() {　　　　　　
        var cat = {};
        cat.makeSound = function() { alert(Cat.sound); };
        cat.changeSound = function(x) { Cat.sound = x; };　　　　　　
        return cat;　　　　
    }　　
};

var cat1 = Cat.createNew();　　
var cat2 = Cat.createNew();　　
cat1.makeSound(); // 喵喵喵

cat2.changeSound("啦啦啦");　　
cat1.makeSound(); // 啦啦啦
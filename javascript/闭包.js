//闭包
var a = 111;

function foo1() {
    console.log(a)
}
foo1();

function foo2() {
    var b = 222;
}
foo2()
console.log(b)


function foo2() {
    c = 333;
}
console.log(c)

foo2();
console.log(c)


function foo2() {
    var b = 222;

    function foo4() {
        console.log(b)
    }
    return foo4
}
var result = foo2()
result();


function f1() {
    var n = 999;
    nAdd = function() { n += 1 } //没有使用变量定义命令，相当于定义了一个全局变量
    function f2() {
        console.log(n);
    }
    return f2;
}

var result = f1();
result(); // 999
nAdd();
result(); // 1000



var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            return this.name;
        };
    }
};
console.log(object.getNameFunc()());



var name = "The Window";

var object = {
    name: "My Object",
    getNameFunc: function() {
        var that = this;
        return function() {
            return that.name;
        };
    }
};
console.log(object.getNameFunc()());
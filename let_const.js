//1.
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    };
}
a[0](); //10

for (let j = 0; j < 10; j++) {
    a[j] = function() {
        console.log(j);
    };
}
// console.log(j);  //ReferenceError: j is not defined
a[0](); //0
a[1](); //1
a[2](); //2
a[3](); //3
a[4](); //4
a[5](); //5


//2.Temporal dead zone
var tdz = 1;
if (true) {
    console.log(tdz); //1
}
// if (true) {
//     console.log(tdz); //ReferenceError: Cannot access 'tdz' before initialization
//     let tdz = 2;
// }
// if (true) {
//     let tdz = tdz + 1; //ReferenceError: Cannot access 'tdz' before initialization
// }


//3.禁止重复声明
// function func(arg) {
//     let arg = 1; //SyntaxError: Identifier 'arg' has already been declared
// }

// function func(arg) {
//     let a = 1;
//     let a = 2; //SyntaxError: Identifier 'a' has already been declared
// }


//4.块级作用域中声明函数 （node环境/浏览器环境）
// function f() { console.log('outside'); }
// (function() {
//     if (false) {
//         function f() { console.log('inside'); }
//     }
//     f(); //TypeError: f is not a function
// }());


//5.const变量赋值为非原始类型时，该变量实际上是一个“指针”
const obj = {};
obj.p = 1;
obj.p; //1
// obj = { p: 2 }; //TypeError: Assignment to constant variable.


//6.获取顶层对象
var getGlobal = function() {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
};


//let用IIFE实现
var arr = [];
(function() {
    var a = 'implement let';
    console.log(a); //implement let
    arr[0] = function() { console.log(a + 0); }
}());
arr[0](); //implement let0

//const的实现
var my_const = function(variable_name, variable_value) {
    Object.defineProperty(getGlobal(), variable_name, {
        configurable: false,
        get: function() {
            return variable_value;
        },
        set: function(arg) {
            if (arg !== variable_value) {
                throw new TypeError('Assignment to constant variable.');
            }
        }
    });
}
my_const('tmp', 1);
console.log(tmp);
// tmp = 2; //TypeError: Assignment to constant variable.

my_const('tmp_obj', {});
tmp_obj.p1 = 1;
console.log(tmp_obj.p1); //1
// tmp_obj = { p2: 1 }; //TypeError: Assignment to constant variable.
// 2
var a = 10
var obj = {
  a: 20,
  say: () => {
    console.log(this.a)
  }
}
obj.say()

var anotherObj = { a: 30 }
obj.say.apply(anotherObj)

/*
输出结果：10 10

解析：
1. 箭头函数的this指向在创建时就已经确定，之后任何方式都无法更改，包括call/apply/bind。
2. 如果在全局环境下创建箭头函数，其this一定是window(严格模式下为undefined)；
   如果在普通函数内创建箭头函数，其this一定是这个普通函数的this。
*/

// 3
function a() {
  console.log(this);
}
a.call(null);
a.call(undefined);
/*
非严格模式输出结果：window, window
严格模式输出结果：null, undefined

解析：
call方法如果接受的参数是 null 或者 undefined，在非严格模式下，call会自动将this指向window，但在严格模式下，则不会进行自动指向。
*/

// 4
var obj = {
  say: function () {
    var f1 = () => {
      console.log("1111", this);
    }
    f1();
  },
  pro: {
    getPro: () => {
      console.log(this);
    }
  }
}
var o = obj.say;
o();
obj.say();
obj.pro.getPro();

// 1111 window(或undefined)
// 1111 obj
// window

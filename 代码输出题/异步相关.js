// 6
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
/*
  1

  解析：then方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为then(null)，
  这就会导致前一个Promise的结果会传递下面。
*/

// 7
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
/*
  promise1 Promise {<pending>}
  promise2 Promise {<pending>}

  Uncaught (in promise) Error: error!!!
  promise1 Promise {<fulfilled>: "success"}
  promise2 Promise {<rejected>: Error: error!!}
*/

// 8
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  });
/*
  1   
  2

  解析：注意then和catch是一对的。
*/

// 9
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
/* 
  then: Error: error!!!

  解析：then的 回调函数只要是 return。
*/

// 10
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)
/*
  Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>

  解析：.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
*/


// 12
Promise.reject('err!!!')
  .then((res) => {
    console.log('success', res)
  }, (err) => {
    console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
  })
/*
  error err!!!

  解析：错误直接被then的第二个参数捕获了，所以就不会被catch捕获了，输出结果为：error err!!!'
*/

// 13
// ①
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
    return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })

// ②
Promise.resolve('1')
  .finally(() => {
    console.log('finally1')
    throw new Error('我是finally中抛出的异常')
  })
  .then(res => {
    console.log('finally后面的then函数', res)
  })
  .catch(err => {
    console.log('捕获错误', err)
  })

/*
①
1
finally2
finally
finally2后面的then函数 2

②
finally1
捕获错误 Error: 我是finally中抛出的异常

finally一般用的很少，只要记住以下几点就可以了：

1. finally方法不管Promise对象最后的状态如何都会执行
2. finally方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是无法知道Promise最终的状态是resolved还是rejected的
3. 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。
4. finally本质上是then方法的特例

*/

// 15
function runAsync(x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject(x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err))

/*
  // 1s后输出
  1
  3
  // 2s后输出
  2
  Error: 2
  // 4s后输出
  4
  解析：该题比较细致，需要比较集中注意力
*/

// 23
async function async1() {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2() {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))

/*
  async2
  Uncaught (in promise) error
*/

// 26 ⭐️
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)  // resolve1
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})

/*
finally的特点:
1. 无论上一个的promise结果如何，都会执行其回调函数
2. 其回调函数不接受参数，所有接受的参数必定是undefined
3. finally默认返回上个Promise的值，但如果其回调函数throw异常错误，则finally返回的是异常的Promise
*/

// 27
console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5')
  })
})
process.nextTick(function () {
  console.log('6');
})
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8')
})

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  })
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })
})

/*
1
7
6
8
2
4
3
5
9
11
10
12

解析：nextTick优先度高于promise，就如promise优先度高于setTimeOut一样
*/

//31
setTimeout(function () {
  console.log(1);
}, 100);

new Promise(function (resolve) {
  console.log(2);
  resolve();
  console.log(3);
}).then(function () {
  console.log(4);
  new Promise((resove, reject) => {
    console.log(5);
    setTimeout(() => {
      console.log(6);
    }, 10);
  })
});
console.log(7);
console.log(8);

/*
2
3
7
8
4
5
6
1

解析：
resolve()之后的代码会继续执行，不要下意识以为resolve()之后的代码不会执行
*/

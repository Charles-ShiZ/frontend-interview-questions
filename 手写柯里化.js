const curry = (fn, ...args1) =>
  args1.length >= fn.length // 如果传入参数数量大于函数预设参数数量，函数应当立即执行
    ? fn(...args1)
    : (...args2) => curry(fn, ...args1, ...args2);

function add1(x, y, z) {
  return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));

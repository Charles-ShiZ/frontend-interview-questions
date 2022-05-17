Function.prototype.myBind = function (context, ...args1) {
  if (typeof this !== 'function') {
    throw new Error('this must be a function');
  }
  context = context || globalThis;
  return (...args2) => this.call(context, ...args1, ...args2);
};

function addArguments(arg1, arg2) {
  return arg1 + arg2;
}
const aaq = addArguments.myBind({}, 1);
console.log(aaq(23));

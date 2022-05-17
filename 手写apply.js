Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    // 因为 myCall 本身也可能被 apply或call 调用
    throw new Error('this must be a function');
  }
  try {
    context = context || globalThis;
    context.fn = this;
    return context.fn(...args);
  } finally {
    delete context.fn;
  }
};

function a(x, y) {
  console.log(x, y);
}
a.myApply.apply(null, [123, 1]);

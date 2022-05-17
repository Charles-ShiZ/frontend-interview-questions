function typeOf(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
// slice 的 负数表示倒数第几个。比如 slice(8, -1) 表示，从第8个到倒数第1个，当然不包括倒数第1个。

/*
javascript有7种原始数据类：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8E%9F%E5%A7%8B%E5%80%BC
*/

// 本手写题参考：https://juejin.cn/post/6844903929705136141#heading-4

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  fn: () => {},
  map1: new Map([['a', { a: [2, 4, 8] }]]),
  set1: new Set([
    {
      child: 'child',
    },
  ]),
  // target2: target,
};

function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

function cloneObject(object) {
  const newObject = new object.constructor();
  Object.keys(object).forEach((key) => {
    newObject[key] = deepClone(object[key]);
  });
  return newObject;
}

function cloneArray(array) {
  const newArray = new Array();
  array.forEach((item, index) => {
    newArray[index] = deepClone(item);
  });
  return newArray;
}

function cloneMap(map) {
  const newMap = new Map();
  Array.from(map.keys()).forEach((key) => {
    newMap.set(key, deepClone(map.get(key)));
  });
  return newMap;
}

function cloneSet(set) {
  const newSet = new Set();
  Array.from(set).forEach((item) => {
    newSet.add(deepClone(item));
  });
  return newSet;
}

function cloneFunction(fn) {
  return fn;
}

function deepClone(target) {
  switch (typeOf(target)) {
    case 'number':
    case 'string':
    case 'boolean':
    case 'bigint':
    case 'null':
    case 'undefined':
    case 'symbol':
      return target;
    case 'object':
      return cloneObject(target);
    case 'array':
      return cloneArray(target);
    case 'map':
      return cloneMap(target);
    case 'set':
      return cloneSet(target);
    case 'function':
      return cloneFunction(target);
    default:
      return 'unknown type';
  }
}

console.log(deepClone(target));

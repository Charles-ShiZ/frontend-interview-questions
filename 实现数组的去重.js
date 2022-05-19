// 1. set
const array = [1, 2, 5, 6, 7, 6, 7, 7, 8];
function arraySet(array) {
  return Array.from(new Set(array));
}

//
function cleanRepeat(array) {
  let i = 0;
  let record = [];
  while (i < array.length) {
    const item = array[i];
    if (!record.includes(item)) {
      record.push(item);
    }
    i++;
  }
  return record;
}
console.log(cleanRepeat(array));

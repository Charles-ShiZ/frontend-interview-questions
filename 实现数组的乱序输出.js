const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function randomIndex(indexArray) {
  const index = Math.floor(indexArray.length * Math.random());
  try {
    return indexArray[index];
  } finally {
    indexArray.splice(index, 1);
  }
}
function randomArray(array) {
  const indexArray = [];
  for (let i = 0; i < array.length; i++) {
    indexArray.push(i);
  }
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const index = randomIndex(indexArray);
    newArray[index] = array[i];
  }
  return newArray;
}

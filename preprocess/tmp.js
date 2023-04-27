
const arr1 = ["A", "apple", "banana", "orange", "grape"];
const arr2 = ["banana", "watermelon", "grape"];

const filteredArr1 = arr1.filter((fruit) => !arr2.includes(fruit));

console.log(filteredArr1); // ["apple", "orange"]
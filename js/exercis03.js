'use strict';

const fruits = ['apple', 'banana', 'cantaloupe', 'blueberries', 'grapefruit'];
console.log("--- Вивід через цикл FOR ---");
for (let i = 0; i < fruits.length; i++) {
    console.log(`Індекс ${i}: ${fruits[i]}`);
}

console.log("--- Вивід через цикл WHILE ---");
let w = 0;
while (w < fruits.length) {
    console.log(`Індекс ${w}: ${fruits[w]}`); w++;
}

console.log("--- Вивід через цикл DO...WHILE ---"); 
let d = 0;
do { console.log(`Індекс ${d}: ${fruits[d]}`); d++; }
    while (d < fruits.length);

    const Numbs = [1,2,3,4,5,6,7,8,9,10];
console.log("--- Парні елементи масиву Numbs ---");
for (let i = 0; i < Numbs.length; i++) {
    if (Numbs[i] % 2 === 0) {
        console.log(`Парне число: ${Numbs[i]}`); }
}


const names = ['Batman'];
names.push('Joker');
names.unshift('Bane');
if (!names.includes('Alfred')) {
    names.push('Alfred');
}
let batmanIndex = names.indexOf('Batman');
if (batmanIndex !== -1) {
    names.splice(batmanIndex, 1);
}
console.log(`Фінальний склад масиву names: [${names.join(', ')}]`);


function sumInput() {
  let numbers = [];
  while (true) {
    let value = prompt("Введіть число:", 0);
    if (value === null || value === "" || !isFinite(value)) { break;}
    numbers.push(Number(value));
  }
  let sum = 0;
  for (let num of numbers) {
    sum += num; }
  return sum;
}
let totalSum = sumInput();
alert("Сума введених чисел: " + totalSum);
console.log(`Ви ввели числа, їхня сума становить: ${totalSum}`);


const styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
const middleIndex = Math.floor(styles.length / 2);
styles[middleIndex] = "Classics";
const removedElement = styles.shift();
console.log(`Видалений елемент: ${removedElement}`);
styles.unshift("Rap", "Reggae");
console.log(`Фінальний масив: [${styles.join(', ')}]`);


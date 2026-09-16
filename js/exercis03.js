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

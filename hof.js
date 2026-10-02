'use strict';

// Функція вищого порядку calculate
function calculate(operation, initialValue, numbers) {
  let result = initialValue;
  for (const number of numbers) {
    result = operation(result, number);
  }
  return result;
}

// Функція додавання
function sum(n1, n2) {
  return n1 + n2;
}

// Функція множення
function multiply(n1, n2) {
  return n1 * n2;
}

// Перевірка роботи:
console.log(calculate(sum, 0, [1, 2, 4]));      // => 7
console.log(calculate(multiply, 1, [1, 2, 4])); // => 8



let student_names = ["Wick", "Malcolm", "Smith"];

student_names.map((name, index, array) => {
  let arrayString = JSON.stringify(array).replace(/,/g, ", ");
  console.log(`name: ${name} | index: ${index} | array: ${arrayString}`);
});

let students_information = [
    {"name": "Wick", "degree": 375}, 
    {"name": "Malcolm", "degree": 405}, 
    {"name": "Smith", "degree": 453},
];

const maxDegree = 600;

// Отримуємо новий масив із відсотками
let updatedStudents = students_information.map(student => {
  return {
    ...student,
    percentage: (student.degree / maxDegree) * 100
  };
});

// Виводимо кожен об'єкт на консоль
updatedStudents.forEach(student => console.log(student));


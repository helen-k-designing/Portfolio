'use strict';


let user = {};
user.name = "Іван";
user.surname = "Сміт";
user.name = "Петро";
delete user.name;
console.log("Фінальний об'єкт user:", user);


function isEmpty(obj) {
  for (let key in obj) {
  return false; }
  return true; }
let schedule = {};
let result1 = isEmpty(schedule); 
schedule["8:30"] = "Вставай";
let result2 = isEmpty(schedule); 
console.log(`До: ${result1}, Після: ${result2}, Задача: ${schedule["8:30"]}`);


let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130 };
let sum = 0;
for (let name in salaries) {
  sum += salaries[name]; }
console.log(`Загальна сума всіх зарплат команди: ${sum}`);


function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'number') {
      obj[key] *= 2; }
  }
}
let menu = {
  width: 200,
  height: 300,
  title: "Моє меню"
};
multiplyNumeric(menu);
console.log("Оновлене меню:", menu);

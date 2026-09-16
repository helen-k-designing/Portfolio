'use strict';

/*
function checkAge(age) {
  return age > 18 ? true : confirm('Батьки дозволили?'); }

function checkAge(age) {
  return (age > 18) || confirm('Батьки дозволили?'); }

console.log(checkAge(10));
*/

/*
function min(a, b) { if (a < b) { return a; } 
else { return b; }
} 

function min(a, b) { return (a < b) ? a : b; }

console.log(min(7, 12));
*/

/*
function pow(x, n) { return n === 0 ? 1 : x * pow(x, n - 1); }
let x = Number(prompt("Введіть число:"));
let n = Number(prompt("Введіть натуральний степінь:"));
let result = pow(x, n);
alert(result);
console.log(result);
*/


function ask(question, yes, no) {
  if (confirm(question)) yes(); else no(); }
ask( "Ви згодні?",
  () => alert("Ви погодились."),            
  () => alert("Ви скасували виконання.") );
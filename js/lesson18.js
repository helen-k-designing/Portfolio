'use strict';

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(a, b) {
    if (b === undefined) {
      let oldResult = this.result;
      this.result = this.result + a;
      console.log(`Операція: ${oldResult} + ${a} = ${this.result}`);
    } else {
      this.result = a + b;
      console.log(`Операція: ${a} + ${b} = ${this.result}`);
    }
    return this.result;
  }

  subtract(a, b) {
    if (b === undefined) {
      let oldResult = this.result;
      this.result = this.result - a;
      console.log(`Операція: ${oldResult} - ${a} = ${this.result}`);
    } else {
      this.result = a - b;
      console.log(`Операція: ${a} - ${b} = ${this.result}`);
    }
    return this.result;
  }

  multiply(a, b) {
    if (b === undefined) {
      let oldResult = this.result;
      this.result = this.result * a;
      console.log(`Операція: ${oldResult} * ${a} = ${this.result}`);
    } else {
      this.result = a * b;
      console.log(`Операція: ${a} * ${b} = ${this.result}`);
    }
    return this.result;
  }

  divide(a, b) {
    if (b === undefined) {
      let oldResult = this.result;
      this.result = this.result / a;
      console.log(`Операція: ${oldResult} / ${a} = ${this.result}`);
    } else {
      this.result = a / b;
      console.log(`Операція: ${a} / ${b} = ${this.result}`);
    }
    return this.result;
  }

  displayResult() {
    console.log(`Фінальне значення властивості result: ${this.result}`);
  }
}

console.log("--- Перевірка роботи Калькулятора ---");

let myCalc = new Calculator();

myCalc.add(5, 10);
myCalc.multiply(2);
myCalc.subtract(100, 40);
myCalc.divide(3);
myCalc.displayResult();
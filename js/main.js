'use strict';

const classes = ['first', 'second', 'third', 'fourth'];


let firstParagraph = document.querySelector('#p1');
firstParagraph.style.backgroundColor = "gold";
console.log("Елемент успішно знайдено та стилізовано:", firstParagraph);


let secondParagraph = document.querySelector('#p2');
secondParagraph.style.backgroundColor = "gold";
secondParagraph.style.color = "blue";
secondParagraph.style.fontSize = "2rem";
console.log("Другий абзац успішно стилізовано:", secondParagraph);


let thirdParagraph = document.querySelector('#p3');
thirdParagraph.classList.add('third');
console.log("Для третього абзацу додано клас:", thirdParagraph);


let fourthParagraph = document.querySelector('#p4');
fourthParagraph.classList.add('fourth', 'border');
console.log("Для четвертого абзацу додано класи:", fourthParagraph);


let allButtons = document.querySelectorAll('button');

let firstButton = allButtons[0];
if (firstButton) {
    firstButton.style.backgroundColor = "gold";
    firstButton.style.color = "blue";
    console.log("Першу кнопку успішно знайдено та стилізовано:");
}

let secondButton = allButtons[1];
if (secondButton) {
    secondButton.onclick = function () {
        document.querySelector('#p1').style.display = "none";
    };
    console.log("Другу кнопку знайдено та стилізовано:");
}

let thirdButton = allButtons[2];
if (thirdButton) {
    thirdButton.onclick = function () {
        let paragraph1 = document.querySelector('#p1');
        if (paragraph1) {
            paragraph1.style.display = "block";
            console.log("Параграф p1 знову успішно відображено на сторінці!");
        }
    };
}

let fourthButton = allButtons[3];
if (fourthButton) {
    fourthButton.onclick = function () {
        document.body.classList.toggle('dark-theme');
        let isDark = document.body.classList.contains('dark-theme');
        console.log(`Тему змінено! Поточний режим: ${isDark ? 'ТЕМНИЙ 🌙' : 'СВІТЛИЙ ☀️'}`);
    };
}

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


let firstButton = document.querySelector('button');
firstButton.style.backgroundColor = "gold";
firstButton.style.color = "blue";
console.log("Першу кнопку успішно знайдено та стилізовано:", firstButton);


let allButtons = document.querySelectorAll('button');
let secondButton = allButtons[1];
secondButton.onclick = function() {
    document.querySelector('#p1').style.display = "none";
};
console.log("Другу кнопку знайдено та стилізовано:", secondButton);


let buttonsList = document.querySelectorAll('button');
let thirdButton = buttonsList[2];
    thirdButton.onclick = function() {
        let paragraph1 = document.querySelector('#p1');
        if (paragraph1) {
            paragraph1.style.display = "block";
            console.log("Параграф p1 знову успішно відображено на сторінці!", thirdButton);
        }
    };
    
    
let allProjectButtons = document.querySelectorAll('button');
let fourthButton = allProjectButtons[3];
    fourthButton.onclick = function() {
        document.body.classList.toggle('dark-theme');
        let isDark = document.body.classList.contains('dark-theme');
        console.log(`Тему змінено! Поточний режим: ${isDark ? 'ТЕМНИЙ 🌙' : 'СВІТЛИЙ ☀️'}`);
    };



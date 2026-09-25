'use strict';


let alertBox = document.querySelector('#alert');


let btnPrimary = document.querySelector('.btn-primary');
btnPrimary.onclick = function() {
    alertBox.classList.add('alert-primary');
    alertBox.textContent = "A simple primary alert—check it out!";
    console.log("Клікнуто кнопку Primary. Текст змінено на: 'A simple primary alert—check it out!'");
};


let btnSecondary = document.querySelector('.btn-secondary');
btnSecondary.addEventListener('click', function() {
    alertBox.classList.add('alert-primary');
    alertBox.textContent = "A simple secondary alert—check it out!";
    console.log("Клікнуто кнопку Secondary. Текст змінено на: 'A simple secondary alert—check it out!'");
});


let btnSuccess = document.querySelector('.btn-success');
btnSuccess.addEventListener('mouseover', function() {
    alertBox.classList.add('alert-success');
    alertBox.textContent = "A simple success alert—check it out!";
    console.log("Подія mouseover на кнопці Success. Текст встановлено.");
});
btnSuccess.addEventListener('mouseout', function() {
    alertBox.classList.remove('alert-success');
    alertBox.textContent = "";
    console.log("Подія mouseout на кнопці Success. Текст очищено.");
});


let btnDanger = document.querySelector('.btn-danger');
btnDanger.addEventListener('focus', function() {
    alertBox.classList.add('alert-danger');
    alertBox.textContent = "A simple danger alert—check it out!";
    console.log("Кнопка Danger отримала фокус (focus). Текст встановлено.");
});
btnDanger.addEventListener('focusout', function() {
    alertBox.classList.remove('alert-danger');
    alertBox.textContent = "";
    console.log("Кнопка Danger втратила фокус (focusout). Текст очищено.");
});

let btnLight = document.querySelector('.btn-light');
let btnDark = document.querySelector('.btn-dark');
btnLight.classList.add('hide');
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    let isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        btnLight.classList.remove('hide');
        btnDark.classList.add('hide');
        console.log("Переключено тему сайту: увімкнено ТЕМНИЙ режим (dark-mode).");
    } else {
        btnDark.classList.remove('hide');
        btnLight.classList.add('hide');
        console.log("Переключено тему сайту: повернуто СВІТЛИЙ режим.");
    }
}
btnLight.addEventListener('click', toggleMode);
btnDark.addEventListener('click', toggleMode);


let btnInfo = document.querySelector('.btn-info');
btnInfo.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        alertBox.classList.add('alert-info');
        alertBox.textContent = "A simple info alert—check it out!";
        console.log("На кнопці Info натиснуто клавішу Enter. Типову дію скасовано, текст змінено.");
    }
});


let cards = document.querySelectorAll('.card');
for (let i = 0; i < cards.length; i++) {
    let cardTitle = cards[i].querySelector('.card-title');
    console.log(cardTitle.textContent);
}


for (let i = 0; i < cards.length; i++) {
    let currentCard = cards[i];
    let addToCartBtn = currentCard.querySelector('.add-to-cart');
    let cardTitle = currentCard.querySelector('.card-title');
    addToCartBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        console.log(cardTitle.textContent);
    });
}
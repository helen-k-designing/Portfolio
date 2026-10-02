'use strict';

// Чекаємо, поки браузер повністю побудує всі HTML-теги на сторінці
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. СЕЛЕКТОРИ ЕЛЕМЕНТІВ ІНТЕРФЕЙСУ
    // ==========================================================================
    const modal = document.getElementById('modalOverlay');       /* Підкладка модального вікна */
    const openBtn = document.getElementById('openModalBtn');     /* Кнопка "Open Registration" */
    const closeBtn = document.getElementById('closeModalBtn');   /* Хрестик закриття карти */
    const form = document.querySelector('form');                 /* Сама HTML-форма реєстрації */

    // Текстові поля введення інформації
    const firstInput = document.getElementById('lastName');
    const firstNameInput = document.getElementById('firstName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Нативні радіо-кнопки статі
    const genderFemale = document.getElementById('genderFemale');
    const genderMale = document.getElementById('genderMale');

    // Текстові спани під інпутами для виведення помилок валідації
    const lastNameError = document.getElementById('lastNameError');
    const firstNameError = document.getElementById('firstNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError = document.getElementById('genderError');

    // Змінна для збереження кнопки, яка відкрила модалку (для повернення фокусу)
    let lastActiveElement;

    // ==========================================================================
    // 2. ФУНКЦІЇ КЕРУВАННЯ ВІКНОМ ТА СКИДАННЯ ПОМИЛОК
    // ==========================================================================
    
    // Функція закриття модального вікна
    function closeModalWindow() {
        modal.classList.remove('active');  // Вимикаємо видимість вікна в CSS
        document.body.style.overflow = '';  // Повертаємо прокрутку основного сайту
        form.reset();                      // Повністю очищаємо всі введені дані
        clearAllErrors();                  // Стираємо червоні коментарі помилок
        if (lastActiveElement) lastActiveElement.focus(); // Повертаємо фокус клавіатури
    }

    // Очищення маркерів та текстів помилок
    function clearAllErrors() {
        // Очищаємо вміст текстових спанів
        [lastNameError, firstNameError, emailError, phoneError, passwordError, confirmPasswordError, genderError].forEach(err => {
            if (err) err.textContent = '';
        });
        // Знімаємо блокування відправки форми браузером
        [firstInput, firstNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput, genderFemale, genderMale].forEach(inp => {
            if (inp) inp.setCustomValidity('');
        });
    }

    // Відкриття вікна реєстрації при кліку на головну кнопку
    openBtn.addEventListener('click', () => {
        lastActiveElement = document.activeElement; // Запам'ятовуємо, де стояв користувач
        modal.classList.add('active');              // Показуємо підкладку в CSS
        document.body.style.overflow = 'hidden';    // Забороняємо гортати сайт на фоні

        // Чекаємо плавної CSS-анімації з'явлення картки
        modal.addEventListener('transitionend', function onEnd(e) {
            // Примусово фокусуємо перше поле "Last Name" строго після появи форми
            if (e.target === modal) {
                if (firstInput) firstInput.focus();
                modal.removeEventListener('transitionend', onEnd); // Знімаємо слухач подій
            }
        });
    });

    // Обробники закриття форми на хрестик та клік повз картку
    closeBtn.addEventListener('click', closeModalWindow);
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) closeModalWindow(); 
    });

    // ==========================================================================
    // 3. ЛОГІКА РОБОТИ ІКОНОК ОКА (Показ пароля)
    // ==========================================================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target'); // Зчитуємо цільове поле
            const input = document.getElementById(targetId);
            const openEye = this.querySelector('.eye-open');
            const closedEye = this.querySelector('.eye-closed');

            if (input.type === 'password') {
                input.type = 'text';
                openEye.classList.remove('hidden');
                closedEye.classList.add('hidden');
            } else {
                input.type = 'password';
                openEye.classList.add('hidden');
                closedEye.classList.remove('hidden');
            }
        });
    });

    // ==========================================================================
    // 4. ОПТИМІЗАЦІЯ КЕРУВАННЯ СТАТТЮ (Покроковий Tab)
    // ==========================================================================
    [genderFemale, genderMale].forEach(radio => {
        if (radio) {
            // Очищення помилки статі при кліку або зміні варіанта
            radio.addEventListener('change', () => {
                genderError.textContent = '';
                genderFemale.setCustomValidity('');
                genderMale.setCustomValidity('');
            });
            
            // Автоматичний вибір статі, щойно клавіша Tab навела фокус на кружечок
            radio.addEventListener('focus', () => {
                radio.checked = true; // Варіант стає активним автоматично
                genderError.textContent = '';
                genderFemale.setCustomValidity('');
                genderMale.setCustomValidity('');
            });
        }
    });

    // Перевірка вибору статі перед відправкою форми
    function validateGender() {
        if (!genderFemale.checked && !genderMale.checked) {
            genderError.textContent = 'Будь ласка, оберіть вашу стать.';
            genderFemale.setCustomValidity('Оберіть стать');
        } else {
            genderError.textContent = '';
            genderFemale.setCustomValidity('');
            genderMale.setCustomValidity('');
        }
    }

    // ==========================================================================
    // 5. ЖИВА ВАЛІДАЦІЯ ТЕКСТОВИХ ПОЛІВ ВВЕДЕННЯ
    // ==========================================================================
    
    function validateLastName() {
        if (!firstInput.value.trim()) {
            lastNameError.textContent = "Поле Last Name не може бути порожнім.";
            firstInput.setCustomValidity("Заповніть поле.");
        } else { lastNameError.textContent = ""; firstInput.setCustomValidity(""); }
    }

    function validateFirstName() {
        if (!firstNameInput.value.trim()) {
            firstNameError.textContent = "Поле First Name не може бути порожнім.";
            firstNameInput.setCustomValidity("Заповніть поле.");
        } else { firstNameError.textContent = ""; firstNameInput.setCustomValidity(""); }
    }

    function validateEmail() {
        if (!emailInput.value.trim()) {
            emailError.textContent = "Поле Email не може бути порожнім.";
            emailInput.setCustomValidity("Заповніть поле.");
        } else if (!emailInput.checkValidity()) {
            // Нативна перевірка структури пошти на наявність @ та домену
            emailError.textContent = "Введіть коректний Email (наприклад: name@mail.com).";
            emailInput.setCustomValidity("Некоректний формат.");
        } else { emailError.textContent = ""; emailInput.setCustomValidity(""); }
    }

    function validatePhone() {
        if (!phoneInput.value.trim()) {
            phoneError.textContent = "Поле Phone Number не може бути порожнім.";
            phoneInput.setCustomValidity("Заповніть поле.");
        } else { phoneError.textContent = ""; phoneInput.setCustomValidity(""); }
    }

    // Комплексна перевірка паролів (довжина + ідентичність)
    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!password) {
            passwordError.textContent = 'Поле Password не може бути порожнім.';
            passwordInput.setCustomValidity('Заповніть поле.');
        } else if (password.length < 8) {
            passwordError.textContent = 'Пароль має містити щонайменше 8 символів.';
            passwordInput.setCustomValidity('Занадто короткий.');
        } else { passwordError.textContent = ''; passwordInput.setCustomValidity(''); }

        // Якщо поле повтору пароля ще порожнє — помилку не виводимо завчасно
        if (!confirmPassword) {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.setCustomValidity('');
            return;
        }

        // Перевіряємо збіг обох полів
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Паролі не збігаються!';
            confirmPasswordInput.setCustomValidity('Паролі повинні збігатися.');
        } else { confirmPasswordError.textContent = ''; confirmPasswordInput.setCustomValidity(''); }
    }

    // Підключаємо живих слухачів для перевірки полів у реальному часі «на льоту»
    firstInput.addEventListener('input', validateLastName);
    firstNameInput.addEventListener('input', validateFirstName);
    emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
passwordInput.addEventListener('input', validatePasswords);
confirmPasswordInput.addEventListener('input', validatePasswords);
// ==========================================================================
// 6. ЗАПОБІЖНИК ВІД ВИПАДКОВОГО НАТИСКАННЯ ENTER В ПОЛЯХ
// ==========================================================================
form.addEventListener('keydown', (e) => {
// Якщо натиснуто Enter всередині текстових інпутів — забороняємо ламати сторінку
if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
e.preventDefault(); // Скасовуємо передчасну відправку форми
// Зручне покращення: переводимо фокус на наступне поле замість помилки
const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]'));
const currentIndex = inputs.indexOf(e.target);
if (currentIndex > -1 && currentIndex < inputs.length - 1) {
inputs[currentIndex + 1].focus();
}
}
});
// ==========================================================================
// 7. ОБРОБКА ВІДПРАВКИ ФОРМИ (Клік на кнопку "Register")
// ==========================================================================
form.addEventListener('submit', (e) => {
// Примусово запускаємо валідацію абсолютно всіх полів перед надсиланням
validateLastName();
validateFirstName();
validateEmail();
validatePhone();
validatePasswords();
validateGender();
// Перевіряємо загальну валідність. Якщо є хоча б один маркер setCustomValidity
if (!form.checkValidity()) {
e.preventDefault(); // Забороняємо браузеру перезавантажувати сторінку
console.log('Скасовано: форма реєстрації містить помилки заповнення.');
return; // Зупиняємо відправку даних
}
e.preventDefault(); // Запобігаємо перезавантаженню статичної сторінки
// Збираємо дані через FormData
const formData = new FormData(form);
const data = Object.fromEntries(formData.entries());
console.log('Дані реєстрації успішно надіслано в консоль:', data);
// Успішне сповіщення та повне закриття форми
alert(`Дякуємо, ${data.firstName}! Реєстрація пройшла успішно.`);
form.reset();
closeModalWindow();
});
});
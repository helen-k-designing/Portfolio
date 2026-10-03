'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. СЕЛЕКТОРИ ДЛЯ МОДАЛЬНОГО ВІКНА ВХОДУ (SIGN IN)
    // ==========================================================================
    const loginModal = document.getElementById('loginModalOverlay');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const cancelLoginBtn = document.getElementById('cancelLoginBtn');
    const loginForm = document.getElementById('loginForm');
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // ==========================================================================
    // 2. СЕЛЕКТОРИ ДЛЯ МОДАЛЬНОГО ВІКНА РЕЄСТРАЦІЇ (REGISTRATION)
    // ==========================================================================
    const registerModal = document.getElementById('registerModalOverlay');
    const closeRegisterBtn = document.getElementById('closeRegisterBtn');
    const registrationForm = document.getElementById('registrationForm');

    const lastNameInput = document.getElementById('lastName');
    const firstNameInput = document.getElementById('firstName');
    const phoneInput = document.getElementById('phone');
    const regPasswordInput = document.getElementById('password-reg'); // Бажано дати унікальний ID у формі реєстрації
    const confirmPasswordInput = document.getElementById('confirm-password');

    const lastNameError = document.getElementById('lastNameError');
    const firstNameError = document.getElementById('firstNameError');
    const emailRegError = document.getElementById('emailRegError'); // Унікальний спан помилки пошти реєстрації
    const phoneError = document.getElementById('phoneError');
    const passwordRegError = document.getElementById('passwordRegError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError = document.getElementById('genderError');

    // Нативні радіо-кнопки статі
    const genderFemale = document.getElementById('genderFemale');
    const genderMale = document.getElementById('genderMale');

    // Спільна змінна для повернення фокусу клавіатури після закриття будь-якого вікна
    let lastActiveElement;

    // ==========================================================================
    // 3. УНІВЕРСАЛЬНІ ФУНКЦІЇ ДЛЯ ВІДКРИТТЯ ТА ЗАКРИТТЯ ВІКОН
    // ==========================================================================
    
    function openModal(modalElement, firstInput) {
        if (!modalElement) return;
        lastActiveElement = document.activeElement; // Запам'ятовуємо, де був користувач
        modalElement.classList.add('active');       // Додаємо твій фірмовий клас active з CSS
        document.body.style.overflow = 'hidden';    // Заморожуємо фон галереї

        // Стабільний автофокус на перше поле форми через 50мс
        setTimeout(() => {
            if (firstInput) firstInput.focus();
        }, 50);
    }

    function closeModal(modalElement, formElement, errorSpans = []) {
        if (!modalElement) return;
        modalElement.classList.remove('active'); // Ховаємо вікно за допомогою CSS
        document.body.style.overflow = '';       // Повертаємо скрол сторінці галереї
        
        formElement?.reset(); // Повністю очищаємо поля форми

        // Очищаємо всі кастомні тексти помилок
        errorSpans.forEach(span => {
            if (span) span.textContent = '';
        });

        // Скидаємо маркери валідації браузера
        const inputs = formElement?.querySelectorAll('input');
        inputs?.forEach(input => input.setCustomValidity(''));

        if (lastActiveElement) lastActiveElement.focus(); // Повертаємо фокус на кнопку меню
    }

    // ==========================================================================
    // 4. СЛУХАЧІ КЛІКІВ ДЛЯ НАВІГАЦІЇ (КЕРУВАННЯ ЧЕРЕЗ ХЕШІ #)
    // ==========================================================================
    
    // Функція, яка перевіряє адресу сторінки і вирішує, яке вікно відкрити
    function checkUrlHash() {
        const hash = window.location.hash;
        
        if (hash === '#open-login') {
            openModal(loginModal, emailInput);
        } else if (hash === '#open-register-modal') {
            openModal(registerModal, lastNameInput);
        }
    }

    // Стежимо за завантаженням сторінки
    checkUrlHash();

    // НАДВАЖЛИВО: стежимо за зміною хешу без перезавантаження сторінки (коли користувач клікає по меню прямо на сторінці галереї)
    window.addEventListener('hashchange', checkUrlHash);

    // ==========================================================================
    // 5. ОБРОБНИКИ ПОДІЙ ДЛЯ ЗАКРИТТЯ ВІКОН
    // ==========================================================================
    
    // Кліки для вікна входу
    closeLoginBtn?.addEventListener('click', () => closeModal(loginModal, loginForm, [emailError, passwordError]));
    cancelLoginBtn?.addEventListener('click', () => closeModal(loginModal, loginForm, [emailError, passwordError]));
    loginModal?.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal, loginForm, [emailError, passwordError]);
    });

    // Кліки для вікна реєстрації
    closeRegisterBtn?.addEventListener('click', () => closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]));
    registerModal?.addEventListener('click', (e) => {
        if (e.target === registerModal) closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]);
    });

    // Додатково для зручності: закриття будь-якого відкритого вікна клавішею Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (loginModal?.classList.contains('active')) closeModal(loginModal, loginForm, [emailError, passwordError]);
            if (registerModal?.classList.contains('active')) closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]);
            
            // Очищаємо хеш в адресному рядку, щоб при повторному кліку по меню все працювало коректно
            window.location.hash = ''; 
        }
    });

    // ==========================================================================
    // 6. ЛОГІКА ОКА (ПОКАЗ/ПРИХОВАННЯ ПАРОЛІВ) ДЛЯ ОБОХ ФОРМ
    // ==========================================================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;

            const openEye = this.querySelector('.eye-open');
            const closedEye = this.querySelector('.eye-closed');

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            
            openEye?.classList.toggle('hidden', !isPassword);
            closedEye?.classList.toggle('hidden', isPassword);
        });
    });

    // ==========================================================================
    // 7. ОПТИМІЗАЦІЯ КЕРУВАННЯ СТАТТЮ (Твоя фішка з Tab)
    // ==========================================================================
    [genderFemale, genderMale].forEach(radio => {
        if (radio) {
            radio.addEventListener('change', () => {
                if (genderError) genderError.textContent = '';
                genderFemale.setCustomValidity('');
                genderMale.setCustomValidity('');
            });
            radio.addEventListener('focus', () => {
                radio.checked = true;
                if (genderError) genderError.textContent = '';
                genderFemale.setCustomValidity('');
                genderMale.setCustomValidity('');
            });
        }
    });

    // ==========================================================================
    // 8. ЗАПОБІЖНИК ВІД ENTER ТА ВАЛІДАЦІЯ НАДСИЛАННЯ ФОРМ
    // ==========================================================================
    
    // Запобіжник для Enter
    document.querySelectorAll('form').forEach(formElement => {
        formElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                e.preventDefault();
                const inputs = Array.from(formElement.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]'));
                const currentIndex = inputs.indexOf(e.target);
                if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        });
    });

    // --- ОБРОБКА ФОРМИ ВХОДУ ---
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault(); // Скасовуємо перезавантаження
        
        // (Тут будуть твої функції індивідуальної перевірки validateEmail, validatePassword)
        if (!loginForm.checkValidity()) return;

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Успішний вхід прямо з галереї:', data);
        
        alert(`Ласкаво просимо, ${data.email}!`);
        closeModal(loginModal, loginForm, [emailError, passwordError]);
        window.location.hash = ''; // Очищаємо хвіст URL
    });

// --- ОБРОБКА ФОРМИ РЕЄСТРАЦІЇ ---
registrationForm?.addEventListener('submit', (e) => {
e.preventDefault();
// (Тут будуть твої функції валідації полей реєстрації)
if (!registrationForm.checkValidity()) return;
const formData = new FormData(registrationForm);
const data = Object.fromEntries(formData.entries());
console.log('Успішна реєстрація прямо з галереї:', data);
alert(`Вітаємо, ${data.firstName}! Реєстрація пройшла успішно.`);
closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]);
window.location.hash = '';
});
});
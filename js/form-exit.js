'use strict';

// Очікуємо повного завантаження структури HTML-документа
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. СЕЛЕКТОРИ ЕЛЕМЕНТІВ ІНТЕРФЕЙСУ
    // ==========================================================================
    const modal = document.getElementById('modalOverlay');       /* Підкладка модального вікна */
    const openBtn = document.getElementById('openModalBtn');     /* Кнопка "Open Login" на сайті */
    const closeBtn = document.getElementById('closeModalBtn');   /* Хрестик закриття карти */
    const cancelBtn = document.getElementById('cancelModalBtn'); /* Кнопка "Відмінити" всередині форми */
    const form = document.getElementById('loginForm');           /* Тег самої форми <form> */

    // Поля введення даних користувача
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Текстові спани під інпутами, куди записуються помилки
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Змінна для зберігання кнопки, яка відкрила форму (щоб повернути фокус клавіатури)
    let lastActiveElement;

    // ==========================================================================
    // 2. ПЕРЕВІРКА СТАТУСУ АВТОРИЗАЦІЇ ПРИ ЗАВАНТАЖЕННІ
    // ==========================================================================
    // Читаємо браузерну пам'ять localStorage. Якщо там є прапорець успішного входу
    const isUserAuthorized = localStorage.getItem('isAuthorized') === 'true';
    
    if (isUserAuthorized && openBtn) {
        // Змінюємо текст головної кнопки, щоб користувач бачив, що він вже увійшов
        openBtn.textContent = "Перейти в кабінет";
    }

    // ==========================================================================
    // 3. ФУНКЦІЇ КЕРУВАННЯ МОДАЛЬНИМ ВІКНОМ
    // ==========================================================================
    
    // Функція повного закриття форми
    function closeModalWindow() {
        modal.classList.remove('active'); // Ховаємо підкладку вікна в CSS
        document.body.style.overflow = ''; // Повертаємо прокрутку сторінки сайту
        
        // Очищаємо всі введені дані та тексти помилок при закритті форми
        form.reset();
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.setCustomValidity('');
        passwordInput.setCustomValidity('');
        
        // Повертаємо фокус клавіатури назад на кнопку, яка відкрила форму
        if (lastActiveElement) lastActiveElement.focus();
    }

    // Відкриття форми при кліку на кнопку "Open Login"
    openBtn.addEventListener('click', () => {
        lastActiveElement = document.activeElement; // Запам'ятовуємо, де був фокус користувача
        modal.classList.add('active');              // Показуємо вікно в CSS
        document.body.style.overflow = 'hidden';    // Блокуємо прокрутку сайту на фоні

        // Чекаємо плавного завершення CSS-анімації з'явлення форми (transition)
        modal.addEventListener('transitionend', function onEnd(e) {
            // Робимо автофокус на перше поле Email тільки після того, як вікно повністю з'явилося
            if (e.target === modal) {
                if (emailInput) emailInput.focus();
                modal.removeEventListener('transitionend', onEnd); // Вимикаємо слухач, щоб не повторювався
            }
        });
    });

    // Підключаємо подію закриття на хрестик та кнопку "Відмінити"
    if (closeBtn) closeBtn.addEventListener('click', closeModalWindow);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModalWindow);

    // Закриваємо вікно, якщо користувач клікнув повз форму (на темну підкладку)
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) closeModalWindow(); 
    });

    // ==========================================================================
    // 4. ЛОГІКА РОБОТИ ІКОНКИ ОКА (Показ/приховання пароля)
    // ==========================================================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target'); // Зчитуємо id цільового інпуту (password)
            const input = document.getElementById(targetId);
            
            const openEyeIcon = this.querySelector('.eye-open');
            const closedEyeIcon = this.querySelector('.eye-closed');

            // Якщо пароль прихований — перемикаємо на звичайний текст і міняємо іконку
            if (input.type === 'password') {
                input.type = 'text';
                openEyeIcon.classList.remove('hidden');
                closedEyeIcon.classList.add('hidden');
            } else {
                // Якщо текст видно — ховаємо назад у крапочки
                input.type = 'password';
                openEyeIcon.classList.add('hidden');
                closedEyeIcon.classList.remove('hidden');
            }
        });
    });

    // ==========================================================================
    // 5. ФУНКЦІЇ КАСТОМНОЇ ВАЛІДАЦІЇ ПОЛІВ ВВЕДЕННЯ
    // ==========================================================================

    // Перевірка правильності написання Email
    function validateEmail() {
        const emailValue = emailInput.value.trim(); // Видаляємо випадкові пробіли по боках

        if (!emailValue) {
            emailError.textContent = 'Поле Email не може бути порожнім.';
            emailInput.setCustomValidity('Заповніть це поле.'); // Ставимо маркер помилки для браузера
        } else if (!emailInput.checkValidity()) {
            // Вбудований метод .checkValidity() сам перевіряє наявність знака @ та крапки домену
            emailError.textContent = 'Введіть коректну адресу електронної пошти (наприклад: name@mail.com).';
            emailInput.setCustomValidity('Некоректний формат email.');
        } else {
            // Якщо все заповнено правильно — очищаємо помилки
            emailError.textContent = '';
            emailInput.setCustomValidity(''); // Знімаємо маркер, поле стає валідним
        }
    }

    // Перевірка поля Пароль
    function validatePassword() {
        const passwordValue = passwordInput.value;

        if (!passwordValue) {
            passwordError.textContent = 'Поле Пароль не може бути порожнім.';
            passwordInput.setCustomValidity('Заповніть це поле.');
        } else if (passwordValue.length < 6) {
            passwordError.textContent = 'Пароль має містити щонайменше 6 символів.';
            passwordInput.setCustomValidity('Пароль занадто короткий.');
        } else {
            passwordError.textContent = '';
            passwordInput.setCustomValidity('');
        }
    }

    // Підключаємо живих слухачів подій. Функції перевірки викликаються 
    // автоматично «на льоту» при кожному введенні символу користувачем
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // ==========================================================================
    // 6. ОБРОБКА НАДСИЛАННЯ ФОРМИ (Клік на кнопку "Увійти")
    // ==========================================================================
    form.addEventListener('submit', (e) => {
        // Примусово запускаємо валідацію обох полів ще раз прямо в момент відправки
        validateEmail();
        validatePassword();

        // Перевіряємо загальну валідність форми. Якщо метод .checkValidity() бачить 
        // хоча б одну кастомну помилку setCustomValidity — скасовуємо відправку
        if (!form.checkValidity()) {
            e.preventDefault(); // Забороняємо сторінці ламатися чи перезавантажуватися
            console.log('Форма містить помилки заповнення. Відправку скасовано.');
            return; // Перериваємо виконання функції
        }

        e.preventDefault(); // Запобігаємо перезавантаженню у разі повної успішності
        
        // Збираємо дані з усіх полів за допомогою вбудованого об'єкта FormData
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Перетворюємо у простий читабельний об'єкт
        
        console.log('Дані авторизації надіслано успішно:', data);
        
        // Якщо користувач увімкнув прапорець "Remember Me" — зберігаємо статус авторизації
        if (data.rememberMe) {
            localStorage.setItem('isAuthorized', 'true');
        }
        
        // Сповіщаємо про успішний вхід та закриваємо модалку
        alert(`Ласкаво просимо! Ви успішно увійшли як: ${data.email}`);
        form.reset();
        closeModalWindow();
    });

});

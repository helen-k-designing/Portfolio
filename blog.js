`use strict`;

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');

    // Отримання даних із сервера
    fetch('https://dummyjson.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Помилка завантаження: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Очищення статичних статтей, що були в HTML
            mainContent.innerHTML = '';

            // Перебирання отриманих постів та створення HTML-структури
            data.posts.forEach(post => {
                const article = document.createElement('article');
                article.classList.add('post');

                const h2 = document.createElement('h2');
                h2.textContent = post.title;

                const p = document.createElement('p');
                p.textContent = post.body;

                article.appendChild(h2);
                article.appendChild(p);

                mainContent.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Помилка при отриманні даних:', error);
            mainContent.innerHTML = '<p>Не вдалося завантажити статті. Спробуйте пізніше.</p>';
        });
});
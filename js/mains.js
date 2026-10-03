/**
 * Клас для керування слайдером (підтримує фото та YouTube відео)
 */
class GallerySlider {
  constructor(containerElement) {
    // Якщо контейнер не передано в функцію — зупиняємо роботу
    if (!containerElement) return;

    this.container = containerElement;
    this.currentIndex = 0; // Номер поточного слайда
    this.isHovered = false; // Чи знаходиться курсор над слайдером
    this.fadeTimeout = null; // Сюди записуватимемо таймер анімації

    // Знаходимо всі потрібні елементи всередині нашого контейнера
    this.mainPhoto = this.container.querySelector('.main-photo');
    this.mainYoutube = this.container.querySelector('.main-youtube');
    this.thumbnails = this.container.querySelectorAll('.thumb');
    this.prevBtn = this.container.querySelector('.prev-btn');
    this.nextBtn = this.container.querySelector('.next-btn');
    this.thumbnailsContainer = this.container.querySelector('.thumbnails-list');

    // Запускаємо налаштування подій та фонове завантаження картинок
    this.initEvents();
    this.preloadImages();
  }

  /**
   * Фонове завантаження великих фото, щоб вони не миготіли білим при першому показі
   */
  preloadImages() {
    this.thumbnails.forEach(thumb => {
      const url = thumb.getAttribute('data-large');
      // Якщо це посилання на фото (не відео) — змушуємо браузер завантажити його в кеш
      if (url && !url.includes('youtube.com') && !url.includes('youtu.be')) {
        const img = new Image();
        img.src = url;
      }
    });
  }

  /**
   * Головний метод зміни слайда
   */
  updateGallery(index) {
    // Скасовуємо попередній таймер зміни слайда, якщо користувач клікає дуже швидко
    if (this.fadeTimeout) clearTimeout(this.fadeTimeout);

    // Робимо поточні медіа-елементи прозорими (початок анімації зникнення)
    if (this.mainPhoto) this.mainPhoto.style.opacity = '0';
    if (this.mainYoutube) this.mainYoutube.style.opacity = '0';

    // Чекаємо 150мс, поки згасне старий слайд, і вмикаємо новий
    this.fadeTimeout = setTimeout(() => {
      this.currentIndex = index;
      const activeThumb = this.thumbnails[this.currentIndex];
      if (!activeThumb) return;

      const mediaUrl = activeThumb.getAttribute('data-large') || '';
      const isYouTube = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');

      // Налаштовуємо видимість елементів залежно від типу медіа (Фото чи Відео)
      if (this.mainYoutube) {
        this.mainYoutube.src = isYouTube ? mediaUrl : ''; // Очищуємо src для відео, щоб вимкнути звук
        this.mainYoutube.classList.toggle('hide', !isYouTube);
        if (isYouTube) this.mainYoutube.style.opacity = '1';
      }

      if (this.mainPhoto) {
        this.mainPhoto.src = isYouTube ? '' : mediaUrl;
        this.mainPhoto.classList.toggle('hide', isYouTube);
        if (!isYouTube) this.mainPhoto.style.opacity = '1';
      }

      // Оновлюємо підсвітку активної мініатюри внизу
      this.thumbnails.forEach(t => t.classList.remove('active'));
      activeThumb.classList.add('active');
    }, 150);
  }

  /**
   * Перемикання на наступний слайд по колу
   */
  next() {
    const nextIndex = (this.currentIndex + 1) % this.thumbnails.length;
    this.updateGallery(nextIndex);
  }

  /**
   * Перемикання на попередній слайд по колу
   */
  prev() {
    const prevIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
    this.updateGallery(prevIndex);
  }

  /**
   * Налаштування кліків та керування клавіатурою
   */
  initEvents() {
    // Кліки по стрілочках
    this.nextBtn?.addEventListener('click', () => this.next());
    this.prevBtn?.addEventListener('click', () => this.prev());

    // Клік по мініатюрах (використовуємо делегування подій для економії пам'яті)
    this.thumbnailsContainer?.addEventListener('click', (event) => {
      const targetThumb = event.target.closest('.thumb');
      if (targetThumb && this.thumbnailsContainer.contains(targetThumb)) {
        const clickedIndex = Number(targetThumb.getAttribute('data-index'));
        this.updateGallery(clickedIndex);
      }
    });

    // Стежимо, чи мишка знаходиться над слайдером (для роботи клавіатури)
    this.container.addEventListener('mouseenter', () => this.isHovered = true);
    this.container.addEventListener('mouseleave', () => this.isHovered = false);

    // Керування стрілочками клавіатури (вліво / вправо)
    document.addEventListener('keydown', (event) => {
      if (!this.isHovered) return; // Якщо мишка не над слайдером — ігноруємо
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return; // Ігноруємо, якщо користувач пише текст

      if (event.key === 'ArrowRight') this.next();
      if (event.key === 'ArrowLeft') this.prev();
    });
  }
}

// Запуск усіх слайдерів на сторінці після повного завантаження HTML
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-container').forEach((container) => {
    new GallerySlider(container);
  });
});

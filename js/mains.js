/**
 * Клас для керування інтерактивною галереєю-слайдером.
 * Створює ізольовану логіку для кожного окремого блоку на сторінці.
 */
class GallerySlider {
  constructor(containerElement) {
    this.container = containerElement;
    
    if (!this.container) {
      console.error(`[ПОМИЛКА] Переданий контейнер слайдера не існує в DOM!`);
      return;
    }

    this.sliderId = this.container.id || `Slider-${Math.floor(Math.random() * 1000)}`;
    console.log(`%c[ІНІЦІАЛІЗАЦІЯ] Початок збірки для: ${this.sliderId}`, 'color: #8f31c9; font-weight: bold;');
    
    // Знаходимо всі робочі DOM-елементи ТІЛЬКИ всередині цього контейнера
    this.mainPhoto = this.container.querySelector('.main-photo');
    this.mainYoutube = this.container.querySelector('.main-youtube'); // 🎥 Наш оновлений YouTube плеєр
    this.thumbnails = this.container.querySelectorAll('.thumb');
    this.prevBtn = this.container.querySelector('.prev-btn');
    this.nextBtn = this.container.querySelector('.next-btn');
    this.thumbnailsContainer = this.container.querySelector('.thumbnails-list');
    
    if (!this.prevBtn || !this.nextBtn) {
      console.warn(`[УВАГА] [${this.sliderId}] Стрілочки навігації відсутні в HTML!`);
    }

    this.currentIndex = 0; 
    this.isHovered = false; 
    
    this.initEvents();
    this.preloadImages(); // 🖼️ Запускаємо фонову підгрузку картинок від миготіння білого фону
    console.log(`[ОК] [${this.sliderId}] Успішно підключено події. Кількість знайдених прев'ю: ${this.thumbnails.length}`);
  }

  /* Фонове завантаження великих зображень у кеш браузера для плавності переходів*/
  preloadImages() {
    this.thumbnails.forEach(thumb => {
      const url = thumb.getAttribute('data-large');
      if (url && !url.includes('youtube.com') && !url.includes('youtu.be') && !url.includes('embed')) {
        const img = new Image();
        img.src = url;
      }
    });
  }

  /**
   * Головний метод оновлення контенту у великому вікні плеєра.
   */
  updateGallery(index) {
    console.log(`[ОНОВЛЕННЯ] [${this.sliderId}] Запуск зміни слайда на індекс: ${index}`);
    
    // КРОК 1: Запускаємо анімацію плавного зникнення (Тепер без помилок, з mainYoutube)
    [this.mainPhoto, this.mainYoutube].forEach(media => {
      if (media) media.style.opacity = '0';
    });
    
    // КРОК 2: Чекаємо 150мс, поки медіа згасне, і міняємо джерело файлу
    setTimeout(() => {
      this.currentIndex = index;
      const activeThumb = this.thumbnails[this.currentIndex];
      
      if (!activeThumb) {
        console.error(`[ПОМИЛКА] [${this.sliderId}] Неможливо знайти прев'ю для індексу ${index}`);
        return;
      }

      const mediaUrl = activeThumb.getAttribute('data-large');
      const isYouTube = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be') || mediaUrl.includes('embed');

      console.log(`[МЕДІА] [${this.sliderId}] Завантажується тип: ${isYouTube ? 'ВІДЕО (YouTube)' : 'ФОТО'}. Шлях: ${mediaUrl}`);

      // Примусово очищуємо і ховаємо плеєр YouTube, щоб зупинити звук при переході на фото
      if (this.mainYoutube) {
        this.mainYoutube.src = ""; 
        this.mainYoutube.classList.add('hide');
      }

      if (isYouTube) {
        // 🎥 ЛОГІКА ВІДЕО YOUTUBE
        if (this.mainPhoto) this.mainPhoto.classList.add('hide');
        if (this.mainYoutube) {
          this.mainYoutube.classList.remove('hide');
          this.mainYoutube.src = mediaUrl;
          this.mainYoutube.style.opacity = '1'; 
        }
      } else {
        // 🖼️ ЛОГІКА ФОТО
        if (this.mainPhoto) {
          this.mainPhoto.classList.remove('hide');
          this.mainPhoto.src = mediaUrl;
          this.mainPhoto.style.opacity = '1'; 
        }
      }

      // КРОК 3: Оновлюємо активний клас мініатюр
      this.thumbnails.forEach(t => t.classList.remove('active'));
      activeThumb.classList.add('active');
      console.log(`[УСПІХ ОНОВЛЕННЯ] [${this.sliderId}] Слайд успішно активовано.`);
    }, 150);
  }

  /**
   * Перемикання на наступний слайд (циклічний алгоритм).
   */
  next() {
    const nextIndex = (this.currentIndex + 1) % this.thumbnails.length;
    console.log(`[ЛОГІКА ВПЕРЕД] [${this.sliderId}] Поточний: ${this.currentIndex} -> Наступний: ${nextIndex}`);
    this.updateGallery(nextIndex);
  }
  
  /**
   * Перемикання на попередній слайд (циклічний алгоритм).
   */
  prev() {
    const prevIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
    console.log(`[ЛОГІКА НАЗАД] [${this.sliderId}] Поточний: ${this.currentIndex} -> Попередній: ${prevIndex}`);
    this.updateGallery(prevIndex);
  }

  /**
   * Налаштування всіх обробників подій (кліки, наведення миші, клавіатура).
   */
  initEvents() {
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    
    if (this.thumbnailsContainer) {
      this.thumbnailsContainer.addEventListener('click', (event) => {
        const targetThumb = event.target.closest('.thumb');
        if (targetThumb && this.thumbnailsContainer.contains(targetThumb)) {
          const clickedIndex = Number(targetThumb.getAttribute('data-index'));
          console.log(`[КЛІК МІНІАТЮРИ] [${this.sliderId}] Натиснуто на прев'ю з індексом: ${clickedIndex}`);
          this.updateGallery(clickedIndex);
        }
      });
    }

    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      console.log(`[ФОКУС] Курсор ЗАЙШОВ у зону: ${this.sliderId}. Клавіатура активна.`);
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      console.log(`[ФОКУС] Курсор ВИЙШОВ із зони: ${this.sliderId}. Клавіатура вимкнена.`);
    });

    document.addEventListener('keydown', (event) => {
      if (!this.isHovered) return; 
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (event.key === 'ArrowRight') this.next();
      if (event.key === 'ArrowLeft') this.prev();
    });
  }
}

// ==========================================================================
// ГОЛОВНИЙ СТАРТ СИСТЕМИ ТА СИНХРОНІЗАЦІЯ З DOM
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log("%c[ЗАПУСК СИСТЕМИ] HTML повністю завантажено. Пошук галерей...", "color: #00aa00; font-weight: bold;");
  
  const galleryContainers = document.querySelectorAll('.gallery-container');
  
  galleryContainers.forEach((container, iterationIndex) => {
    if (!container.id) {
       container.id = `Gallery-Block-${iterationIndex + 1}`;
    }
    new GallerySlider(container);
  });
  
  console.log(`%c[ЗАВЕРШЕНО] Усі слайдери (${galleryContainers.length} шт.) успішно запущені!`, "color: #00aa00; font-weight: bold;");
});

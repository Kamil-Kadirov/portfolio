const card = document.querySelector('.card-container');
const cursor = document.querySelector('.custom-cursor');

// 1. Починенная логика кастомного курсора и 3D-наклона карточки
document.addEventListener('mousemove', (e) => {
    // Включаем курсор только на ПК (экраны шире 768px)
    if (window.innerWidth >= 768 && cursor) {
        cursor.style.opacity = '1';
        // Передаем координаты мыши напрямую в CSS-трансформацию для плавной отрисовки
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }

    // Эффект 3D-наклона матовой карточки
    if (window.innerWidth >= 768 && card) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 35;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

        // Интерактивный неоновый блик
        const xPercent = (e.pageX / window.innerWidth) * 100;
        const yPercent = (e.pageY / window.innerHeight) * 100;
        card.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.08) 0%, rgba(12,12,20,0.5) 80%)`;
    }
});

// Плавный сброс наклона карточки при уходе курсора из окна браузера
document.addEventListener('mouseleave', () => {
    if (card) {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        card.style.background = 'var(--card-bg)';
    }
    if (cursor) {
        cursor.style.opacity = '0';
    }
});

// Анимация увеличения круга при наведении на кликабельные объекты
const interactiveElements = document.querySelectorAll('a, button, .gallery-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => { if (cursor) cursor.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { if (cursor) cursor.classList.remove('hovered'); });
});

// 2. Функция копирования никнейма Telegram
const copyBtn = document.querySelector('.copy-btn');
const tgText = document.querySelector('.tg-text');
if (copyBtn && tgText) {
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const username = copyBtn.getAttribute('data-username') || '@Sami_Username';
        navigator.clipboard.writeText(username).then(() => {
            const originalText = tgText.innerText;
            tgText.innerText = '✓ Ник скопирован!';
            copyBtn.innerText = '✅';
            setTimeout(() => {
                tgText.innerText = originalText;
                copyBtn.innerText = '📋';
            }, 2000);
        });
    });
}

// 3. Полноэкранный Lightbox для просмотра картинок портфолио
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');

if (galleryItems && lightbox && lightboxImg) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightboxImg.src = src;
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

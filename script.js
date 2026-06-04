const card = document.querySelector('.card-container');
const cursor = document.querySelector('.custom-cursor');

// 1. Работа кастомного курсора и 3D-наклона (только для ПК)
document.addEventListener('mousemove', (e) => {
    // Если экран большой (ПК), двигаем кастомный курсор
    if (window.innerWidth >= 768 && cursor) {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }

    // Плавный 3D-наклон карточки от мыши
    if (window.innerWidth >= 768 && card) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 35;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

        // Интерактивный блик на стекле
        const xPercent = (e.pageX / window.innerWidth) * 100;
        const yPercent = (e.pageY / window.innerHeight) * 100;
        card.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.08) 0%, rgba(12,12,20,0.5) 80%)`;
    }
});

// Возврат карточки в ровное положение, когда мышь уходит с экрана
document.addEventListener('mouseleave', () => {
    if (card) {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        card.style.background = 'var(--card-bg)';
    }
});

// Эффект увеличения курсора при наведении на кнопки
const interactiveElements = document.querySelectorAll('a, button, .gallery-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => { if(cursor) cursor.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { if(cursor) cursor.classList.remove('hovered'); });
});

// 2. Функция копирования никнейма Telegram
const copyBtn = document.querySelector('.copy-btn');
const tgText = document.querySelector('.tg-text');
if (copyBtn && tgText) {
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const username = copyBtn.getAttribute('data-username') || '@sami';
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

// 3. Динамические часы (Исправленная версия)
function updateClock() {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        const now = new Date();
        // Настройка вывода времени по Москве (GMT+3)
        timeDisplay.textContent = now.toLocaleTimeString('ru-RU', {
            timeZone: 'Europe/Moscow',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }
}
setInterval(updateClock, 1000);
updateClock();

// 4. Полноэкранный Lightbox для просмотра картинок портфолио
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

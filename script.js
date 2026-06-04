const card = document.querySelector('.card-container');
const cursor = document.querySelector('.custom-cursor');

// 1. Инициализация 3D-наклона карточки и Кастомного Курсора
setTimeout(() => {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth >= 768) {
            // Движение курсора
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Наклон карточки
            const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 35;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

            // Блик на матовом стекле
            const xPercent = (e.pageX / window.innerWidth) * 100;
            const yPercent = (e.pageY / window.innerHeight) * 100;
            card.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.08) 0%, rgba(12,12,20,0.5) 80%)`;
        }
    });
}, 1000);

// Возврат карточки в исходное состояние при уходе мыши
document.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.5s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    card.style.background = 'var(--card-bg)';
});

// Реакция кастомного курсора на интерактивные элементы
const interactiveElements = document.querySelectorAll('a, button, .gallery-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// 2. Копирование Никнейма Telegram
const copyBtn = document.querySelector('.copy-btn');
const tgText = document.querySelector('.tg-text');
if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const username = copyBtn.getAttribute('data-username');
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

// 3. Динамические часы (Фиксированное время GMT+3)
function updateClock() {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        const now = new Date();
        
        // Берем точное время по Москве / GMT+3
        const options = {
            timeZone: 'Europe/Moscow',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        // Перезаписываем текст внутри тега span
        timeDisplay.textContent = now.toLocaleTimeString('ru-RU', options);
    }
}
// Запускаем обновление каждую секунду
setInterval(updateClock, 1000);
// Вызываем один раз сразу, чтобы не было задержки при старте
updateClock();


// 4. Полноэкранный Lightbox для мини-портфолио
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');

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

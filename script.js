const card = document.querySelector('.card-container');
const cursor = document.querySelector('.custom-cursor');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) cursor.style.opacity = '1';

    if (window.innerWidth >= 768 && card) {
        const rect = card.getBoundingClientRect();
        const x = e.pageX - rect.left - window.scrollX;
        const y = e.pageY - rect.top - window.scrollY;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }
});

// РЕАКТИВНЫЙ ИГРОВОЙ ЦИКЛ: Коэффициент 0.45 убирает отставание при резких рывках
function animateCursor() {
    /* 0.45 — идеальная скорость, чтобы кольцо прилипало к реальному курсору мыши 
       и не отставало при наведении на кнопки, сохраняя микро-плавность */
    cursorX += (mouseX - cursorX) * 0.45; 
    cursorY += (mouseY - cursorY) * 0.45;

    if (cursor && window.innerWidth >= 768) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

document.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.opacity = '0';
});

const interactiveElements = document.querySelectorAll('a, button, .gallery-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => { if (cursor) cursor.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { if (cursor) cursor.classList.remove('hovered'); });
});

// Функция копирования никнейма Telegram
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

// Полноэкранный Lightbox для просмотра картинок портфолио
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

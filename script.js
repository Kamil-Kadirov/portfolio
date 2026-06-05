const card = document.querySelector('.card-container');

// 1. Плавный 3D-наклон карточки от мыши (только для ПК)
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth >= 768 && card) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 35;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

        // Интерактивный неоновый блик, который заменяет курсор и ходит за мышкой ПОД стеклом
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }
});

// Возврат карточки в ровное положение, когда мышь уходит
document.addEventListener('mouseleave', () => {
    if (card) {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
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

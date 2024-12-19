document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.querySelector('.news');
    const newsItems = document.querySelectorAll('.news-item');
    let currentIndex = 0;

    // Создаем кнопки навигации
    const navigation = document.createElement('div');
    navigation.className = 'news-navigation';
    navigation.innerHTML = `
        <button class="prev-btn">←</button>
        <div class="news-dots"></div>
        <button class="next-btn">→</button>
    `;
    newsContainer.appendChild(navigation);

    // Создаем точки для навигации
    const dotsContainer = navigation.querySelector('.news-dots');
    newsItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showNews(index));
        dotsContainer.appendChild(dot);
    });

    function showNews(index) {
        newsItems.forEach(item => item.style.display = 'none');
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        newsItems[index].style.display = 'block';
        document.querySelectorAll('.dot')[index].classList.add('active');
        currentIndex = index;
    }

    navigation.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
        showNews(currentIndex);
    });

    navigation.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % newsItems.length;
        showNews(currentIndex);
    });

    showNews(0);
});

// 2. Анимированный счетчик статистики
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Добавляем секцию статистики в HTML и запускаем анимацию при прокрутке
const statsSection = document.createElement('div');
statsSection.className = 'stats-section';
statsSection.innerHTML = `
    <div class="stat-item">
        <span class="stat-number" id="clients">0</span>
        <span class="stat-label">Довольных клиентов</span>
    </div>
    <div class="stat-item">
        <span class="stat-number" id="machines">0</span>
        <span class="stat-label">Единиц техники</span>
    </div>
    <div class="stat-item">
        <span class="stat-number" id="years">0</span>
        <span class="stat-label">Лет на рынке</span>
    </div>
`;

document.querySelector('.about').after(statsSection);

// Запускаем анимацию при появлении элемента в поле зрения
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateValue(document.getElementById('clients'), 0, 1000, 2000);
            animateValue(document.getElementById('machines'), 0, 500, 2000);
            animateValue(document.getElementById('years'), 0, 15, 2000);
            observer.unobserve(entry.target);
        }
    });
});
observer.observe(statsSection);


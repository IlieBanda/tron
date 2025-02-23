document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    nav.querySelector('.logo').appendChild(menuToggle);

    // Добавляем обработчик для логотипа
    const logoLink = document.querySelector('.logo-link');
    logoLink.addEventListener('click', () => {
        // Закрываем мобильное меню перед переходом
        nav.classList.remove('active');
        menuToggle.innerHTML = '☰';
        // Переход произойдет автоматически благодаря href в ссылке
    });

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Закрываем меню при клике на пункт
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.innerHTML = '☰';
        });
    });

    // Закрываем меню при скролле
    window.addEventListener('scroll', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });

    // Анимация появления секций при скролле
    const sections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 1s ease';
        observer.observe(section);
    });

    // Аудио плеер
    const tracks = document.querySelectorAll('.track');
    const playButton = document.querySelector('.play-button');
    const trackInfo = document.querySelector('.track-info');
    let currentAudio = null;
    let isPlaying = false;

    // Обновляем символы для кнопок плеера
    const PLAY_SYMBOL = '▶';
    const PAUSE_SYMBOL = '❙❙';

    tracks.forEach(track => {
        track.addEventListener('click', () => {
            const audioSrc = track.dataset.src;
            const trackName = track.querySelector('.track-name').textContent;
            
            console.log('Trying to play:', audioSrc); // Добавляем для отладки

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            if (!currentAudio || currentAudio.src !== audioSrc) {
                currentAudio = new Audio(audioSrc);
                currentAudio.addEventListener('error', (e) => {
                    console.error('Error loading audio:', e);
                });
                trackInfo.textContent = trackName;
                currentAudio.play()
                    .then(() => {
                        playButton.textContent = PAUSE_SYMBOL;
                        playButton.setAttribute('data-state', 'playing');
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                    });
            } else {
                if (isPlaying) {
                    currentAudio.pause();
                    playButton.textContent = PLAY_SYMBOL;
                    playButton.removeAttribute('data-state');
                    isPlaying = false;
                } else {
                    currentAudio.play();
                    playButton.textContent = PAUSE_SYMBOL;
                    playButton.setAttribute('data-state', 'playing');
                    isPlaying = true;
                }
            }

            // Подсветка активного трека
            tracks.forEach(t => t.classList.remove('active'));
            track.classList.add('active');
        });
    });

    playButton.addEventListener('click', () => {
        if (currentAudio) {
            if (isPlaying) {
                currentAudio.pause();
                playButton.textContent = PLAY_SYMBOL;
                playButton.removeAttribute('data-state');
            } else {
                currentAudio.play();
                playButton.textContent = PAUSE_SYMBOL;
                playButton.setAttribute('data-state', 'playing');
            }
            isPlaying = !isPlaying;
        }
    });

    // Галерея
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.gallery-overlay');
            overlay.style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.gallery-overlay');
            overlay.style.opacity = '0';
        });
    });

    // Добавляем плавную прокрутку для навигации
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Пропускаем обработку для логотипа
            if (this.classList.contains('logo-link')) {
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Проверяем, является ли это якорной ссылкой
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Добавляем подсветку активной секции
                    document.querySelectorAll('.main-nav a').forEach(a => {
                        a.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
}); 
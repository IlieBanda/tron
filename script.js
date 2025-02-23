// Удаляем весь предыдущий код и начинаем с чистого листа
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded');

    const button = document.getElementById('enterButton');
    console.log('Found button:', button);

    button.onclick = function() {
        console.log('Button clicked');
        window.location.href = 'content.html';
    };
}); 
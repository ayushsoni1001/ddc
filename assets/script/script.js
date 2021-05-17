const eye1 = document.querySelector('#eyeball');
window.addEventListener('mousemove', (evt) => {
    const x = -(window.innerWidth / 2 - evt.pageX) / 15;
    const y = -(window.innerHeight / 2 - evt.pageY) / 15;
    eye1.style.transform = `translateY(${y}px) translateX(${x}px)`;
});  
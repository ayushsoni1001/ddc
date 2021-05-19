anime({
    targets: '#arrow',
    translateY: 20,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
});

var logo = anime({
    targets: '#main-logo',
    translateY: -20,
    direction: 'alternate',
    loop: false,
    opacity: [0 , 1],
    autoplay: false,
    easing: 'easeInOutSine'
});
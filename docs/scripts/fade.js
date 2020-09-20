const fadeElement = document.querySelector('#fade')

fadeElement.style.opacity = 0

setTimeout(() => {
    fadeElement.style.transition = 'opacity 200ms linear'
}, 10);

function fadeIn() {
    fadeElement.style.opacity = ''
}

function fadeOut() {
    fadeElement.style.opacity = 0
}

setTimeout(() => {
    fadeIn()
}, 100)

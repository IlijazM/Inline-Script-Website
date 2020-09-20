const fadeElement = document.querySelector('#fade')

fadeElement.style.opacity = 0
fadeElement.style.transition = 'opacity 200ms linear'

function fadeIn() {
    fadeElement.style.opacity = ''
}

function fadeOut() {
    fadeElement.style.opacity = 0
}

setTimeout(() => {
    fadeIn()
}, 100)

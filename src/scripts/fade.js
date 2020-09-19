const fadeElement = document.querySelector('#fade')

fadeElement.style.opacity = 0


function fadeIn() {
    setTimeout(() => {
        fadeElement.style.opacity = 1
    }, 10)
}

function fadeOut() {
    fadeElement.style.opacity = 0
}

setTimeout(() => {
    fadeElement.style.transition = 'opacity 200ms linear'
    fadeIn()
}, 100)
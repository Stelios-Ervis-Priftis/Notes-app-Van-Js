// Helpers varablies

const log = console.log
const doc = document

const animateCSS = (element, animationName, delay, callback) => {
    const node = element
    node.classList.add('animated', animationName, delay)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName, delay);
        node.removeEventListener('animationend', handleAnimationEnd, delay);

        if (typeof callback === 'function') callback()
    }
    node.addEventListener('animationend', handleAnimationEnd, delay);
}

export { log, doc, animateCSS }
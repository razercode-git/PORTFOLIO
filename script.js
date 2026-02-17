// Navbar mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('navbar').classList.toggle('is-active');
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
});

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Parallax Effects
const parallax = (event) => {
    const layers = document.querySelectorAll('.parallax-layer');
    layers.forEach((layer) => {
        const depth = layer.getAttribute('data-depth');
        const movement = (event.clientY * depth) / 100;
        layer.style.transform = `translateY(${movement}px)`;
    });
};
window.addEventListener('mousemove', parallax);

// Scroll Animations
const scrollElements = document.querySelectorAll('.scroll-animation');
const elementInView = (el, ratio = 0) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                el.classList.add('in-view');
                observer.unobserve(el);
            }
        });
    }, {
        threshold: ratio
    });
    observer.observe(el);
};
scrollElements.forEach((el) => {
    elementInView(el);
});
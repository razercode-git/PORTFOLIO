// ============================================
// NAVBAR MOBILE MENU TOGGLE
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
	navToggle.addEventListener('click', () => {
		navToggle.classList.toggle('active');
		navMenu.classList.toggle('open');
	});

	// Close menu when a link is clicked
	const navLinks = navMenu.querySelectorAll('.nav-link');
	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			navToggle.classList.remove('active');
			navMenu.classList.remove('open');
		});
	});

	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
			navToggle.classList.remove('active');
			navMenu.classList.remove('open');
		}
	});
}

// ============================================
// SMOOTH SCROLL & ACTIVE NAV LINK
// ============================================

const updateActiveNavLink = () => {
	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('.nav-link');

	window.addEventListener('scroll', () => {
		let current = '';
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= sectionTop - 200) {
				current = section.getAttribute('id');
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove('active');
			if (link.getAttribute('href').includes(current)) {
				link.classList.add('active');
			}
		});
		});
};

updateActiveNavLink();

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// Observe elements with reveal class
document.querySelectorAll('.reveal').forEach((el) => {
	observer.observe(el);
});

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

const handleScrollAnimations = () => {
	const elements = document.querySelectorAll('[data-animate]');

	elements.forEach((element) => {
		const elementTop = element.getBoundingClientRect().top;
		const elementBottom = element.getBoundingClientRect().bottom;

		if (elementTop < window.innerHeight && elementBottom > 0) {
			element.classList.add('animate-in');
		}
	});
};

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// ============================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ============================================

const parallaxOrbs = () => {
	const orbs = document.querySelectorAll('.gradient-orb');

	window.addEventListener('mousemove', (e) => {
		const mouseX = e.clientX / window.innerWidth;
		const mouseY = e.clientY / window.innerHeight;

		orbs.forEach((orb, index) => {
			const speed = (index + 1) * 20;
			const x = mouseX * speed;
			const y = mouseY * speed;

			orb.style.transform = `translate(${x}px, ${y}px)`;
		});
		});
};

parallaxOrbs();

// ============================================
// SET CURRENT YEAR IN FOOTER
// ============================================

const yearSpan = document.getElementById('year');
if (yearSpan) {
	yearSpan.textContent = new Date().getFullYear();
}

// ============================================
// PAGE TRANSITION LOADING ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
	document.body.style.opacity = '1';
	document.body.classList.add('loaded');
});

// Fade out page on link click (for internal navigation)
document.querySelectorAll('a[href^="/"], a[href$=".html"]').forEach((link) => {
	link.addEventListener('click', function (e) {
		const href = this.getAttribute('href');

		// Don't fade out for external links or anchors
		if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
			e.preventDefault();

			// Check if it's the same page
			if (!href.includes(window.location.pathname.split('/').pop())) {
				document.body.style.opacity = '0';
				document.body.style.transition = 'opacity 0.3s ease';

				setTimeout(() => {
					window.location.href = href;
				}, 300);
			} else {
				window.location.href = href;
			}
		}
	});
});

// ============================================
// HERO SCROLL INDICATOR
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
	window.addEventListener('scroll', () => {
		if (window.scrollY > 100) {
			scrollIndicator.style.opacity = '0';
			scrollIndicator.style.pointerEvents = 'none';
		} else {
			scrollIndicator.style.opacity = '1';
			scrollIndicator.style.pointerEvents = 'auto';
		}
	});
}
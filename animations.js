/**
 * GSAP Animations for DPS Map
 */
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const tl = gsap.timeline();
    tl.from('#hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
    .from('#hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from('.container.mx-auto.px-6.relative.z-10 .flex', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "-=0.3");

    // Scroll Reveal for Service Cards
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '#services',
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Navbar Scroll Effect
    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            const navbar = document.getElementById('navbar');
            if (self.direction === 1) {
                navbar.classList.add('py-2', 'bg-navy');
                navbar.classList.remove('py-4', 'bg-navy/90');
            } else {
                navbar.classList.add('py-4', 'bg-navy/90');
                navbar.classList.remove('py-2', 'bg-navy');
            }
        }
    });

    // Pricing Card Animation
    gsap.from('#pricing .max-w-4xl', {
        scrollTrigger: {
            trigger: '#pricing',
            start: "top 70%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
    });
});

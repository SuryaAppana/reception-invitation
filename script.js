document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation (Initial Load)
    const tl = gsap.timeline();
    tl.from('.hero-img', {
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
    })
        .to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        }, "-=1.5");


    // Story Section Parallax & Fade
    gsap.from('.story-content', {
        scrollTrigger: {
            trigger: '.story',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    gsap.from('.blend-image-right', {
        scrollTrigger: {
            trigger: '.story',
            start: "top 70%",
            scrub: 1 // Smooth scrubbing effect
        },
        y: 100, // Move slightly as you scroll
        opacity: 0.8,
    });

    // Quote Parallax Background (Enhanced for Dynamic Movement)
    gsap.to('.quote-bg img', {
        scrollTrigger: {
            trigger: '.quote-section',
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5 // Slower scrub for smoother feel
        },
        y: '30%', // Increased movement
        scale: 1.1, // Slight zoom effect
        transformOrigin: "center center",
        ease: "none"
    });

    gsap.from('.quote-text blockquote', {
        scrollTrigger: {
            trigger: '.quote-section',
            start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
    });


    // Details Cards Stagger
    gsap.from('.detail-card', {
        scrollTrigger: {
            trigger: '.details',
            start: "top 75%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Gallery Fade In (Updated for Swiper)
    gsap.from('.gallery-preview h2', {
        scrollTrigger: {
            trigger: '.gallery-preview',
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 1
    });

    gsap.from('.swiper', {
        scrollTrigger: {
            trigger: '.gallery-preview',
            start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    // Swiper Initialization
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        speed: 800,
        // lazy: true, // Removed in favor of native loading="lazy"
        coverflowEffect: {
            rotate: 30, // Reduced from 50
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true, // Keep shadows for depth, but lighter rotation helps
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 2500, // Slower autoplay to allow loading/rendering
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Smoother UX
        },
        breakpoints: {
            // Mobile adjustments - simplified view
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                effect: "slide", // Switch to simple slide on very small screens for performance
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                effect: "coverflow",
                coverflowEffect: {
                    rotate: 20, // Subtle 3D
                    stretch: 0,
                    depth: 50,
                    modifier: 1,
                    slideShadows: false, // Disable shadows on mobile for performance
                }
            },
            768: {
                slidesPerView: "auto",
                effect: "coverflow", // Restore full effect on desktop
            }
        }
    });

    // GLightbox Initialization
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });

    // --- Particle System ---
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Resizing
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; // Small, elegant size
            this.speedX = Math.random() * 0.5 - 0.25; // Slow movement
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'rgba(166, 124, 82, ' + (Math.random() * 0.5 + 0.1) + ')'; // Gold tint
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // --- Smooth Zoom/Fade Transitions (Ken Burns Effect) ---
    // Hero Image Slow Zoom
    gsap.to('.hero-img', {
        scale: 1.15, // Slightly increased zoom
        duration: 12, // Faster cycle (was 20)
        repeat: -1,
        yoyo: true, // Zoom in and out slowly
        ease: "sine.inOut"
    });

    // Enhance existing scroll triggers with zoom/fade
    // Note: We are keeping the existing structure but refining the feel

    // Smooth Fade Out for elements leaving viewport (Optional "Fade Out" effect mentioned by user)
    // Adding a general fade-in-up class behavior for smoother entry
    const fadeElements = document.querySelectorAll('.story p, .details-grid, .gallery-preview');

    fadeElements.forEach(element => {
        gsap.fromTo(element,
            { opacity: 0, y: 30, scale: 0.95 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    });

});

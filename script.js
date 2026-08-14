tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        dark: '#0a0a0a',
                        card: '#111111',
                        surface: '#181818',
                        accent: '#00b8d4',
                        indigo: '#0099b2',
                        border: 'rgba(255,255,255,0.08)',
                    },
                    fontFamily: {
                        syne: ['Inter', 'sans-serif'],
                        sans: ['Inter', 'sans-serif'],
                    },
                }
            }
        }

// ===== SCROLL HANDLER =====
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
            nav.classList.remove('py-4');
            nav.classList.add('py-2');
        } else {
            nav.classList.remove('nav-scrolled');
            nav.classList.add('py-4');
            nav.classList.remove('py-2');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
// Function: toggleMobileMenu()
// Purpose: Show/hide navigation menu on mobile devices
// Triggers: Click on hamburger menu button and close button
const menuToggle = document.getElementById('mobile-menu-toggle');
const menuClose = document.getElementById('mobile-menu-close');
const menu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
    menu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';  // ← NUEVO
});

menuClose.addEventListener('click', () => {
    menu.classList.add('translate-x-full');
    document.body.style.overflow = 'auto';  // ← NUEVO
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';  // ← NUEVO
    });
});

    // ===== REVEAL ANIMATION =====
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ===== HERO CHAT ANIMATION =====
    setTimeout(() => {
        const typing = document.getElementById('typing-indicator');
        const aiRes = document.getElementById('ai-response');
        if(typing) {
            typing.classList.remove('hidden');
            setTimeout(() => {
                typing.classList.add('hidden');
                aiRes.classList.remove('opacity-0');
            }, 1800);
        }
    }, 2000);

    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg');
            
            // Close others
            document.querySelectorAll('.faq-content').forEach(other => {
                if(other !== content) {
                    other.style.maxHeight = null;
                    other.previousElementSibling.querySelector('svg').classList.remove('rotate-180');
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.add('rotate-180');
            }
        });
    });
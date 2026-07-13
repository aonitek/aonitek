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
    // Purpose: Add blur background to navbar when page is scrolled
    // Triggers: Window scroll event
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
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        menu.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = 'auto';
        });
    });

    // ===== TABLE OF CONTENTS ACTIVE SECTION =====
    // Function: updateActiveSection()
    // Purpose: Highlight active section in TOC as user scrolls
    // Triggers: Window scroll event
    const tocLinks = document.querySelectorAll('.terms-toc a');
    const sections = document.querySelectorAll('.terms-section');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // ===== SMOOTH SCROLL FOR TOC LINKS =====
    // Function: smoothScrollToSection()
    // Purpose: Smooth scroll when clicking TOC links
    // Triggers: Click on TOC anchor links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
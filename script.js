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

    // ===== VERTICALS TABS LOGIC =====
    const verticalData = {
        salud: {
            chat: [
                { type: 'user', text: 'Hola, quería saber si tienen turnos para mañana y cuánto cuesta la consulta' },
                { type: 'ai', text: '¡Hola! Claro. Mañana lunes tenemos disponibilidad a las 10:00 y 16:30. El valor de la consulta con el Dr. Garcia es de $35. ¿Querés que reservemos el de las 10:00?' },
                { type: 'user', text: 'Sí, reservame a las 10.' },
                { type: 'ai', text: '¡Perfecto! Turno confirmado. Te envié el recordatorio a tu mail y WhatsApp. ¿Necesitás algo más?' }
            ],
            tags: ['Agendamiento', 'Recordatorios', 'Info de precios', 'Seguimiento']
        },
        ecommerce: {
            chat: [
                { type: 'user', text: 'Hola, ¿tienen stock de la campera térmica en talle M color negro?' },
                { type: 'ai', text: '¡Hola! Dejame chequear el inventario... Sí, nos quedan las últimas 3 unidades en talle M negro. El precio es $12.900 con envío gratis hoy.' },
                { type: 'user', text: 'Genial, ¿tienen cuotas?' },
                { type: 'ai', text: 'Sí, tenés 3 cuotas sin interés con cualquier tarjeta. Aquí tenés el link de pago directo: aonitek.pay/campera-negra' }
            ],
            tags: ['Catálogo IA', 'Gestión de stock', 'Link de pago', 'Post-venta']
        },
        servicios: {
            chat: [
                { type: 'user', text: 'Necesito asesoría legal para un contrato comercial, ¿cómo trabajan?' },
                { type: 'ai', text: '¡Hola! Somos especialistas en contratos PYME. El proceso inicia con una revisión de 15 min para entender el caso. ¿Te parece agendar una llamada breve mañana?' },
                { type: 'user', text: 'Dale, a las 11am puedo.' },
                { type: 'ai', text: 'Agendado. El Dr. Martinez te contactará a las 11:00 am. Por favor, confirmame tu correo para enviarte el enlace de Zoom.' }
            ],
            tags: ['Calificación', 'Agendamiento', 'Onboarding', 'Primer filtro']
        },
        turismo: {
            chat: [
                { type: 'user', text: 'Queremos pasar 3 noches en julio, somos 2 adultos y 1 niño, ¿tienen disponibilidad?' },
                { type: 'ai', text: '¡Hola! Para esas fechas tenemos disponible la Suite Familiar con vista al lago. El total por las 3 noches es de $450 USD. ¿Incluyo el desayuno buffet?' },
                { type: 'user', text: '¿Cuánto más sería?' },
                { type: 'ai', text: 'Es un plus de $45 USD por toda la estadía. Si confirmás ahora, te bonificamos el late check-out.' }
            ],
            tags: ['Reservas', 'Disponibilidad', 'Multi-idioma', 'Upselling']
        }
    };

    function renderVertical(rubro) {
        const container = document.getElementById('vertical-content');
        const tagContainer = document.getElementById('capability-tags');
        const data = verticalData[rubro];
        
        container.innerHTML = '';
        tagContainer.innerHTML = '';

        data.chat.forEach((msg, idx) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = msg.type === 'user' 
                    ? 'chat-bubble-user p-3 max-w-[80%] self-end text-sm ml-auto mb-4 animate-[fadeInUp_0.5s_ease-out]' 
                    : 'chat-bubble-ai p-3 max-w-[80%] self-start text-sm mr-auto mb-4 font-medium animate-[fadeInUp_0.5s_ease-out]';
                div.textContent = msg.text;
                container.appendChild(div);
                container.scrollTop = container.scrollHeight;
            }, idx * 800);
        });

        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'bg-white/5 border border-white/10 px-3 py-1 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest';
            span.textContent = tag;
            tagContainer.appendChild(span);
        });
    }

    document.querySelectorAll('.vertical-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.vertical-tab').forEach(t => {
                t.classList.remove('bg-accent', 'text-black', 'border-accent');
                t.classList.add('border-white/10', 'text-white');
            });
            tab.classList.add('bg-accent', 'text-black', 'border-accent');
            tab.classList.remove('border-white/10', 'text-white');
            renderVertical(tab.dataset.target);
        });
    });

    // Init first tab
    document.querySelector('.vertical-tab').click();
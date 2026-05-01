(() => {
    'use strict';

    const setupMobileNavigation = () => {
        const navToggle = document.getElementById('navToggle');
        const mobileMenu = document.getElementById('mobileNav');

        if (!navToggle || !mobileMenu) return;

        const panel = mobileMenu.querySelector('[data-mobile="panel"]');
        const backdrop = mobileMenu.querySelector('[data-mobile="backdrop"]');
        const closeBtn = mobileMenu.querySelector('[data-mobile="close"]');
        const menuLinks = mobileMenu.querySelectorAll('[data-mobile="link"]');
        
        const iconTop = navToggle.querySelector('[data-bar="top"]');
        const iconMid = navToggle.querySelector('[data-bar="mid"]');
        const iconBot = navToggle.querySelector('[data-bar="bot"]');

        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('overflow-hidden');

            requestAnimationFrame(() => {
                backdrop?.classList.replace('opacity-0', 'opacity-100');
                panel?.classList.remove('opacity-0', 'translate-y-[-10px]', 'scale-[0.98]');
                panel?.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            });

            iconTop?.classList.add('translate-y-[6px]', 'rotate-45');
            iconTop?.classList.remove('-translate-y-[6px]');
            iconMid?.classList.add('opacity-0');
            iconBot?.classList.add('-translate-y-[6px]', '-rotate-45');
            iconBot?.classList.remove('translate-y-[6px]');

            panel?.focus();
        };

        const closeMenu = () => {
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('overflow-hidden');

            backdrop?.classList.replace('opacity-100', 'opacity-0');
            panel?.classList.add('opacity-0', 'translate-y-[-10px]', 'scale-[0.98]');
            panel?.classList.remove('opacity-100', 'translate-y-0', 'scale-100');

            iconTop?.classList.remove('translate-y-[6px]', 'rotate-45');
            iconTop?.classList.add('-translate-y-[6px]');
            iconMid?.classList.remove('opacity-0');
            iconBot?.classList.remove('-translate-y-[6px]', '-rotate-45');
            iconBot?.classList.add('translate-y-[6px]');

            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        }; 

        navToggle.addEventListener('click', () => {
            mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
        });

        menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
        backdrop?.addEventListener('click', closeMenu);
        closeBtn?.addEventListener('click', closeMenu);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) closeMenu();
        });
    };

    const setupScrollReveal = () => {
        const elements = document.querySelectorAll('[data-animate]');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!elements.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            elements.forEach((el) => el.classList.add('opacity-100'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                
                const el = entry.target;
                el.style.animationDelay = `${el.getAttribute('data-delay') || 0}ms`;
                el.classList.add('animate-fadeUp');
                observer.unobserve(el);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach((el) => observer.observe(el));
    };

    const setupPopups = () => {
        const popup = document.getElementById('milkyway-popup');
        const content = document.getElementById('popup-content');
        const closeBtn = document.getElementById('milkyway-popup-close');
        
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeLightboxBtn = document.getElementById('close-lightbox');
        
        const galleryImages = document.querySelectorAll('#gallery-grid img');
    
        window.showMilkywayPopup = () => {
            if (!popup || !content) return;
            
            popup.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
    
            requestAnimationFrame(() => {
                popup.classList.remove('opacity-0', 'pointer-events-none');
                popup.classList.add('opacity-100');
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            });
        };
    
        const closePopup = () => {
            if (!popup || !content) return;
    
            popup.classList.remove('opacity-100');
            popup.classList.add('opacity-0');
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
    
            setTimeout(() => {
                popup.classList.add('hidden', 'pointer-events-none');
                document.body.style.overflow = ''; 
            }, 300);
        };
    
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                if (!lightbox || !lightboxImg) return;
    
                lightboxImg.src = img.src;
                lightboxCaption.innerText = img.alt || "Milkyway Indonesia";
                
                lightbox.classList.remove('hidden');
                
                requestAnimationFrame(() => {
                    lightbox.classList.remove('opacity-0', 'pointer-events-none');
                    lightbox.classList.add('opacity-100');
                    lightboxImg.classList.remove('scale-95');
                    lightboxImg.classList.add('scale-100');
                });
            });
        });
    
        const closeLightbox = () => {
            if (!lightbox || !lightboxImg) return;
    
            lightbox.classList.remove('opacity-100');
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
    
            setTimeout(() => {
                lightbox.classList.add('hidden', 'pointer-events-none');
            }, 300);
        };
    

        closeBtn?.addEventListener('click', closePopup);
        closeLightboxBtn?.addEventListener('click', closeLightbox);
    
        popup?.addEventListener('mousedown', (e) => {
            if (e.target === popup) closePopup();
        });
    
        lightbox?.addEventListener('mousedown', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightbox && !lightbox.classList.contains('hidden')) {
                    closeLightbox();
                } else if (popup && !popup.classList.contains('hidden')) {
                    closePopup();
                }
            }
        });
    };
    
    setupMobileNavigation();
    setupScrollReveal();
    setupPopups();
})();

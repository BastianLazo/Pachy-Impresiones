// js/main.js - Versión Simplificada

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CARRUSEL PRINCIPAL ==========
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;
    
    if (slides.length > 0 && dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentSlide = index;
            const slidesContainer = document.querySelector('.carousel-slides');
            if (slidesContainer) {
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }
        
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        
        function startInterval() { slideInterval = setInterval(nextSlide, intervalTime); }
        function resetInterval() { clearInterval(slideInterval); startInterval(); }
        
        startInterval();
        
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', startInterval);
        }
    }
    
    // ========== MINI CARRUSELES ==========
    function initMiniCarousels() {
        const miniCarousels = document.querySelectorAll('.mini-carousel');
        
        miniCarousels.forEach((carousel) => {
            const inner = carousel.querySelector('.mini-carousel-inner');
            const slides = carousel.querySelectorAll('.mini-slide');
            const prevBtn = carousel.querySelector('.mini-prev');
            const nextBtn = carousel.querySelector('.mini-next');
            const dotsContainer = carousel.querySelector('.mini-dots');
            
            if (!inner || slides.length === 0) return;
            
            let currentIndex = 0;
            const totalSlides = slides.length;
            
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                slides.forEach((_, i) => {
                    const dot = document.createElement('div');
                    dot.classList.add('mini-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                });
            }
            
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.mini-dot') : [];
            
            function goToSlide(index) {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;
                currentIndex = index;
                inner.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
            
            if (prevBtn) prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(currentIndex - 1);
            });
            
            if (nextBtn) nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(currentIndex + 1);
            });
            
            if (totalSlides <= 1) {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
            }
        });
    }
    
    initMiniCarousels();
    
    // ========== SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll suave a inicio
    // ========== FUNCIÓN PARA EL BOTÓN INICIO ==========
    const inicioLink = document.querySelector('a[href="#"]');
    if (inicioLink) {
        inicioLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    console.log('✨ Pachytha Impresiones - Versión simplificada cargada');
});
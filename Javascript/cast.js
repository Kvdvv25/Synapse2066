document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelector('.updates-btn').addEventListener('click', function() {
    const dropdown = document.querySelector('.updates-dropdown');
    const btn = this;
    const dropdownText = btn.querySelector('.dropdown-text');
    
    dropdown.classList.toggle('show');
    btn.classList.toggle('active');
    
    if (dropdown.classList.contains('show')) {
        dropdownText.textContent = 'Hide';
    } else {
        dropdownText.textContent = 'Show';
    }
});

    // Character cards hover effects
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .explore-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Active nav item highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu li');

    function highlightNavOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector(`a[href="#${sectionId}"]`);
                    if (link) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Character card click handler
    characterCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.character-link')) {
                const link = this.querySelector('.character-link');
                if (link) {
                    window.location.href = link.getAttribute('href');
                }
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('.character-image img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            }, 100);
        });
    });

    // Parallax effect on scroll (subtle)
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        characterCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed / 100);
            card.style.transform = `translateY(${yPos}px)`;
        });
        
        lastScrollTop = scrollTop;
    });

});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe character cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.character-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");
    console.log("hi!")
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.style.animationDelay = entry.target.dataset.delay || "0s";
        }
      });
    }, {
      threshold: 0.1
    });
  
    fadeElements.forEach(el => observer.observe(el));

    // Scroll-triggered animations that replay every time
    const scrollElements = document.querySelectorAll('.fade-in-on-scroll, .slide-in-left, .slide-in-right, .scale-in');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible classes to trigger animations
                entry.target.classList.add('fade-in-visible');
                entry.target.classList.add('slide-in-visible');
                entry.target.classList.add('scale-in-visible');
            } else {
                // Remove visible classes when element is out of view to reset for next time
                entry.target.classList.remove('fade-in-visible');
                entry.target.classList.remove('slide-in-visible');
                entry.target.classList.remove('scale-in-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach(el => scrollObserver.observe(el));

    // Special observer for names section animations
    const namesSection = document.querySelector('.names');
    const fnameElement = document.querySelector('#fname');
    const occupationElement = document.querySelector('.occupation');
    
    const namesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger the original animations
                fnameElement.style.animation = 'firstname 1s';
                occupationElement.style.animation = 'occu 1s';
            } else {
                // Reset animations when out of view
                fnameElement.style.animation = 'none';
                occupationElement.style.animation = 'none';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    if (namesSection) {
        namesObserver.observe(namesSection);
    }

    // Burger Menu Functionality
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = navLinks.querySelectorAll('a');

    // Toggle menu when burger is clicked
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
  
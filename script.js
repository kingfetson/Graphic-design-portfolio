// Main JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initCarousel();
  initFormValidation();
  initSmoothScrolling();
  initAnimations();
  initAccessibilityFeatures();
});

// Image Carousel Functionality
function initCarousel() {
  const carouselContent = document.getElementById('carousel-content');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  
  if (!carouselContent || carouselDots.length === 0) return;
  
  const carouselImages = [
    '[Image 1]',
    '[Image 2]',
    '[Image 3]'
  ];
  
  let currentIndex = 0;
  let carouselInterval;
  
  function updateCarousel(index) {
    // Update active dot
    carouselDots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive);
      dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    
    // Update content with fade effect
    carouselContent.style.opacity = '0';
    setTimeout(() => {
      carouselContent.textContent = carouselImages[index];
      carouselContent.style.opacity = '1';
    }, 300);
    
    currentIndex = index;
  }
  
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel(nextIndex);
  }
  
  // Add click functionality to dots
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
    
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateCarousel(index);
      }
      
      // Arrow key navigation
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel(prevIndex);
      }
    });
  });
  
  // Start auto-rotation
  function startAutoRotate() {
    carouselInterval = setInterval(nextSlide, 3000);
  }
  
  function stopAutoRotate() {
    clearInterval(carouselInterval);
  }
  
  // Pause on hover
  const carouselContainer = document.querySelector('.project-image-carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoRotate);
    carouselContainer.addEventListener('mouseleave', startAutoRotate);
    carouselContainer.addEventListener('focusin', stopAutoRotate);
    carouselContainer.addEventListener('focusout', startAutoRotate);
  }
  
  // Initialize
  updateCarousel(0);
  startAutoRotate();
}

// Form Validation
function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submit-button');
  
  // Real-time validation
  function validateField(field, errorId) {
    const errorElement = document.getElementById(errorId);
    let isValid = true;
    let errorMessage = '';
    
    if (!field.value.trim()) {
      errorMessage = 'This field is required';
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    } else if (field.id === 'message' && field.value.trim().length < 10) {
      errorMessage = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    errorElement.textContent = errorMessage;
    field.setAttribute('aria-invalid', !isValid);
    
    return isValid;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Add input event listeners
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
      const errorId = this.id + '-error';
      validateField(this, errorId);
      updateSubmitButton();
    });
    
    input.addEventListener('blur', function() {
      const errorId = this.id + '-error';
      validateField(this, errorId);
    });
  });
  
  function updateSubmitButton() {
    const isNameValid = nameInput.value.trim() !== '';
    const isEmailValid = isValidEmail(emailInput.value);
    const isMessageValid = messageInput.value.trim().length >= 10;
    
    submitButton.disabled = !(isNameValid && isEmailValid && isMessageValid);
  }
  
  // Handle form submission
  window.handleFormSubmit = function() {
    const isNameValid = validateField(nameInput, 'name-error');
    const isEmailValid = validateField(emailInput, 'email-error');
    const isMessageValid = validateField(messageInput, 'message-error');
    
    if (isNameValid && isEmailValid && isMessageValid) {
      // Simulate form submission
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        // In a real application, this would be an AJAX call
        alert('Thank you! Your message has been sent. (This is a demo)');
        form.reset();
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        
        // Clear errors
        document.querySelectorAll('.form-error').forEach(el => {
          el.textContent = '';
        });
        
        // Remove aria-invalid attributes
        [nameInput, emailInput, messageInput].forEach(input => {
          input.removeAttribute('aria-invalid');
        });
      }, 1500);
    }
  };
}

// Smooth Scrolling
function initSmoothScrolling() {
  // This is handled by CSS, but we add a fallback for browsers that don't support it
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Animations on scroll
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0

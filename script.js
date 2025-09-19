
// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
if (prefersDarkScheme.matches) {
  document.body.classList.remove('light-theme');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  document.body.classList.add('light-theme');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.remove('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
});

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else if (savedTheme === 'dark') {
  document.body.classList.remove('light-theme');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Improved Contact Me button with immediate response
document.getElementById('contact-btn').addEventListener('click', function(e) {
  e.preventDefault();
  const contactSection = document.getElementById('contact');
  
  // Scroll immediately with smooth behavior
  contactSection.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
  
  // Update active nav item
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });
  document.querySelector('nav a[href="#contact"]').classList.add('active');
  
  // Update URL without page reload
  history.pushState(null, null, '#contact');
});

// Smooth navigation for other links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Update active state
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Smooth scroll
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL
        history.pushState(null, null, targetId);
      }
    }
  });
});

// Highlight active nav on scroll
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });
    }
  });
});

// Fade-in animation
document.addEventListener('DOMContentLoaded', () => {
  const firstVisit = localStorage.getItem('firstVisit') === null;
  
  if (firstVisit) {
    localStorage.setItem('firstVisit', 'false');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    document.querySelector('header#hero').style.opacity = '1';
  } else {
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('visible');
    });
    document.querySelector('header#hero').style.opacity = '1';
  }
});

// Typewriter animation for job titles
document.addEventListener('DOMContentLoaded', () => {
  const typewriterElement = document.getElementById('typewriter');
  const titles = ['SOFTWARE ENGINEER', 'COMPUTER SCIENTIST', 'WEB DEVELOPER'];
  let currentTitleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150; // milliseconds
  
  function typeWriter() {
    const currentTitle = titles[currentTitleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = charIndex % 3 === 0 ? 100 : 150;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
  }
  
  setTimeout(typeWriter, 1000);
});


document.addEventListener('DOMContentLoaded', function() {
            // Get all portfolio items
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            // Get all modals
            const modals = document.querySelectorAll('.modal');
            
            // Get all close buttons
            const closeButtons = document.querySelectorAll('.close-modal');
            
            // Add click event to each portfolio item
            portfolioItems.forEach(item => {
                item.addEventListener('click', function() {
                    const projectId = this.getAttribute('data-project');
                    const modal = document.getElementById(`modal-${projectId}`);
                    
                    if (modal) {
                        modal.classList.add('active');
                    }
                });
            });
            
            // Add click event to close buttons
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // Enable scrolling
                });
            });
            
            // Close modal when clicking outside the content
            modals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('active');
                        document.body.style.overflow = ''; // Enable scrolling
                    }
                });
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modals.forEach(modal => {
                        if (modal.classList.contains('active')) {
                            modal.classList.remove('active');
                            document.body.style.overflow = ''; // Enable scrolling
                        }
                    });
                }
            });
        });
//nav
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const aboutSection = document.getElementById('about');
    

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // show navbar after scrolling 50px
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    });

       
});


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

        


const scrollText = document.getElementById('scrollText');
const overlay = document.getElementById('overlay');
const section2 = document.getElementById('section2');
const section2Text = document.getElementById('section2Text');

const section2Top = section2.offsetTop;
const section2Height = section2.offsetHeight;
const section2TextTop = section2Text.offsetTop;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Gradually darken background
  const maxScroll = section2Top + section2Height;
  const darkOpacity = Math.min(scrollY / maxScroll, 1) * 1;
  overlay.style.background = `rgba(0,0,0,${darkOpacity})`;

  const textMiddle = scrollText.offsetHeight / 2;
  const paragraphMiddle = section2Text.offsetTop + section2.offsetTop + section2Text.offsetHeight / 2;

  if (scrollY + window.innerHeight / 2 < paragraphMiddle) {
    // Fixed before reaching paragraph
    scrollText.style.position = 'fixed';
    scrollText.style.top = '50%';
    scrollText.style.transform = 'translateY(-50%)';
  } else if (scrollY + window.innerHeight / 2 >= paragraphMiddle) {
    // Stick to paragraph, scroll with Section 2
    scrollText.style.position = 'absolute';
    scrollText.style.top = `${paragraphMiddle - section2Top - textMiddle}px`;
    scrollText.style.transform = 'translateY(0)';
  }
  // No bottom clamping: text naturally scrolls out with Section 2
});


//CONTACT FROM//

// Initialize EmailJS
emailjs.init("B8s5EoRC_Ai-qxJws"); // public key

const form = document.getElementById("contactForm");
const message = document.getElementById("message");
const messageCount = document.getElementById("message-count");

// Character count
message.addEventListener("input", () => {
  messageCount.textContent = message.value.length;
});

// Form submission
form.addEventListener("submit", function(event) {
  event.preventDefault();
  emailjs.sendForm("service_c7jbhbb", "template_rd4bhi8", form)
    .then(() => {
      alert("Message sent! Thank you for contacting me.");
      form.reset();
      messageCount.textContent = 0;
    })
    .catch(err => {
      alert("Oops... something went wrong. " + JSON.stringify(err));
    });
});



// Only apply on mobile
if (window.innerWidth <= 768) {
  const scrollText = document.getElementById('scrollText');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {  // change 50 to whatever offset you want
      scrollText.classList.add('faded');
    } else {
      scrollText.classList.remove('faded');
    }
  });
}

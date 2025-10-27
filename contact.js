// Initialize EmailJS - Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // You'll get this from EmailJS dashboard
})();

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-spin"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"/><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/></svg> Sending...';
    submitBtn.disabled = true;
    
    // EmailJS Template Parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      to_email: 'anwarkabiraudi@gmail.com' // Your email address
    };
    
    // Send email using EmailJS
    try {
      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS
      const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
      
      // Success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message active';
      successMessage.textContent = 'Message sent successfully! I\'ll get back to you within 24 hours.';
      contactForm.insertBefore(successMessage, contactForm.firstChild);
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
      
      // Scroll to top of form
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
    } catch (error) {
      console.error('EmailJS error:', error);
      
      // Show error message
      alert('Sorry, there was an error sending your message. Please try again or contact me directly at anwarkabiraudi@gmail.com');
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Add WhatsApp click tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('WhatsApp link clicked');
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const WHATSAPP_NUMBER = '2347049894502';

function showSuccessMessage() {
  // Remove existing messages
  const existing = document.querySelector('.success-message');
  if (existing) {
    existing.remove();
  }

  // Create message element
  const message = document.createElement('div');
  message.className = 'success-message active';
  message.style.cssText = 'padding: 1.5rem 2rem; background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border: 2px solid rgba(34, 197, 94, 0.4); border-radius: 1rem; color: #22c55e; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; font-size: 1rem; font-weight: 600; box-shadow: 0 10px 40px rgba(34, 197, 94, 0.2); animation: slideDown 0.5s ease-out;';
  
  message.innerHTML = `
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style="flex-shrink: 0;">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <strong>✓ Message sent successfully!</strong> Opening WhatsApp...
  `;

  // Insert after form-header, before form
  const formWrapper = contactForm.parentElement;
  const formHeader = formWrapper.querySelector('.form-header');
  
  if (formHeader && formHeader.nextSibling) {
    formWrapper.insertBefore(message, formHeader.nextSibling);
  } else {
    formWrapper.insertBefore(message, contactForm);
  }

  // Scroll to message
  setTimeout(() => {
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);

  // Auto-remove after 7 seconds
  setTimeout(() => {
    message.style.transition = 'all 0.5s ease';
    message.style.opacity = '0';
    message.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 500);
  }, 7000);
}

function sendToWhatsApp(name, phone, subject, message) {
  const formattedMessage = `👋 Hello! I'm *${name}*\n\n📱 Phone: ${phone}\n\n📋 Subject: ${subject}\n\n💬 Message:\n${message}\n\n---\nMessage sent from ShowTech Contact Form`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
  window.open(whatsappUrl, '_blank');
}

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phoneRaw = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !phoneRaw || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }

    const phoneDigits = phoneRaw.replace(/\D/g, '');
    if (!/^\d{11}$/.test(phoneDigits)) {
      const phoneInput = document.getElementById('phone');
      phoneInput.setCustomValidity('Please enter exactly 11 digits (e.g., 09028797786)');
      phoneInput.reportValidity();
      phoneInput.addEventListener('input', function() { phoneInput.setCustomValidity(''); }, { once: true });
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-spin"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"/><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/></svg> Sending...';
    submitBtn.disabled = true;

    // Show success message and send
    showSuccessMessage();
    sendToWhatsApp(name, phoneRaw, subject, message);
    
    // Reset after delay
    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
  
  console.log('✓ Contact form loaded successfully!');
} else {
  console.error('✗ Contact form not found!');
}

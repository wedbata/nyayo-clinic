/**
 * ==========================================================================
 * NYAYO CLINIC - CLIENT JAVASCRIPT
 * Location: Lokoloko St, Wau, South Sudan
 * Tagline: Experience the Difference
 * ==========================================================================
 */

// ==========================================================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================================================

/**
 * CLINIC WHATSAPP NUMBER (International format without leading '+')
 * Change this single constant if the clinic phone/WhatsApp number is ever updated.
 * Default: 211922885420 (Wau, South Sudan)
 */
const WHATSAPP_NUMBER = '211922885420';

/**
 * CLINIC PHONE NUMBER FOR DISPLAY & CALLS
 */
const CLINIC_PHONE_DISPLAY = '+211 922 885 420';


// ==========================================================================
// 2. DOM CONTENT LOADED INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initSmoothScrollAndActiveNav();
  initDynamicDayHighlight();
  initDateInputMin();
  initServiceCardLinks();
  initAppointmentForm();
});


// ==========================================================================
// 3. STICKY HEADER & SCROLL SHADOW
// ==========================================================================
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}


// ==========================================================================
// 4. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !mainNav) return;

  const toggleMenu = () => {
    const isOpen = mainNav.classList.contains('open');
    if (isOpen) {
      mainNav.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      mainNav.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close mobile nav when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (event) => {
    if (mainNav.classList.contains('open') &&
        !mainNav.contains(event.target) &&
        !toggleBtn.contains(event.target)) {
      mainNav.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}


// ==========================================================================
// 5. SMOOTH SCROLL & ACTIVE SECTION HIGHLIGHTING
// ==========================================================================
function initSmoothScrollAndActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!sections.length || !navLinks.length) return;

  // Use IntersectionObserver for high performance active link highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}


// ==========================================================================
// 6. DYNAMIC "TODAY" OPENING HOURS HIGHLIGHT
// ==========================================================================
function initDynamicDayHighlight() {
  // Current day: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const todayIndex = new Date().getDay();
  const rows = document.querySelectorAll('.hours-table tbody tr');

  rows.forEach(row => {
    const dayAttr = row.getAttribute('data-day');
    if (dayAttr !== null && parseInt(dayAttr, 10) === todayIndex) {
      row.classList.add('current-day-row');
      const statusPill = row.querySelector('.status-pill');
      if (statusPill) {
        statusPill.textContent = 'Open Today';
        statusPill.style.backgroundColor = '#1a4a2e';
        statusPill.style.color = '#ffffff';
      }
    }
  });
}


// ==========================================================================
// 7. APPOINTMENT DATE PICKER - PREVENT PAST DATES
// ==========================================================================
function initDateInputMin() {
  const dateInput = document.getElementById('preferred-date');
  if (!dateInput) return;

  // Get today's date formatted as YYYY-MM-DD in local time
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  dateInput.min = todayStr;
  dateInput.value = todayStr; // Default to today for convenience
}


// ==========================================================================
// 8. SERVICE CARDS PRE-SELECTION ON CLICK
// ==========================================================================
function initServiceCardLinks() {
  const serviceLinks = document.querySelectorAll('[data-service-select]');
  const serviceSelect = document.getElementById('service-select');

  if (!serviceLinks.length || !serviceSelect) return;

  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetService = link.getAttribute('data-service-select');
      if (targetService) {
        // Find matching option in select dropdown
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.toLowerCase().includes(targetService.toLowerCase()) ||
              targetService.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });
}


// ==========================================================================
// 9. APPOINTMENT FORM VALIDATION & WHATSAPP INTEGRATION
// ==========================================================================
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  const nameInput = document.getElementById('patient-name');
  const phoneInput = document.getElementById('patient-phone');
  const serviceSelect = document.getElementById('service-select');
  const dateInput = document.getElementById('preferred-date');
  const timeSelect = document.getElementById('preferred-time');
  const messageInput = document.getElementById('patient-message');

  const errorName = document.getElementById('error-name');
  const errorPhone = document.getElementById('error-phone');
  const errorService = document.getElementById('error-service');
  const errorDate = document.getElementById('error-date');

  const successBanner = document.getElementById('form-success-banner');
  const directWaLink = document.getElementById('direct-wa-link');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // 1. Validate Name
    const nameVal = nameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      nameInput.classList.add('is-invalid');
      errorName.classList.add('visible');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
      errorName.classList.remove('visible');
    }

    // 2. Validate Phone
    const phoneVal = phoneInput.value.trim();
    if (!phoneVal || phoneVal.length < 6) {
      phoneInput.classList.add('is-invalid');
      errorPhone.classList.add('visible');
      isValid = false;
    } else {
      phoneInput.classList.remove('is-invalid');
      errorPhone.classList.remove('visible');
    }

    // 3. Validate Service Selection
    const serviceVal = serviceSelect.value;
    if (!serviceVal) {
      serviceSelect.classList.add('is-invalid');
      errorService.classList.add('visible');
      isValid = false;
    } else {
      serviceSelect.classList.remove('is-invalid');
      errorService.classList.remove('visible');
    }

    // 4. Validate Date
    const dateVal = dateInput.value;
    if (!dateVal) {
      dateInput.classList.add('is-invalid');
      errorDate.classList.add('visible');
      isValid = false;
    } else {
      dateInput.classList.remove('is-invalid');
      errorDate.classList.remove('visible');
    }

    if (!isValid) {
      // Focus first invalid input
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Prepare WhatsApp Message
    const timeVal = timeSelect ? timeSelect.value : 'Any time';
    const notesVal = messageInput.value.trim() || 'None provided';

    const formattedMessage =
      `🏥 *Appointment Request - Nyayo Clinic*\n\n` +
      `👤 *Patient Name:* ${nameVal}\n` +
      `📞 *Phone Number:* ${phoneVal}\n` +
      `🩺 *Service Needed:* ${serviceVal}\n` +
      `📅 *Preferred Date:* ${dateVal}\n` +
      `⏰ *Preferred Time Slot:* ${timeVal}\n` +
      `📝 *Notes / Symptoms:* ${notesVal}\n\n` +
      `📍 *Location:* Lokoloko St, Wau, South Sudan\n` +
      `_Sent from Nyayo Clinic Website_`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Update banner with direct fallback link
    if (directWaLink) {
      directWaLink.href = whatsappUrl;
    }
    if (successBanner) {
      successBanner.style.display = 'block';
    }

    // Open WhatsApp in new tab/window
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Fallback if popup was blocked by browser
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  });

  // Real-time validation cleanup on input
  [nameInput, phoneInput, dateInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (input.value.trim().length > 0) {
          input.classList.remove('is-invalid');
          const errorMsg = document.getElementById(`error-${input.id.replace('patient-', '')}`);
          if (errorMsg) errorMsg.classList.remove('visible');
        }
      });
    }
  });

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value) {
        serviceSelect.classList.remove('is-invalid');
        if (errorService) errorService.classList.remove('visible');
      }
    });
  }
}

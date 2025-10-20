// Application State
let editMode = false;
let appData = {
  company: {
    name: "TrueBits Application Services",
    tagline: "Innovative Software Solutions for Your Business",
    location: "Kolar District, Karnataka, India",
    phone: "+91 9036301914",
    email: "truebitsapplicaations@gmail.com",
    website: "truebitsapplicationsoftware.in"
  },
  hero: {
    headline: "Empower Your Business with Innovative Software Solutions",
    subheadline: "Custom billing and business management software tailored for industries across Kolar District and beyond",
    cta_primary: "Get Started",
    cta_secondary: "Learn More"
  },
  sections: {
    services_title: "Our Services",
    services_subtitle: "Comprehensive software solutions for every business need",
    features_title: "Why Choose TrueBits?",
    features_subtitle: "Excellence in software development and customer service",
    contact_title: "Get In Touch",
    contact_subtitle: "Ready to transform your business? Contact us today"
  },
  services: [
    {
      title: "General Billing Application",
      description: "Comprehensive billing software for retail and wholesale businesses with inventory management and GST reporting",
      icon: "📊"
    },
    {
      title: "Medical Billing Software",
      description: "Specialized billing solution for pharmacies and healthcare providers with stock management",
      icon: "🏥"
    },
    {
      title: "Fertilizer Billing System",
      description: "FIFO-based inventory system for fertilizer and pesticide retailers with expiry tracking",
      icon: "🌱"
    },
    {
      title: "Educational Management",
      description: "Complete school and college management system with student tracking and fee management",
      icon: "🎓"
    },
    {
      title: "Retail Solutions",
      description: "Tailored software for ceramics, paints, hardware stores with inventory control",
      icon: "🏪"
    },
    {
      title: "Custom Development",
      description: "Bespoke software solutions designed specifically for your unique business requirements",
      icon: "⚙️"
    }
  ],
  features: [
    {
      title: "User-Friendly Interface",
      description: "Intuitive design ensuring easy adoption and minimal training required",
      icon: "👥"
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security with regular backups and data protection",
      icon: "🔒"
    },
    {
      title: "Local Support",
      description: "Based in Kolar District with prompt on-site support and service",
      icon: "📍"
    },
    {
      title: "Affordable Pricing",
      description: "Competitive pricing at ₹16,500 lifetime - no monthly or yearly charges",
      icon: "💰"
    }
  ],
  about: {
    headline: "About TrueBits Applications",
    description: "TrueBits Applications delivers powerful, user-friendly software for efficient business management. Based locally in Kolar District, we provide innovative billing and business management software solutions tailored for industries including medical, retail, fertilizers, and education sectors."
  },
  benefits: [
    "Developed locally in Kolar District ensuring prompt service",
    "User-friendly sales and purchase modules",
    "Guaranteed security and trustworthiness",
    "Competitive pricing without compromising quality",
    "Regular updates and reliable support"
  ],
  pricing: {
    amount: "₹16,500",
    period: "Lifetime License",
    note: "One-time payment - No monthly or yearly charges"
  }
};

// Original data for reset functionality
const originalData = JSON.parse(JSON.stringify(appData));

// DOM Elements
const editToggle = document.getElementById('editModeToggle');
const cmsControls = document.getElementById('cmsControls');
const saveChanges = document.getElementById('saveChanges');
const resetDefault = document.getElementById('resetDefault');
const primaryColorPicker = document.getElementById('primaryColor');
const secondaryColorPicker = document.getElementById('secondaryColor');
const contactForm = document.getElementById('contactForm');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  renderServices();
  renderFeatures();
  renderBenefits();
  addScrollAnimations();
});

function initializeApp() {
  // Populate all editable content
  populateContent();
  
  // Setup sticky header
  window.addEventListener('scroll', handleScroll);
  
  // Setup smooth scrolling for navigation
  setupSmoothScrolling();
}

function populateContent() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
    const field = element.getAttribute('data-field');
    const value = getNestedProperty(appData, field);
    if (value) {
      element.textContent = value;
    }
  });
}

function getNestedProperty(obj, path) {
  return path.split('.').reduce((current, key) => current && current[key], obj);
}

function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

function setupEventListeners() {
  // Edit mode toggle
  editToggle.addEventListener('click', toggleEditMode);
  
  // CMS controls
  saveChanges.addEventListener('click', saveAllChanges);
  resetDefault.addEventListener('click', resetToDefault);
  
  // Color pickers
  primaryColorPicker.addEventListener('change', updatePrimaryColor);
  secondaryColorPicker.addEventListener('change', updateSecondaryColor);
  
  // Contact form
  contactForm.addEventListener('submit', handleContactForm);
  
  // Mobile navigation
  navToggle.addEventListener('click', toggleMobileNav);
  
  // Close mobile nav when clicking links
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

function toggleEditMode() {
  editMode = !editMode;
  document.body.classList.toggle('edit-mode', editMode);
  editToggle.classList.toggle('active', editMode);
  editToggle.textContent = editMode ? 'Exit Edit' : 'Edit Mode';
  
  if (editMode) {
    cmsControls.classList.remove('hidden');
    enableInlineEditing();
  } else {
    cmsControls.classList.add('hidden');
    disableInlineEditing();
  }
}

function enableInlineEditing() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
    element.contentEditable = true;
    element.addEventListener('blur', handleContentEdit);
    element.addEventListener('keydown', handleKeyDown);
  });
}

function disableInlineEditing() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
    element.contentEditable = false;
    element.removeEventListener('blur', handleContentEdit);
    element.removeEventListener('keydown', handleKeyDown);
  });
}

function handleContentEdit(event) {
  const element = event.target;
  const field = element.getAttribute('data-field');
  const value = element.textContent.trim();
  
  if (field && value) {
    setNestedProperty(appData, field, value);
  }
}

function handleKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    event.target.blur();
  }
}

function renderServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  servicesGrid.innerHTML = '';
  
  appData.services.forEach((service, index) => {
    const serviceCard = createServiceCard(service, index);
    servicesGrid.appendChild(serviceCard);
  });
}

function createServiceCard(service, index) {
  const card = document.createElement('div');
  card.className = 'service-card fade-in';
  card.style.animationDelay = `${index * 0.1}s`;
  
  card.innerHTML = `
    ${editMode ? '<button class="card-remove" onclick="removeServiceCard(' + index + ')">×</button>' : ''}
    <span class="service-card__icon editable" data-field="services.${index}.icon">${service.icon}</span>
    <h3 class="service-card__title editable" data-field="services.${index}.title">${service.title}</h3>
    <p class="service-card__description editable" data-field="services.${index}.description">${service.description}</p>
    <a href="#contact" class="service-card__link">Learn More →</a>
  `;
  
  return card;
}

function renderFeatures() {
  const featuresGrid = document.getElementById('featuresGrid');
  featuresGrid.innerHTML = '';
  
  appData.features.forEach((feature, index) => {
    const featureCard = createFeatureCard(feature, index);
    featuresGrid.appendChild(featureCard);
  });
}

function createFeatureCard(feature, index) {
  const card = document.createElement('div');
  card.className = 'feature-card fade-in';
  card.style.animationDelay = `${index * 0.1}s`;
  
  card.innerHTML = `
    ${editMode ? '<button class="card-remove" onclick="removeFeatureCard(' + index + ')">×</button>' : ''}
    <span class="feature-card__icon editable" data-field="features.${index}.icon">${feature.icon}</span>
    <h3 class="feature-card__title editable" data-field="features.${index}.title">${feature.title}</h3>
    <p class="feature-card__description editable" data-field="features.${index}.description">${feature.description}</p>
  `;
  
  return card;
}

function renderBenefits() {
  const benefitsList = document.getElementById('benefitsList');
  benefitsList.innerHTML = '';
  
  appData.benefits.forEach((benefit, index) => {
    const li = document.createElement('li');
    li.className = 'editable';
    li.setAttribute('data-field', `benefits.${index}`);
    li.textContent = benefit;
    benefitsList.appendChild(li);
  });
}

function addServiceCard() {
  if (appData.services.length >= 8) {
    alert('Maximum 8 services allowed');
    return;
  }
  
  const newService = {
    title: 'New Service',
    description: 'Service description here',
    icon: '🔧'
  };
  
  appData.services.push(newService);
  renderServices();
  
  if (editMode) {
    enableInlineEditing();
  }
}

function removeServiceCard(index) {
  if (appData.services.length <= 3) {
    alert('Minimum 3 services required');
    return;
  }
  
  appData.services.splice(index, 1);
  renderServices();
  
  if (editMode) {
    enableInlineEditing();
  }
}

function addFeatureCard() {
  if (appData.features.length >= 6) {
    alert('Maximum 6 features allowed');
    return;
  }
  
  const newFeature = {
    title: 'New Feature',
    description: 'Feature description here',
    icon: '⭐'
  };
  
  appData.features.push(newFeature);
  renderFeatures();
  
  if (editMode) {
    enableInlineEditing();
  }
}

function removeFeatureCard(index) {
  if (appData.features.length <= 3) {
    alert('Minimum 3 features required');
    return;
  }
  
  appData.features.splice(index, 1);
  renderFeatures();
  
  if (editMode) {
    enableInlineEditing();
  }
}

function updatePrimaryColor(event) {
  const color = event.target.value;
  document.documentElement.style.setProperty('--primary-color', color);
}

function updateSecondaryColor(event) {
  const color = event.target.value;
  document.documentElement.style.setProperty('--secondary-color', color);
}

function saveAllChanges() {
  // In a real application, this would send data to a server
  // For now, we'll just show a success message
  showMessage('Changes saved successfully!', 'success');
}

function resetToDefault() {
  if (confirm('Are you sure you want to reset all changes? This cannot be undone.')) {
    // Reset data
    appData = JSON.parse(JSON.stringify(originalData));
    
    // Reset colors
    document.documentElement.style.setProperty('--primary-color', '#0066C0');
    document.documentElement.style.setProperty('--secondary-color', '#FF9900');
    primaryColorPicker.value = '#0066C0';
    secondaryColorPicker.value = '#FF9900';
    
    // Re-render everything
    populateContent();
    renderServices();
    renderFeatures();
    renderBenefits();
    
    if (editMode) {
      enableInlineEditing();
    }
    
    showMessage('Reset to default successfully!', 'success');
  }
}

function handleContactForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message')
  };
  
  // Basic validation
  if (!data.name || !data.email || !data.message) {
    showFormMessage('Please fill in all required fields.', 'error');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate form submission
  showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
  event.target.reset();
}

function showFormMessage(message, type) {
  const messageEl = document.getElementById('formMessage');
  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;
  messageEl.classList.remove('hidden');
  
  setTimeout(() => {
    messageEl.classList.add('hidden');
  }, 5000);
}

function showMessage(message, type) {
  // Create a temporary message element
  const messageEl = document.createElement('div');
  messageEl.textContent = message;
  messageEl.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
    color: ${type === 'success' ? '#155724' : '#721c24'};
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.remove();
  }, 3000);
}

function toggleMobileNav() {
  navMenu.classList.toggle('active');
}

function handleScroll() {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  }
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function addScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all cards and sections
  document.querySelectorAll('.service-card, .feature-card, .section__header').forEach(el => {
    observer.observe(el);
  });
}

// Global functions for onclick handlers
window.addServiceCard = addServiceCard;
window.removeServiceCard = removeServiceCard;
window.addFeatureCard = addFeatureCard;
window.removeFeatureCard = removeFeatureCard;
/**
 * Aesthetic - Medical & Cosmetic Clinic JavaScript Application
 * Pure Vanilla JS | Zero Dependencies | Full Responsiveness
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if data is loaded
  if (typeof AESTHETIC_DATA === 'undefined') {
    console.error('AESTHETIC_DATA not found. Please ensure data.js is loaded.');
    return;
  }

  // State Management
  const state = {
    cart: JSON.parse(localStorage.getItem('aesthetic_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('aesthetic_wishlist')) || [],
    currentSlide: 0,
    slideInterval: null,
    currentCaseIndex: 0,
    activeTreatmentCategory: 'All',
    testimonialIndex: 0
  };

  // Helper Functions
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const showToast = (message, icon = 'fa-check-circle') => {
    let container = $('.ae-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'ae-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'ae-toast';
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  /* ==========================================================================
     1. Header & Navigation (Sticky & Mobile Drawer)
     ========================================================================== */
  const header = $('.ae-header');
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-sticky');
    } else {
      header?.classList.remove('is-sticky');
    }
    // Back to top visibility
    const btt = $('.ae-back-to-top');
    if (btt) {
      if (window.scrollY > 400) {
        btt.classList.add('is-visible');
      } else {
        btt.classList.remove('is-visible');
      }
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Mobile Menu Drawer
  const menuToggle = $('.ae-menu-toggle');
  const mobileDrawer = $('#mobileDrawer');
  const mobileDrawerClose = $('#mobileDrawerClose');

  menuToggle?.addEventListener('click', () => {
    mobileDrawer?.classList.add('is-open');
  });

  mobileDrawerClose?.addEventListener('click', () => {
    mobileDrawer?.classList.remove('is-open');
  });

  // Close drawer when clicking backdrop
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      mobileDrawer.classList.remove('is-open');
    }
  });

  // Back to top action
  $('.ae-back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================================
     2. Hero Slider
     ========================================================================== */
  const heroSlider = $('.ae-hero-slider');
  const heroSlides = $$('.ae-hero-slide');
  const heroBullets = $$('.ae-hero-bullet');
  const prevBtn = $('#heroPrev');
  const nextBtn = $('#heroNext');

  const goToSlide = (index) => {
    if (!heroSlides.length) return;
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    heroBullets.forEach((bullet, i) => {
      bullet.classList.toggle('is-active', i === index);
    });
    state.currentSlide = index;
  };

  const nextSlide = () => {
    const nextIdx = (state.currentSlide + 1) % heroSlides.length;
    goToSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (state.currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prevIdx);
  };

  if (heroSlides.length > 0) {
    nextBtn?.addEventListener('click', () => {
      nextSlide();
      resetSliderTimer();
    });
    prevBtn?.addEventListener('click', () => {
      prevSlide();
      resetSliderTimer();
    });
    heroBullets.forEach((bullet, idx) => {
      bullet.addEventListener('click', () => {
        goToSlide(idx);
        resetSliderTimer();
      });
    });

    const startSliderTimer = () => {
      state.slideInterval = setInterval(nextSlide, 6500);
    };

    const resetSliderTimer = () => {
      clearInterval(state.slideInterval);
      startSliderTimer();
    };

    startSliderTimer();
  }

  /* ==========================================================================
     3. Interactive Body Silhouette Hotspots
     ========================================================================== */
  const hotspotPins = $$('.ae-hotspot-pin');
  const hotspotButtons = $$('.ae-hotspot-pill-btn');
  const hotspotCardFloat = $('#hotspotCardFloat');

  const updateHotspotDisplay = (hotspotId) => {
    const data = AESTHETIC_DATA.hotspots.find(h => h.id === hotspotId);
    if (!data) return;

    hotspotPins.forEach(pin => {
      pin.classList.toggle('is-active', pin.dataset.id === hotspotId);
    });
    hotspotButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.id === hotspotId);
    });

    if (hotspotCardFloat) {
      hotspotCardFloat.innerHTML = `
        <span class="ae-sub-title" style="margin-bottom: 4px; font-size: 0.75rem;">${data.category}</span>
        <h4 style="font-size: 1.125rem; margin-bottom: 8px;">${data.title}</h4>
        <p style="font-size: 0.875rem; color: var(--ae-text-muted); margin-bottom: 14px;">${data.description}</p>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <strong style="color: var(--ae-primary); font-size: 1.125rem;">${data.price}</strong>
          <span style="font-size: 0.8125rem; color: var(--ae-text-muted);"><i class="far fa-clock"></i> ${data.duration}</span>
        </div>
        <button class="ae-btn ae-btn-primary ae-open-booking-btn" data-treatment="${data.title}" style="width: 100%; padding: 10px 16px; font-size: 0.8125rem;">
          Book Treatment <i class="fas fa-arrow-right"></i>
        </button>
      `;

      // Position near active pin
      const activePin = $(`.ae-hotspot-pin[data-id="${hotspotId}"]`);
      if (activePin) {
        const topPercent = parseFloat(activePin.style.top);
        const leftPercent = parseFloat(activePin.style.left);
        hotspotCardFloat.style.top = `${Math.min(Math.max(topPercent - 10, 5), 65)}%`;
        hotspotCardFloat.style.left = leftPercent > 50 ? `${leftPercent - 42}%` : `${leftPercent + 8}%`;
        hotspotCardFloat.classList.add('is-visible');
      }
    }
  };

  hotspotPins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      updateHotspotDisplay(pin.dataset.id);
    });
  });

  hotspotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      updateHotspotDisplay(btn.dataset.id);
    });
  });

  // Init first hotspot
  if (AESTHETIC_DATA.hotspots.length > 0) {
    updateHotspotDisplay(AESTHETIC_DATA.hotspots[0].id);
  }

  /* ==========================================================================
     4. Draggable Before & After Comparison Slider
     ========================================================================== */
  const comparisonSlider = $('#aeComparisonSlider');
  const beforeContainer = $('#aeComparisonBeforeContainer');
  const comparisonHandle = $('#aeComparisonHandle');
  const baTabs = $$('.ae-ba-tab-btn');
  const baTitle = $('#baCaseTitle');
  const baCategory = $('#baCaseCategory');
  const baMeta = $('#baCaseMeta');

  let isDragging = false;

  const setComparisonPosition = (percent) => {
    const clamped = Math.max(0, Math.min(100, percent));
    if (beforeContainer) beforeContainer.style.width = `${clamped}%`;
    if (comparisonHandle) comparisonHandle.style.left = `${clamped}%`;
  };

  const handleDrag = (clientX) => {
    if (!comparisonSlider) return;
    const rect = comparisonSlider.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percent = (offsetX / rect.width) * 100;
    setComparisonPosition(percent);
  };

  if (comparisonSlider) {
    comparisonSlider.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleDrag(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handleDrag(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support for mobile devices
    comparisonSlider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) handleDrag(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      handleDrag(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Switch Transformation Case
    baTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        baTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const caseData = AESTHETIC_DATA.beforeAfterCases[index];
        if (!caseData) return;

        state.currentCaseIndex = index;
        const beforeImg = $('#comparisonBeforeImg');
        const afterImg = $('#comparisonAfterImg');

        if (beforeImg) beforeImg.src = caseData.beforeImg;
        if (afterImg) afterImg.src = caseData.afterImg;
        if (baTitle) baTitle.textContent = caseData.title;
        if (baCategory) baCategory.textContent = caseData.category;
        if (baMeta) baMeta.textContent = `${caseData.timeline} | ${caseData.procedure}`;

        setComparisonPosition(50);
      });
    });
  }

  /* ==========================================================================
     5. Treatments / Services Filtering & Rendering
     ========================================================================== */
  const treatmentsContainer = $('#treatmentsContainer');
  const treatmentFilters = $$('.ae-treatment-filter-btn');

  const renderTreatments = (category = 'All') => {
    if (!treatmentsContainer) return;
    const filtered = category === 'All'
      ? AESTHETIC_DATA.treatments
      : AESTHETIC_DATA.treatments.filter(t => t.category.toLowerCase() === category.toLowerCase());

    treatmentsContainer.innerHTML = filtered.map(t => `
      <div class="ae-treatment-card">
        <div class="ae-treatment-img-wrap">
          <img src="${t.image}" alt="${t.title}" class="ae-treatment-img" loading="lazy">
          <span class="ae-treatment-price-badge">${t.price}</span>
        </div>
        <div class="ae-treatment-body">
          <span class="ae-treatment-category">${t.category}</span>
          <h3 class="ae-treatment-title">${t.title}</h3>
          <p class="ae-treatment-summary">${t.summary}</p>
          <div class="ae-treatment-footer">
            <span class="ae-treatment-duration"><i class="far fa-clock"></i> ${t.duration}</span>
            <button class="ae-btn ae-btn-link ae-open-booking-btn" data-treatment="${t.title}">
              Book Now <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  treatmentFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      treatmentFilters.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.dataset.category || 'All';
      state.activeTreatmentCategory = cat;
      renderTreatments(cat);
    });
  });

  renderTreatments('All');

  /* ==========================================================================
     6. Skincare Shop Products & Quick View
     ========================================================================== */
  const productContainer = $('#productsContainer');

  const renderProducts = () => {
    if (!productContainer) return;
    productContainer.innerHTML = AESTHETIC_DATA.products.map(p => `
      <div class="ae-product-card" data-id="${p.id}">
        <span class="ae-product-discount">${p.discount}</span>
        <div class="ae-product-img-box">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="ae-product-quick-actions">
            <button class="ae-product-action-btn ae-quick-view-btn" data-id="${p.id}" title="Quick View">
              <i class="far fa-eye"></i>
            </button>
            <button class="ae-product-action-btn ae-add-to-cart-btn" data-id="${p.id}" title="Add to Bag">
              <i class="fas fa-shopping-bag"></i>
            </button>
            <button class="ae-product-action-btn ae-wishlist-btn" data-id="${p.id}" title="Wishlist">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
        <div class="ae-product-category">${p.category}</div>
        <h4 class="ae-product-title">${p.name}</h4>
        <div class="ae-product-rating">
          ${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))}
          <span style="color: var(--ae-text-muted); font-size: 0.8125rem; margin-left: 4px;">(${p.reviews})</span>
        </div>
        <div class="ae-product-price-box">
          <span class="ae-product-price">$${p.price.toFixed(2)}</span>
          <span class="ae-product-original-price">$${p.originalPrice.toFixed(2)}</span>
        </div>
      </div>
    `).join('');
  };

  renderProducts();

  // Quick View Modal
  const quickViewModal = $('#quickViewModal');
  const quickViewBody = $('#quickViewBody');

  const openQuickView = (productId) => {
    const product = AESTHETIC_DATA.products.find(p => p.id === productId);
    if (!product || !quickViewBody) return;

    quickViewBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center;">
        <div style="border-radius: var(--ae-radius-md); overflow: hidden; background: var(--ae-bg-cream);">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 360px; object-fit: cover;">
        </div>
        <div>
          <span class="ae-sub-title" style="margin-bottom: 6px;">${product.category}</span>
          <h3 style="font-size: 1.625rem; margin-bottom: 12px;">${product.name}</h3>
          <div class="ae-product-rating" style="margin-bottom: 14px;">
            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
            <span style="color: var(--ae-text-muted); margin-left: 6px;">${product.rating} (${product.reviews} clinical reviews)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px;">
            <span style="font-size: 1.625rem; font-weight: 600; color: var(--ae-secondary);">$${product.price.toFixed(2)}</span>
            <span style="font-size: 1.125rem; color: var(--ae-text-muted); text-decoration: line-through;">$${product.originalPrice.toFixed(2)}</span>
            <span class="ae-product-discount" style="position: static;">${product.discount}</span>
          </div>
          <p style="font-size: 0.9375rem; color: var(--ae-text-muted); line-height: 1.7; margin-bottom: 24px;">${product.description}</p>
          <div style="display: flex; gap: 12px; align-items: center;">
            <button class="ae-btn ae-btn-primary ae-add-to-cart-btn" data-id="${product.id}" style="flex-grow: 1;">
              <i class="fas fa-shopping-bag"></i> Add to Bag
            </button>
            <button class="ae-btn ae-btn-outline-dark ae-wishlist-btn" data-id="${product.id}">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    quickViewModal?.classList.add('is-open');
  };

  /* ==========================================================================
     7. Slide-out Shopping Bag Drawer
     ========================================================================== */
  const cartDrawer = $('#cartDrawer');
  const cartDrawerClose = $('#cartDrawerClose');
  const cartToggleBtns = $$('.ae-cart-toggle-btn');
  const cartItemsList = $('#cartItemsList');
  const cartSubtotalEl = $('#cartSubtotal');
  const cartBadgeCountEls = $$('.ae-badge-count');

  const updateCartUI = () => {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadgeCountEls.forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    if (!cartItemsList) return;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--ae-text-muted);">
          <i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.3;"></i>
          <h4>Your Bag is Empty</h4>
          <p style="font-size: 0.875rem; margin-top: 8px;">Explore our clinical skincare essentials to replenish your daily routine.</p>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
      return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    cartItemsList.innerHTML = state.cart.map(item => `
      <div class="ae-cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="ae-cart-thumb">
        <div class="ae-cart-info">
          <h5 class="ae-cart-title">${item.name}</h5>
          <div class="ae-cart-price">$${item.price.toFixed(2)}</div>
          <div class="ae-cart-qty-ctrl">
            <button class="ae-cart-qty-btn ae-qty-minus" data-id="${item.id}">-</button>
            <span class="ae-cart-qty-val">${item.quantity}</span>
            <button class="ae-cart-qty-btn ae-qty-plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="ae-cart-remove-btn ae-cart-item-remove" data-id="${item.id}">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    `).join('');

    localStorage.setItem('aesthetic_cart', JSON.stringify(state.cart));
  };

  const addToCart = (productId) => {
    const product = AESTHETIC_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    updateCartUI();
    showToast(`Added ${product.name} to bag!`, 'fa-shopping-bag');
    cartDrawer?.classList.add('is-open');
  };

  cartToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartDrawer?.classList.add('is-open');
    });
  });

  cartDrawerClose?.addEventListener('click', () => {
    cartDrawer?.classList.remove('is-open');
  });

  cartDrawer?.addEventListener('click', (e) => {
    if (e.target === cartDrawer) {
      cartDrawer.classList.remove('is-open');
    }
  });

  // Global delegate for cart actions
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.ae-add-to-cart-btn');
    if (addBtn) {
      const pid = addBtn.dataset.id;
      if (pid) addToCart(pid);
      return;
    }

    const quickBtn = e.target.closest('.ae-quick-view-btn');
    if (quickBtn) {
      const pid = quickBtn.dataset.id;
      if (pid) openQuickView(pid);
      return;
    }

    const wishBtn = e.target.closest('.ae-wishlist-btn');
    if (wishBtn) {
      const pid = wishBtn.dataset.id;
      const idx = state.wishlist.indexOf(pid);
      if (idx > -1) {
        state.wishlist.splice(idx, 1);
        showToast('Removed from wishlist');
      } else {
        state.wishlist.push(pid);
        showToast('Saved to wishlist!', 'fa-heart');
      }
      localStorage.setItem('aesthetic_wishlist', JSON.stringify(state.wishlist));
      return;
    }

    const plusBtn = e.target.closest('.ae-qty-plus');
    if (plusBtn) {
      const item = state.cart.find(i => i.id === plusBtn.dataset.id);
      if (item) {
        item.quantity += 1;
        updateCartUI();
      }
      return;
    }

    const minusBtn = e.target.closest('.ae-qty-minus');
    if (minusBtn) {
      const item = state.cart.find(i => i.id === minusBtn.dataset.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter(i => i.id !== item.id);
        }
        updateCartUI();
      }
      return;
    }

    const removeBtn = e.target.closest('.ae-cart-item-remove');
    if (removeBtn) {
      state.cart = state.cart.filter(i => i.id !== removeBtn.dataset.id);
      updateCartUI();
      showToast('Item removed from bag');
      return;
    }
  });

  updateCartUI();

  // Checkout Button
  $('#cartCheckoutBtn')?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your bag is currently empty.');
      return;
    }
    const orderRef = 'AES-' + Math.floor(100000 + Math.random() * 900000);
    showToast(`Order confirmed! Reference #${orderRef}`, 'fa-check-double');
    state.cart = [];
    updateCartUI();
    cartDrawer?.classList.remove('is-open');
  });

  /* ==========================================================================
     8. Book Appointment Modal & Form
     ========================================================================== */
  const appointmentModal = $('#appointmentModal');
  const appointmentModalClose = $('#appointmentModalClose');
  const appointmentForm = $('#appointmentForm');
  const treatmentSelect = $('#appointmentTreatment');
  const doctorSelect = $('#appointmentDoctor');

  // Populate options
  if (treatmentSelect) {
    treatmentSelect.innerHTML = `
      <option value="">Select Procedure / Treatment...</option>
      ${AESTHETIC_DATA.treatments.map(t => `<option value="${t.title}">${t.title} (${t.price})</option>`).join('')}
    `;
  }

  if (doctorSelect) {
    doctorSelect.innerHTML = `
      <option value="">Select Specialist (Optional)...</option>
      ${AESTHETIC_DATA.doctors.map(d => `<option value="${d.name}">${d.name} — ${d.role}</option>`).join('')}
    `;
  }

  document.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('.ae-open-booking-btn');
    if (bookBtn) {
      const treatmentName = bookBtn.dataset.treatment;
      if (treatmentSelect && treatmentName) {
        treatmentSelect.value = treatmentName;
      }
      appointmentModal?.classList.add('is-open');
    }
  });

  appointmentModalClose?.addEventListener('click', () => {
    appointmentModal?.classList.remove('is-open');
  });

  appointmentModal?.addEventListener('click', (e) => {
    if (e.target === appointmentModal) {
      appointmentModal.classList.remove('is-open');
    }
  });

  appointmentForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(appointmentForm);
    const bookingDetails = {
      id: 'AES-' + Math.floor(10000 + Math.random() * 90000),
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email'),
      phone: formData.get('phone'),
      treatment: formData.get('treatment') || 'Consultation',
      doctor: formData.get('doctor') || 'First Available Specialist',
      date: formData.get('date'),
      time: formData.get('time') || 'Morning (10:00 AM)',
      notes: formData.get('notes'),
      createdAt: new Date().toISOString()
    };

    const bookings = JSON.parse(localStorage.getItem('aesthetic_bookings')) || [];
    bookings.push(bookingDetails);
    localStorage.setItem('aesthetic_bookings', JSON.stringify(bookings));

    appointmentModal?.classList.remove('is-open');
    appointmentForm.reset();

    showToast(`Appointment Scheduled! Ref #${bookingDetails.id}`, 'fa-calendar-check');
  });

  // Inline Clinic Contact Form
  $('#clinicContactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Consultation request sent! We will contact you within 2 business hours.', 'fa-paper-plane');
    e.target.reset();
  });

  /* ==========================================================================
     9. Testimonials Slider
     ========================================================================== */
  const testimonialText = $('#testimonialText');
  const testimonialName = $('#testimonialName');
  const testimonialRole = $('#testimonialRole');
  const testimonialAvatar = $('#testimonialAvatar');
  const testimonialPrev = $('#testimonialPrev');
  const testimonialNext = $('#testimonialNext');

  const updateTestimonial = (index) => {
    const item = AESTHETIC_DATA.testimonials[index];
    if (!item) return;
    if (testimonialText) testimonialText.textContent = `“${item.quote}”`;
    if (testimonialName) testimonialName.textContent = item.name;
    if (testimonialRole) testimonialRole.textContent = item.role;
    if (testimonialAvatar) testimonialAvatar.src = item.avatar;
    state.testimonialIndex = index;
  };

  testimonialNext?.addEventListener('click', () => {
    const nextIdx = (state.testimonialIndex + 1) % AESTHETIC_DATA.testimonials.length;
    updateTestimonial(nextIdx);
  });

  testimonialPrev?.addEventListener('click', () => {
    const prevIdx = (state.testimonialIndex - 1 + AESTHETIC_DATA.testimonials.length) % AESTHETIC_DATA.testimonials.length;
    updateTestimonial(prevIdx);
  });

  /* ==========================================================================
     10. Frequently Asked Questions Accordion
     ========================================================================== */
  const accordionContainer = $('#faqAccordion');
  if (accordionContainer) {
    accordionContainer.innerHTML = AESTHETIC_DATA.faqs.map((faq, idx) => `
      <div class="ae-accordion-item ${idx === 0 ? 'is-open' : ''}">
        <button class="ae-accordion-header" type="button">
          <span>${faq.question}</span>
          <span class="ae-accordion-icon"><i class="fas fa-plus"></i></span>
        </button>
        <div class="ae-accordion-content" style="${idx === 0 ? 'max-height: 200px;' : ''}">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join('');

    $$('.ae-accordion-header', accordionContainer).forEach(headerBtn => {
      headerBtn.addEventListener('click', () => {
        const item = headerBtn.closest('.ae-accordion-item');
        const content = item.querySelector('.ae-accordion-content');
        const isOpen = item.classList.contains('is-open');

        // Close other items
        $$('.ae-accordion-item', accordionContainer).forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            const otherContent = otherItem.querySelector('.ae-accordion-content');
            if (otherContent) otherContent.style.maxHeight = '0';
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          content.style.maxHeight = '0';
        } else {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  /* ==========================================================================
     11. Live Search Modal
     ========================================================================== */
  const searchModal = $('#searchModal');
  const searchModalClose = $('#searchModalClose');
  const searchInput = $('#searchInput');
  const searchResults = $('#searchResults');
  const searchToggleBtns = $$('.ae-search-toggle-btn');

  searchToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal?.classList.add('is-open');
      setTimeout(() => searchInput?.focus(), 150);
    });
  });

  searchModalClose?.addEventListener('click', () => {
    searchModal?.classList.remove('is-open');
  });

  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('is-open');
    }
  });

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!searchResults) return;

    if (q.length < 2) {
      searchResults.innerHTML = `<div style="text-align: center; color: var(--ae-text-muted); padding: 30px;">Type at least 2 characters to search treatments and skincare essentials...</div>`;
      return;
    }

    const matchedTreatments = AESTHETIC_DATA.treatments.filter(t =>
      t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );

    const matchedProducts = AESTHETIC_DATA.products.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    if (matchedTreatments.length === 0 && matchedProducts.length === 0) {
      searchResults.innerHTML = `<div style="text-align: center; color: var(--ae-text-muted); padding: 30px;">No treatments or products found matching "<strong>${q}</strong>".</div>`;
      return;
    }

    let html = '';
    if (matchedTreatments.length > 0) {
      html += `<div style="font-size: 0.8125rem; font-weight: 700; color: var(--ae-primary); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1.5px;">Treatments (${matchedTreatments.length})</div>`;
      html += matchedTreatments.map(t => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: var(--ae-radius-sm); border: 1px solid var(--ae-border); margin-bottom: 8px;">
          <div>
            <div style="font-weight: 500;">${t.title}</div>
            <div style="font-size: 0.8125rem; color: var(--ae-text-muted);">${t.category} | ${t.duration}</div>
          </div>
          <button class="ae-btn ae-btn-primary ae-open-booking-btn" data-treatment="${t.title}" style="padding: 6px 14px; font-size: 0.75rem;">
            Book
          </button>
        </div>
      `).join('');
    }

    if (matchedProducts.length > 0) {
      html += `<div style="font-size: 0.8125rem; font-weight: 700; color: var(--ae-primary); text-transform: uppercase; margin: 20px 0 12px; letter-spacing: 1.5px;">Products (${matchedProducts.length})</div>`;
      html += matchedProducts.map(p => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: var(--ae-radius-sm); border: 1px solid var(--ae-border); margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${p.image}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;">
            <div>
              <div style="font-weight: 500;">${p.name}</div>
              <div style="font-size: 0.8125rem; color: var(--ae-primary); font-weight: 600;">$${p.price.toFixed(2)}</div>
            </div>
          </div>
          <button class="ae-btn ae-btn-secondary ae-add-to-cart-btn" data-id="${p.id}" style="padding: 6px 14px; font-size: 0.75rem;">
            Add to Bag
          </button>
        </div>
      `).join('');
    }

    searchResults.innerHTML = html;
  });

  // Newsletter Subscription Form
  $('#newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletterEmail')?.value;
    if (email) {
      showToast('Thank you for subscribing to our wellness circle!', 'fa-envelope-open');
      e.target.reset();
    }
  });

  // WhatsApp quick trigger
  $('#whatsappTrigger')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(`https://wa.me/18005552345?text=Hello%20Aesthetic%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20consultation`, '_blank');
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $$('.ae-modal-backdrop.is-open').forEach(m => m.classList.remove('is-open'));
      cartDrawer?.classList.remove('is-open');
      mobileDrawer?.classList.remove('is-open');
    }
  });

  // Quick View Close
  $('#quickViewClose')?.addEventListener('click', () => {
    quickViewModal?.classList.remove('is-open');
  });

  quickViewModal?.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
      quickViewModal.classList.remove('is-open');
    }
  });

  console.log('Aesthetic Clinic Application Initialized Successfully.');
});

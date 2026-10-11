/**
 * Toptan Pelet Soba - Endüstriyel & Mimari Pelet Isıtma Sistemleri
 * Genel Sayfa Etkileşim ve Fonksiyon Dosyası
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCalculator();
  initFaqAccordion();
  initContactForms();
  initGalleryModal();
  initSwipeGalleries();
});

/* ==========================================================================
   1. MOBİL MENÜ TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navMenu.style.display === 'flex';
    navMenu.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.backgroundColor = '#ffffff';
      navMenu.style.padding = '20px';
      navMenu.style.borderBottom = '1px solid #e2e8f0';
      navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
    }
  });
}

/* ==========================================================================
   2. YAKIT & MALİYET TASARRUFU HESAPLAYICI
   ========================================================================== */
function initCalculator() {
  const hoursSlider = document.getElementById('calcHours');
  const unitsSlider = document.getElementById('calcUnits');

  if (!hoursSlider || !unitsSlider) return;

  const hoursDisplay = document.getElementById('calcHoursVal');
  const unitsDisplay = document.getElementById('calcUnitsVal');
  const costLpgEl = document.getElementById('costLpg');
  const costElecEl = document.getElementById('costElec');
  const costPelletEl = document.getElementById('costPellet');
  const savingsMonthlyEl = document.getElementById('savingsMonthly');

  // Ortalama Saatlik Tüketim Maliyetleri (TL)
  // 12kg LPG Tüp: ~600 TL -> 0.7 kg/s x 50 TL/kg = 35.00 TL/saat
  // Endüstriyel Radyant Elektrik: 3.0 kW x 8.50 TL/kWh = 25.50 TL/saat
  // Toptan Pelet Soba Pelet Soba: 1.1 kg pelet/saat x 11.50 TL/kg = 12.65 TL/saat
  const LPG_HOURLY = 35.00;
  const ELEC_HOURLY = 25.50;
  const PELLET_HOURLY = 5.60;
  const DAYS = 30;

  function update() {
    const hours = parseInt(hoursSlider.value, 10);
    const units = parseInt(unitsSlider.value, 10);

    if (hoursDisplay) hoursDisplay.textContent = `${hours} Saat / Gün`;
    if (unitsDisplay) unitsDisplay.textContent = `${units} Adet Cihaz`;

    const monthlyLpg = Math.round(hours * units * LPG_HOURLY * DAYS);
    const monthlyElec = Math.round(hours * units * ELEC_HOURLY * DAYS);
    const monthlyPellet = Math.round(hours * units * PELLET_HOURLY * DAYS);

    const savings = monthlyLpg - monthlyPellet;

    if (costLpgEl) costLpgEl.textContent = `${monthlyLpg.toLocaleString('tr-TR')} TL`;
    if (costElecEl) costElecEl.textContent = `${monthlyElec.toLocaleString('tr-TR')} TL`;
    if (costPelletEl) costPelletEl.textContent = `${monthlyPellet.toLocaleString('tr-TR')} TL`;
    if (savingsMonthlyEl) savingsMonthlyEl.textContent = `${savings.toLocaleString('tr-TR')} TL`;
  }

  hoursSlider.addEventListener('input', update);
  unitsSlider.addEventListener('input', update);
  update();
}

/* ==========================================================================
   3. SSS (FAQ) AKORDİYON
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item-header');
  if (!faqItems.length) return;

  faqItems.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.faq-card');
      const body = parent.querySelector('.faq-item-body');
      const isOpen = parent.classList.contains('active');

      document.querySelectorAll('.faq-card.active').forEach(item => {
        item.classList.remove('active');
        const b = item.querySelector('.faq-item-body');
        if (b) b.style.display = 'none';
      });

      if (!isOpen) {
        parent.classList.add('active');
        if (body) body.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   4. CANLI FORMLAR (İLETİŞİM & TEKLİF & WHATSAPP)
   ========================================================================== */
function initContactForms() {
  const forms = document.querySelectorAll('.action-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('[name="name"]') || form.querySelector('#formName');
      const phoneInput = form.querySelector('[name="phone"]') || form.querySelector('#formPhone');
      const noteInput = form.querySelector('[name="note"]') || form.querySelector('#formNote');

      const name = nameInput ? nameInput.value.trim() : 'Müşteri';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const note = noteInput ? noteInput.value.trim() : '';

      let text = `Merhaba Toptan Pelet Soba,%0A%0A`;
      text += `*Web Siteniz Üzerinden Teklif Talebi:*%0A`;
      text += `👤 İsim: ${encodeURIComponent(name)}%0A`;
      text += `📞 Telefon: ${encodeURIComponent(phone)}%0A`;
      if (note) text += `📝 Not / İlgi Alanı: ${encodeURIComponent(note)}%0A`;

      window.open(`https://wa.me/905321234567?text=${text}`, '_blank');
      alert('Talebiniz hazırlandı, WhatsApp üzerinden doğrudan fabrika satış birimine aktarılıyorsunuz.');
      form.reset();
    });
  });
}

/* ==========================================================================
   5. RESİM BÜYÜTME / GALERİ MODALI
   ========================================================================== */
function initGalleryModal() {
  const thumbnails = document.querySelectorAll('.zoomable-img');
  if (!thumbnails.length) return;

  const modal = document.createElement('div');
  modal.className = 'image-zoom-overlay';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(15, 23, 42, 0.92); z-index: 10000; display: none;
    align-items: center; justify-content: center; cursor: zoom-out;
  `;
  const fullImg = document.createElement('img');
  fullImg.style.cssText = `max-width: 90%; max-height: 85vh; border-radius: 8px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);`;
  modal.appendChild(fullImg);
  document.body.appendChild(modal);

  thumbnails.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      fullImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

/* ==========================================================================
   6. SWIPE GALLERY OKLARI (YANA KAYDIRMA)
   ========================================================================== */
function initSwipeGalleries() {
  const galleries = document.querySelectorAll('.swipe-gallery');
  galleries.forEach(gallery => {
    // Fotoğrafların yukarı-aşağı kaymasını sıfırla
    gallery.scrollTop = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'swipe-gallery-wrapper';
    wrapper.style.position = 'relative';
    wrapper.style.borderRadius = gallery.style.borderRadius || '0';
    wrapper.style.overflow = 'hidden';
    
    gallery.parentNode.insertBefore(wrapper, gallery);
    wrapper.appendChild(gallery);

    const leftBtn = document.createElement('button');
    leftBtn.setAttribute('aria-label', 'Önceki fotoğraf');
    leftBtn.innerHTML = '&#10094;';
    leftBtn.style.cssText = 'position:absolute; top:50%; left:8px; transform:translateY(-50%); width:32px; height:32px; background:rgba(0,0,0,0.6); color:#fff; border:none; border-radius:50%; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10; transition:background 0.3s; padding-right:3px; outline:none;';
    leftBtn.onclick = (e) => { e.preventDefault(); gallery.scrollBy({ left: -gallery.offsetWidth, behavior: 'smooth' }); };
    
    const rightBtn = document.createElement('button');
    rightBtn.setAttribute('aria-label', 'Sonraki fotoğraf');
    rightBtn.innerHTML = '&#10095;';
    rightBtn.style.cssText = 'position:absolute; top:50%; right:8px; transform:translateY(-50%); width:32px; height:32px; background:rgba(0,0,0,0.6); color:#fff; border:none; border-radius:50%; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10; transition:background 0.3s; padding-left:3px; outline:none;';
    rightBtn.onclick = (e) => { e.preventDefault(); gallery.scrollBy({ left: gallery.offsetWidth, behavior: 'smooth' }); };

    [leftBtn, rightBtn].forEach(btn => {
      btn.onmouseenter = () => btn.style.background = 'rgba(0,0,0,0.9)';
      btn.onmouseleave = () => btn.style.background = 'rgba(0,0,0,0.6)';
    });

    wrapper.appendChild(leftBtn);
    wrapper.appendChild(rightBtn);

    // Slide / Nokta (Dots) İndikatörleri
    const slides = gallery.querySelectorAll(':scope > div');
    let dots = [];
    if (slides.length > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.style.cssText = 'position:absolute; bottom:8px; left:50%; transform:translateX(-50%); display:flex; gap:6px; z-index:10; pointer-events:auto;';
      
      slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.style.cssText = 'width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.5); cursor:pointer; transition:all 0.25s; box-shadow:0 1px 3px rgba(0,0,0,0.5); display:inline-block;';
        if (idx === 0) {
          dot.style.background = '#ffffff';
          dot.style.transform = 'scale(1.25)';
        }
        dot.onclick = (e) => {
          e.preventDefault();
          gallery.scrollTo({ left: idx * gallery.offsetWidth, behavior: 'smooth' });
        };
        dots.push(dot);
        dotsContainer.appendChild(dot);
      });
      wrapper.appendChild(dotsContainer);

      gallery.addEventListener('scroll', () => {
        // Her zaman dikey kaymayı 0'da tut (fotoğraflar yukarı-aşağı oynamasın)
        if (gallery.scrollTop !== 0) gallery.scrollTop = 0;
        
        const activeIdx = Math.round(gallery.scrollLeft / gallery.offsetWidth);
        dots.forEach((dot, idx) => {
          if (idx === activeIdx) {
            dot.style.background = '#ffffff';
            dot.style.transform = 'scale(1.25)';
          } else {
            dot.style.background = 'rgba(255,255,255,0.5)';
            dot.style.transform = 'scale(1)';
          }
        });
      }, { passive: true });
    }

    // Mobil Dokunma (Touch / Swipe) Yönetimi:
    // Dikey harekette (aşağı/yukarı) sayfa kaysın, fotoğraflar kesinlikle yukarı/aşağı oynamasın.
    // Yalnızca yatay harekette (sağa/sola) yandaki fotoğraflara kaysın.
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Yatay hareket dikey hareketten belirgin biçimde büyükse yana kaydır
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Sola sürükleme -> sonraki fotoğraf
          gallery.scrollBy({ left: gallery.offsetWidth, behavior: 'smooth' });
        } else {
          // Sağa sürükleme -> önceki fotoğraf
          gallery.scrollBy({ left: -gallery.offsetWidth, behavior: 'smooth' });
        }
      }
    }, { passive: true });
  });
}


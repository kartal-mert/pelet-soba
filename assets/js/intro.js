/**
 * PELET FÜZE SOBA - Intro Animasyon Kontrol Dosyası
 * Pelet soba yakma hikayesi animasyonu (~3.5 saniye)
 */

(function () {
  'use strict';

  // Intro toplam süresi (ms) - kısa SEO-uyumlu versiyon
  const INTRO_TOTAL_DURATION = 4200;

  // Adımlar ve zamanlamaları (ms)
  const STEPS = [
    { time: 0, label: 'Pelet Soba' },
    { time: 650, label: 'Pelet Doldurma' },
    { time: 1800, label: 'Ateşleme' },
    { time: 2750, label: 'Hazır!' }
  ];

  // Session kontrolü
  const INTRO_KEY = 'Toptan Pelet Soba_intro_seen';

  function shouldShowIntro() {
    return !sessionStorage.getItem(INTRO_KEY);
  }

  function markIntroSeen() {
    sessionStorage.setItem(INTRO_KEY, 'true');
  }

  function createIntroOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'intro-overlay';

    overlay.innerHTML = `
      <!-- Step İndikatörleri -->
      <div class="intro-steps">
        <div class="intro-step-dot active" data-step="0"></div>
        <div class="intro-step-dot" data-step="1"></div>
        <div class="intro-step-dot" data-step="2"></div>
        <div class="intro-step-dot" data-step="3"></div>
      </div>

      <!-- Adım Etiketi -->
      <div class="intro-step-label visible">Pelet Soba</div>

      <!-- Ana Sahne -->
      <div class="intro-stage">
        <!-- Arka plan ışıma -->
        <div class="intro-glow"></div>

        <!-- Yanmayan Soba -->
        <img src="assets/images/toptan-pelet-soba-imalat.webp" alt="Pelet Soba" class="intro-soba-off">

        <!-- Elli Kürek (sağdan gelir) -->
        <img src="assets/images/pelet-soba-toptan-urun.webp" alt="Pelet Küreği" class="intro-kurek">

        <!-- Pürmüz (sağdan gelir) -->
        <img src="assets/images/pelet-soba-ithalat-ihracat.webp" alt="Pürmüz" class="intro-purmuz">

        <!-- Yanan Soba -->
        <img src="assets/images/profesyonel-pelet-soba.webp" alt="Yanan Pelet Soba" class="intro-soba-on">

        <!-- Ateş Parçacıkları -->
        <div class="intro-particles">
          <div class="intro-particle"></div>
          <div class="intro-particle"></div>
          <div class="intro-particle"></div>
          <div class="intro-particle"></div>
          <div class="intro-particle"></div>
          <div class="intro-particle"></div>
        </div>
      </div>

      <!-- Marka -->
      <div class="intro-brand">
        <h2>Pelet Füze Soba</h2>
        <p>Doğal Ateşin Gücü</p>
      </div>

      <!-- Atlama Butonu -->
      <button class="intro-skip" onclick="skipIntro()">Atla →</button>

      <!-- İlerleme Çubuğu -->
      <div class="intro-progress"></div>
    `;

    return overlay;
  }

  function activateStep(stepIndex) {
    const dots = document.querySelectorAll('.intro-step-dot');
    const label = document.querySelector('.intro-step-label');

    dots.forEach((dot, i) => {
      if (i <= stepIndex) {
        dot.classList.add('active');
      }
    });

    if (label && STEPS[stepIndex]) {
      label.classList.remove('visible');
      setTimeout(() => {
        label.textContent = STEPS[stepIndex].label;
        label.classList.add('visible');
      }, 100);
    }
  }

  function endIntro() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    if (overlay.classList.contains('fade-out')) return;

    overlay.classList.add('fade-out');
    document.body.classList.remove('intro-active');
    document.body.classList.add('intro-done');
    markIntroSeen();

    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove('intro-done');
    }, 700);
  }

  window.skipIntro = function () {
    endIntro();
  };

  function initIntro() {
    if (!shouldShowIntro()) return;

    document.body.classList.add('intro-active');

    const overlay = createIntroOverlay();
    document.body.prepend(overlay);

    // Adım zamanlamalarını başlat
    STEPS.forEach((step, index) => {
      if (index > 0) {
        setTimeout(() => activateStep(index), step.time);
      }
    });

    // Intro'yu sonlandır
    setTimeout(endIntro, INTRO_TOTAL_DURATION);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
  } else {
    initIntro();
  }
})();


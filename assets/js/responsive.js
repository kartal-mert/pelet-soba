/**
 * RESPONSIVE MOBILE MENU - Gelişmiş Mobil Menü Yönetimi
 * Mevcut main.js'teki basit mobil menüyü override eder.
 * Dropdown açma/kapama, dışarı tıklama ile kapatma, body scroll kilidi.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!toggleBtn || !navMenu) return;

    let isMenuOpen = false;

    // Hamburger ikonunu X'e çevir veya geri al
    function updateToggleIcon(open) {
      if (open) {
        toggleBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      } else {
        toggleBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      }
    }

    function openMenu() {
      isMenuOpen = true;
      navMenu.classList.add('mobile-open');
      // Inline style'ları temizle (main.js'in eklediği)
      navMenu.style.removeProperty('display');
      navMenu.style.removeProperty('flex-direction');
      navMenu.style.removeProperty('position');
      navMenu.style.removeProperty('top');
      navMenu.style.removeProperty('left');
      navMenu.style.removeProperty('width');
      navMenu.style.removeProperty('background-color');
      navMenu.style.removeProperty('padding');
      navMenu.style.removeProperty('border-bottom');
      navMenu.style.removeProperty('box-shadow');
      updateToggleIcon(true);
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isMenuOpen = false;
      navMenu.classList.remove('mobile-open');
      navMenu.style.removeProperty('display');
      navMenu.style.removeProperty('flex-direction');
      navMenu.style.removeProperty('position');
      navMenu.style.removeProperty('top');
      navMenu.style.removeProperty('left');
      navMenu.style.removeProperty('width');
      navMenu.style.removeProperty('background-color');
      navMenu.style.removeProperty('padding');
      navMenu.style.removeProperty('border-bottom');
      navMenu.style.removeProperty('box-shadow');
      updateToggleIcon(false);
      document.body.style.overflow = '';
      // Tüm dropdown'ları kapat
      document.querySelectorAll('.nav-item.dropdown-open').forEach(function (item) {
        item.classList.remove('dropdown-open');
      });
    }

    // Toggle menü butonu
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Dropdown menüler - mobilde tıklama ile aç/kapa
    var dropdownParents = navMenu.querySelectorAll('.nav-item');
    dropdownParents.forEach(function (item) {
      var dropdownMenu = item.querySelector('.dropdown-menu');
      var link = item.querySelector('.nav-link');

      if (!dropdownMenu || !link) return;

      link.addEventListener('click', function (e) {
        // Sadece mobil görünümde (768px altı) dropdown toggle yap
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          var isOpen = item.classList.contains('dropdown-open');

          // Diğer tüm dropdown'ları kapat
          document.querySelectorAll('.nav-item.dropdown-open').forEach(function (otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('dropdown-open');
            }
          });

          if (isOpen) {
            item.classList.remove('dropdown-open');
          } else {
            item.classList.add('dropdown-open');
          }
        }
      });
    });

    // Sayfanın geri kalanına tıklayınca menüyü kapat
    document.addEventListener('click', function (e) {
      if (isMenuOpen && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // ESC tuşu ile kapatma
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });

    // Pencere boyutu değişirse menüyü resetle
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    });
  });
})();

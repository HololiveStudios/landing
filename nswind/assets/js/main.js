/**
 * NS Wind - Core Interactive Script
 * Clean, lightweight, modular script without dead code or heavy dependencies.
 */
(() => {
  'use strict';

  // 1. Interação cruzada contínua entre Badges, Estados/Países, Pins SVG e Leitura ao Vivo
  const geoRegionsData = {
    PI: {
      code: 'PI',
      title: 'Piauí (Sede & Laboratório)',
      tag: 'Presença Nacional · Brasil',
      desc: 'Base operacional em Parnaíba-PI com laboratório central de bancada e atendimento direto aos parques do estado.'
    },
    CE: {
      code: 'CE',
      title: 'Ceará',
      tag: 'Presença Nacional · Brasil',
      desc: 'Cobertura consolidada para complexos eólicos, usinas fotovoltaicas e plantas industriais no litoral e interior.'
    },
    RN: {
      code: 'RN',
      title: 'Rio Grande do Norte',
      tag: 'Presença Nacional · Brasil',
      desc: 'Atendimento técnico prioritário e recuperação laboratorial de módulos críticos para os polos eólicos potiguares.'
    },
    PB: {
      code: 'PB',
      title: 'Paraíba',
      tag: 'Presença Nacional · Brasil',
      desc: 'Suporte laboratorial especializado para reparo de placas, conversores e controladoras em parques da região.'
    },
    BA: {
      code: 'BA',
      title: 'Bahia',
      tag: 'Presença Nacional · Brasil',
      desc: 'Cobertura direta para os grandes complexos eólicos e solares em operação no interior baiano.'
    },
    MG: {
      code: 'MG',
      title: 'Minas Gerais',
      tag: 'Presença Nacional · Brasil',
      desc: 'Reparo de bancada e engenharia reversa para usinas solares, geração distribuída e plantas industriais.'
    },
    RS: {
      code: 'RS',
      title: 'Rio Grande do Sul',
      tag: 'Presença Nacional · Brasil',
      desc: 'Atendimento nacional dedicado aos parques eólicos e ativos de geração no extremo sul do país.'
    },
    CHL: {
      code: 'CL',
      title: 'Chile · 2 Regiões/Sites',
      tag: 'Operação Internacional · LATAM',
      desc: 'Recebimento e reparo em laboratório para equipamentos enviados diretamente de 2 regiões/sites estratégicos no Chile.'
    },
    ARG: {
      code: 'AR',
      title: 'Argentina · 2 Regiões/Sites',
      tag: 'Operação Internacional · LATAM',
      desc: 'Recebimento e reparo em laboratório para equipamentos enviados diretamente de 2 regiões/sites estratégicos na Argentina.'
    }
  };

  const activeCodeEl = document.getElementById('geo-active-code');
  const activeTitleEl = document.getElementById('geo-active-title');
  const activeTagEl = document.getElementById('geo-active-tag');
  const activeDescEl = document.getElementById('geo-active-desc');
  let selectedRegionKey = 'PI';

  function updateGeoReadout(key) {
    const info = geoRegionsData[key];
    if (!info) return;
    if (activeCodeEl) activeCodeEl.textContent = info.code;
    if (activeTitleEl) activeTitleEl.textContent = info.title;
    if (activeTagEl) activeTagEl.textContent = info.tag;
    if (activeDescEl) activeDescEl.textContent = info.desc;
  }

  function clearAllGeoHighlights() {
    document.querySelectorAll('.is-highlighted').forEach(el => el.classList.remove('is-highlighted'));
  }

  function applyRegionHighlight(key) {
    clearAllGeoHighlights();
    if (!key) return;
    if (key === 'CHL' || key === 'ARG') {
      const countryPath = document.getElementById('country-' + key);
      const item = document.querySelector(`[data-target-country="${key}"]`);
      const pins = document.querySelectorAll(`[data-pin-country="${key}"]`);
      if (countryPath) countryPath.classList.add('is-highlighted');
      if (item) item.classList.add('is-highlighted');
      pins.forEach(pin => pin.classList.add('is-highlighted'));
    } else {
      const statePath = document.getElementById('state-' + key);
      const badge = document.querySelector(`[data-target-state="${key}"]`);
      const pins = document.querySelectorAll(`[data-pin-state="${key}"]`);
      if (statePath) statePath.classList.add('is-highlighted');
      if (badge) badge.classList.add('is-highlighted');
      pins.forEach(pin => pin.classList.add('is-highlighted'));
    }
    updateGeoReadout(key);
  }

  document.querySelectorAll('[data-target-state]').forEach(badge => {
    const uf = badge.getAttribute('data-target-state');
    const statePath = document.getElementById('state-' + uf);
    const pins = document.querySelectorAll(`[data-pin-state="${uf}"]`);
    [badge, statePath, ...pins].forEach(el => {
      if (!el) return;
      el.addEventListener('mouseenter', () => applyRegionHighlight(uf));
      el.addEventListener('mouseleave', () => applyRegionHighlight(selectedRegionKey));
      el.addEventListener('click', () => {
        selectedRegionKey = uf;
        applyRegionHighlight(uf);
      });
    });
  });

  document.querySelectorAll('[data-target-country]').forEach(item => {
    const code = item.getAttribute('data-target-country');
    const countryPath = document.getElementById('country-' + code);
    const pins = document.querySelectorAll(`[data-pin-country="${code}"]`);
    [item, countryPath, ...pins].forEach(el => {
      if (!el) return;
      el.addEventListener('mouseenter', () => applyRegionHighlight(code));
      el.addEventListener('mouseleave', () => applyRegionHighlight(selectedRegionKey));
      el.addEventListener('click', () => {
        selectedRegionKey = code;
        applyRegionHighlight(code);
      });
    });
  });

  applyRegionHighlight(selectedRegionKey);

  // 2. Mobile Navigation Drawer / Sheet
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const navBackdrop = document.getElementById('nav-backdrop');

  function closeMobileNav() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    primaryNav.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-open');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileNav();
      } else {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
        primaryNav.classList.add('is-open');
        if (navBackdrop) navBackdrop.classList.add('is-open');
      }
    });
    primaryNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));
    if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });
  }

  // 3. Scroll Reveal Animation
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.reveal, .equip-card');

  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 90px 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Scroll Progress Bar
  const progressLine = document.querySelector('.progress-line');
  if (progressLine) {
    let ticking = false;
    let cachedMaxScroll = 0;

    function measureScroll() {
      cachedMaxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
    }

    function updateScroll() {
      if (cachedMaxScroll <= 0) measureScroll();
      const progress = cachedMaxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / cachedMaxScroll)) : 0;
      progressLine.style.transform = `scaleX(${progress.toFixed(4)})`;
      ticking = false;
    }

    window.addEventListener('resize', () => { cachedMaxScroll = 0; }, { passive: true });
    window.addEventListener('load', measureScroll, { passive: true });
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // 5. Image Fallback Handling
  document.querySelectorAll('main img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.visibility = 'hidden';
    });
  });
})();

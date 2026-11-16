/* ==========================================================================
   NS Engenharia & Energia — comportamentos da página
   JavaScript puro, sem bibliotecas.

   O que cada função faz
   - initReveal    elementos com data-reveal aparecem ao entrar na tela
   - initNav       menu muda de aparência ao rolar e abre/fecha submenus
   - initCounters  números da seção "trajetória" contam até o valor final
   - initRails     carrosséis: arrastar com o mouse, setas e barra de progresso
   - initQuotes    destaca o depoimento mais à esquerda
   - initForm      valida o formulário de contato
   ========================================================================== */

const $  = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = matchMedia('(max-width: 767px)').matches;
const canObserve = 'IntersectionObserver' in window;

// Liga as animações de entrada já no começo, para o conteúdo não "piscar".
// Sem esta classe (ou sem JavaScript) tudo aparece normalmente.
if (canObserve && !prefersReducedMotion) {
  document.documentElement.classList.add('js-reveal');
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNav();
  initCounters();
  initRails();
  initQuotes();
  initForm();
});


/* --------------------------------------------------------------------------
   Aparecer ao rolar
   -------------------------------------------------------------------------- */
function initReveal() {
  if (!document.documentElement.classList.contains('js-reveal')) return;

  // data-stagger="110" no elemento pai: cada filho espera 110 ms a mais que o anterior
  if (!isMobile) {
    $$('[data-stagger]').forEach((parent) => {
      const step = Number(parent.dataset.stagger) || 80;
      $$('[data-reveal]', parent).forEach((el, index) => {
        el.style.transitionDelay = `${index * step}ms`;
      });
    });

    // data-reveal-delay="600" define um atraso fixo
    $$('[data-reveal-delay]').forEach((el) => {
      el.style.transitionDelay = `${el.dataset.revealDelay}ms`;
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.02 });

  $$('[data-reveal]').forEach((el) => observer.observe(el));
}


/* --------------------------------------------------------------------------
   Menu
   -------------------------------------------------------------------------- */
function initNav() {
  const nav = $('.nav');
  const toggle = $('.nav__toggle', nav);
  const subMenus = $$('.has-sub', nav);

  // 1. No topo da página o menu é maior e transparente
  const markTop = () => { nav.dataset.atTop = window.scrollY < 12; };
  window.addEventListener('scroll', markTop, { passive: true });
  markTop();

  // 2. O menu fica claro ou escuro conforme a seção que está logo abaixo dele.
  //    Cada seção declara o seu tom com data-tone="dark" ou data-tone="light".
  //    O observador olha uma faixa de 1px, na altura do menu.
  if (canObserve) {
    const line = 36;
    const toneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) nav.dataset.tone = entry.target.dataset.tone;
      });
    }, { rootMargin: `-${line}px 0px -${innerHeight - line - 1}px 0px` });

    $$('[data-tone]').filter((el) => !nav.contains(el)).forEach((el) => toneObserver.observe(el));
  }

  // 3. Submenus (Escopo de Projetos, Diferenciais)
  const setSubMenu = (item, open) => {
    item.classList.toggle('is-open', open);
    $('button', item).setAttribute('aria-expanded', open);
  };
  const closeSubMenus = () => subMenus.forEach((item) => setSubMenu(item, false));

  subMenus.forEach((item) => {
    $('button', item).addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      closeSubMenus();
      setSubMenu(item, willOpen);
    });
  });

  // 4. Menu do celular (botão hambúrguer)
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (!open) closeSubMenus();
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));

  // 5. Fechar ao clicar num link, clicar fora ou apertar Esc
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
  matchMedia('(min-width: 1025px)').addEventListener('change', () => setMenu(false));
}


/* --------------------------------------------------------------------------
   Contadores (+5 MW, +4 especialistas, +100 kVA)
   O valor final fica escrito no HTML em data-count-to.
   -------------------------------------------------------------------------- */
function initCounters() {
  if (!canObserve) return;

  const countUp = (el) => {
    const target = parseFloat(el.dataset.countTo);
    const decimals = (String(target).split('.')[1] || '').length;

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);   // desacelera no final
      el.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  $$('[data-count-to]').forEach((el) => {
    el.textContent = '0';
    observer.observe(el);
  });
}


/* --------------------------------------------------------------------------
   Carrosséis
   No HTML:  <div id="meu-carrossel" data-rail> ... </div>
   Opcional: data-rail-progress="meu-carrossel"   barra de progresso
             data-rail-prev="meu-carrossel"       botão anterior
             data-rail-next="meu-carrossel"       botão próximo
   -------------------------------------------------------------------------- */
function initRails() {
  $$('[data-rail]').forEach((rail) => {
    const id = rail.id;
    const bar  = id && $(`[data-rail-progress="${id}"] > *`);
    const prev = id && $(`[data-rail-prev="${id}"]`);
    const next = id && $(`[data-rail-next="${id}"]`);
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    // Um clique nas setas avança a largura de um cartão
    const cardWidth = () => {
      const first = rail.firstElementChild;
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 16;
      return first ? first.getBoundingClientRect().width + gap : 300;
    };

    // Atualiza a barra de progresso e desativa a seta que não tem pra onde ir
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = max > 0 ? rail.scrollLeft / max : 0;

      if (bar) {
        const visible = Math.max(0.12, rail.clientWidth / rail.scrollWidth);
        bar.style.setProperty('--scale', visible);
        bar.style.setProperty('--offset', ratio * (1 - visible) * 100);
      }
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max - 2;
    };

    if (prev) prev.addEventListener('click', () => rail.scrollBy({ left: -cardWidth(), behavior }));
    if (next) next.addEventListener('click', () => rail.scrollBy({ left: cardWidth(), behavior }));

    // Arrastar com o mouse (no toque a rolagem nativa já funciona)
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    rail.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse') return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
      rail.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 4) moved = true;
      rail.scrollLeft = startScroll - distance;
    });
    window.addEventListener('pointerup', () => {
      dragging = false;
      rail.classList.remove('is-dragging');
    });

    // Depois de arrastar, não deixa o clique abrir o link do cartão
    rail.addEventListener('click', (event) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }, true);

    rail.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);
    update();
  });
}


/* --------------------------------------------------------------------------
   Depoimentos: o cartão mais à esquerda ganha destaque
   -------------------------------------------------------------------------- */
function initQuotes() {
  const rail = $('#rail-quotes');
  if (!rail) return;

  const cards = [...rail.children];

  const highlight = () => {
    const left = rail.getBoundingClientRect().left + parseFloat(getComputedStyle(rail).paddingLeft);
    const closest = cards.reduce((best, card) => {
      const distance = Math.abs(card.getBoundingClientRect().left - left);
      return distance < best.distance ? { card, distance } : best;
    }, { card: null, distance: Infinity }).card;

    cards.forEach((card) => card.classList.toggle('is-active', card === closest));
  };

  rail.addEventListener('scroll', () => requestAnimationFrame(highlight), { passive: true });
  highlight();
}


/* --------------------------------------------------------------------------
   Formulário de contato: valida e prepara uma mensagem no aplicativo de e-mail.
   -------------------------------------------------------------------------- */
function initForm() {
  $$('form.form-card').forEach((form) => {
    const feedback = $('.form-feedback', form);
    const required = $$('[required]', form);

    required.forEach((field) => {
      field.addEventListener('input', () => field.classList.remove('is-invalid'));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Marca em vermelho o que está vazio ou inválido
      required.forEach((field) => {
        const ok = field.checkValidity() && field.value.trim() !== '';
        field.classList.toggle('is-invalid', !ok);
      });

      const firstInvalid = $('.is-invalid', form);
      feedback.hidden = false;
      feedback.classList.toggle('is-error', Boolean(firstInvalid));

      if (firstInvalid) {
        feedback.textContent = 'Preencha os campos obrigatórios para enviar.';
        firstInvalid.focus();
        return;
      }

      const data = new FormData(form);
      const subject = `Contato pelo site — ${data.get('servico')}`;
      const body = [
        `Nome: ${data.get('nome')}`,
        `Telefone: ${data.get('telefone')}`,
        `E-mail: ${data.get('email')}`,
        `Serviço: ${data.get('servico')}`,
        '',
        `Mensagem: ${data.get('mensagem') || '(não informada)'}`,
      ].join('\n');

      feedback.textContent = 'Seu aplicativo de e-mail será aberto com a mensagem pronta para envio.';
      window.location.href = `mailto:admin@nsengenharia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });
}

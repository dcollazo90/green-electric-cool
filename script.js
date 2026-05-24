/* ============================================================
   Green Electric Cool — script.js
   Language toggle · Mobile menu · Scroll animations · Form
   ============================================================ */

'use strict';

/* ── STATE ── */
let currentLang = 'en';

/* ── LANGUAGE SYSTEM ── */
function setLang(lang) {
  currentLang = lang;

  // Sync all lang toggle buttons (desktop + mobile)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
  });

  // Update every element that has data-en / data-es attributes
  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;

    const tag = el.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;        // handled separately
    if (tag === 'OPTION') { el.textContent = text; return; }  // handled in optgroup loop too
    if (tag === 'BUTTON' || tag === 'A') { el.textContent = text; return; }

    // Generic elements — allow innerHTML so <br> tags work
    el.innerHTML = text;
  });

  // <optgroup> labels (data-en-label / data-es-label)
  document.querySelectorAll('optgroup[data-en-label]').forEach(el => {
    const label = el.getAttribute('data-' + lang + '-label');
    if (label) el.label = label;
  });

  // Textarea placeholder
  const ta = document.getElementById('textarea-msg');
  if (ta) {
    const ph = ta.getAttribute('data-' + lang + '-placeholder');
    if (ph) ta.placeholder = ph;
  }

  // Submit button (may already be disabled/confirmed)
  const sb = document.getElementById('submit-btn');
  if (sb && !sb.disabled) {
    const label = sb.getAttribute('data-' + lang);
    if (label) sb.textContent = label;
  }

  // Update <html lang> for accessibility / SEO
  document.documentElement.lang = lang;
}

/* ── MOBILE MENU ── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}

// Close menu when any mobile nav link is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
});

/* ── SCROLL ANIMATIONS ── */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

/* ── CONTACT FORM ── */
function handleSubmit(btn) {
  const msg = currentLang === 'es'
    ? '✅ ¡Solicitud enviada! Te contactaremos pronto.'
    : '✅ Request Sent! We\'ll be in touch soon.';
  btn.textContent = msg;
  btn.style.background = 'var(--green-light)';
  btn.disabled = true;
}

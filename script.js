/* ── NAV SCROLL ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── HAMBURGER ────────────────────────────────────────── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});
function closeMobile() {
  ham.classList.remove('open');
  mob.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── INTERSECTION OBSERVER ────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

/* ── STAT COUNTERS ────────────────────────────────────── */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const suffixes = ['50+', '5', '20', '98'];
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      const idx = Array.from(statNumbers).indexOf(e.target);
      const raw = suffixes[idx] || String(target);
      const hasSuffix = raw.endsWith('+') || raw.endsWith('%');
      const suffix = hasSuffix ? raw.slice(-1) : '';
      animateCounter(e.target, target, suffix);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => statObserver.observe(el));

/* ── FORM SUBMIT ──────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const subject = encodeURIComponent('New message from Kaifer Tech website');
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoUrl = `mailto:kaifertech@gmail.com?subject=${subject}&body=${body}`;

  btn.textContent = 'Opening email…';
  btn.disabled = true;
  feedback.textContent = '';

  let emailClientOpened = false;
  const fallbackTimeout = setTimeout(() => {
    if (!emailClientOpened) {
      feedback.textContent = 'If your email client does not open, please email kaifertech@gmail.com directly.';
    }
  }, 1800);

  window.addEventListener('blur', () => {
    emailClientOpened = true;
    clearTimeout(fallbackTimeout);
  }, { once: true });

  window.location.href = mailtoUrl;

  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    if (!emailClientOpened) {
      feedback.textContent = 'If your email client does not open, please email kaifertech@gmail.com directly.';
    }
    form.reset();
  }, 1600);
}

/* ── CUSTOM CURSOR ────────────────────────────────────── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animCursor() {
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width = dot.style.height = '12px';
    ring.style.width = ring.style.height = '56px';
    ring.style.borderColor = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width = dot.style.height = '6px';
    ring.style.width = ring.style.height = '36px';
    ring.style.borderColor = 'rgba(0,245,196,0.5)';
  });
});

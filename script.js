// Casablanca — Cardiff
// Minimal interactivity: mobile nav toggle, footer year, scroll reveal, reservation form preview.

document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

const reserveForm = document.getElementById('reserveForm');
const formNote = document.getElementById('formNote');

if (reserveForm) {
  reserveForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(reserveForm);
    const name = data.get('name');
    const date = data.get('date');
    const time = data.get('time');

    // If you haven't set up a real endpoint yet (see YOUR_FORM_ID in index.html),
    // this just previews the request instead of sending it.
    if (reserveForm.action.includes('YOUR_FORM_ID')) {
      formNote.textContent = `Preview only: this form isn't connected yet. Requested ${date} at ${time} for ${name}. See the setup instructions to make this live.`;
      return;
    }

    formNote.textContent = 'Sending your request…';
    try {
      const response = await fetch(reserveForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        formNote.textContent = `Thanks, ${name}! Your request for ${date} at ${time} has been sent — we'll confirm by phone shortly.`;
        reserveForm.reset();
      } else {
        formNote.textContent = 'Something went wrong sending your request — please call us instead on 029 2047 2772.';
      }
    } catch (err) {
      formNote.textContent = 'Something went wrong sending your request — please call us instead on 029 2047 2772.';
    }
  });
}

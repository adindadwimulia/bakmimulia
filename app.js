/* ========================================
   BAKMI MULIA — App Logic
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initFilters();
  initSearch();
  loadLessons();
  loadDiscussions();
  initForm();
});

/* ----- Navbar scroll effect ----- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ----- Mobile hamburger ----- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ----- Filter tabs (materi page) ----- */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;
      const cards = document.querySelectorAll('.materi-card');

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          card.classList.add('animate-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----- Simple search ----- */
function initSearch() {
  const searchInput = document.querySelector('#search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.materi-card, .diskusi-item');

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

/* ----- Load lessons from JSON ----- */
async function loadLessons() {
  const container = document.querySelector('#materi-grid');
  if (!container) return;

  try {
    const res = await fetch('data/lessons.json');
    const lessons = await res.json();

    container.innerHTML = lessons.map(lesson => `
      <article class="materi-card" data-category="${lesson.category}">
        <div class="materi-thumb">
          <img src="${lesson.image}" alt="${lesson.title}" loading="lazy">
        </div>
        <div class="materi-body">
          <span class="materi-tag">${lesson.category} · ${lesson.level}</span>
          <h3>${lesson.title}</h3>
          <p>${lesson.description}</p>
          <div class="materi-meta">
            <span>⏱ ${lesson.duration}</span>
            <a href="materi-detail.html?id=${lesson.id}" class="gold-text">Mulai →</a>
          </div>
        </div>
      </article>
    `).join('');
  } catch (err) {
    console.error('Gagal load lessons:', err);
    container.innerHTML = '<p class="muted">Gagal memuat materi. Pastikan file data/lessons.json tersedia.</p>';
  }
}

/* ----- Load discussions from JSON ----- */
async function loadDiscussions() {
  const container = document.querySelector('#diskusi-list');
  if (!container) return;

  try {
    const res = await fetch('data/discussions.json');
    const discussions = await res.json();

    container.innerHTML = discussions.map(d => `
      <article class="diskusi-item">
        <div class="avatar">${d.avatar}</div>
        <div class="diskusi-content">
          <h3><a href="#">${d.title}</a></h3>
          <p>${d.excerpt}</p>
          <div class="diskusi-meta">
            <span>${d.author}</span>
            <span>${d.category}</span>
            <span>${d.time}</span>
          </div>
        </div>
        <div class="diskusi-stats">
          <span>${d.replies}</span>
          balasan
          <br>
          <span style="font-size:0.9rem;color:var(--text-muted)">${d.views} dilihat</span>
        </div>
      </article>
    `).join('');
  } catch (err) {
    console.error('Gagal load discussions:', err);
    container.innerHTML = '<p class="muted">Gagal memuat diskusi.</p>';
  }
}

/* ----- Simple form handler (diskusi baru) ----- */
function initForm() {
  const form = document.querySelector('#diskusi-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.querySelector('[name="title"]').value.trim();
    const content = form.querySelector('[name="content"]').value.trim();

    if (!title || !content) {
      alert('Judul dan isi diskusi wajib diisi ya!');
      return;
    }

    // Simulasi (karena static site)
    const list = document.querySelector('#diskusi-list');
    if (list) {
      const newItem = document.createElement('article');
      newItem.className = 'diskusi-item animate-in';
      newItem.innerHTML = `
        <div class="avatar">KU</div>
        <div class="diskusi-content">
          <h3><a href="#">${title}</a></h3>
          <p>${content.substring(0, 120)}${content.length > 120 ? '...' : ''}</p>
          <div class="diskusi-meta">
            <span>Kamu</span>
            <span>Baru saja</span>
          </div>
        </div>
        <div class="diskusi-stats">
          <span>0</span>
          balasan
        </div>
      `;
      list.prepend(newItem);
    }

    form.reset();
    alert('Diskusi berhasil diposting! (simulasi — data disimpan sementara di halaman ini)');
  });
}

/* ----- Progress tracker (localStorage) ----- */
function markLessonComplete(id) {
  const progress = JSON.parse(localStorage.getItem('bakmi-progress') || '{}');
  progress[id] = true;
  localStorage.setItem('bakmi-progress', JSON.stringify(progress));
}

function getProgress() {
  return JSON.parse(localStorage.getItem('bakmi-progress') || '{}');
}

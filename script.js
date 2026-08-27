// ===== DATA & INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initNavbar();
  initCarousel();
  initBackToTop();
  initSmoothScroll();
});

async function loadData() {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    renderMenu(data.menu);
    renderVideos(data.videos);
  } catch (err) {
    console.error('Gagal memuat data:', err);
    // Fallback data
    renderMenu([
      { name: 'Bakmi Ayam Spesial', description: 'Mie kenyal dengan potongan ayam empuk.', price: 'Rp 35.000', image: 'https://images.unsplash.com/photo-1569718212165-3a8278bd77f0?w=500&q=80' },
      { name: 'Bakmi Goreng Mulia', description: 'Bakmi goreng pedas manis.', price: 'Rp 32.000', image: 'https://images.unsplash.com/photo-1612929632978-da6daba39f4b?w=500&q=80' },
      { name: 'Bakmi Kuah Original', description: 'Kuah kaldu ayam kaya rasa.', price: 'Rp 30.000', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80' },
      { name: 'Bakmi Seafood', description: 'Udang, cumi, dan bakso ikan.', price: 'Rp 45.000', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&q=80' }
    ]);
    renderVideos([
      { id: 'L5hVYbKSj7I', title: 'Bakmi Mulia - Keistimewaan Cita Rasa' },
      { id: 'PVwEmFXPW10', title: 'Proses Pembuatan Bakmi Segar' },
      { id: 'RzdgVue_9a0', title: 'Review Bakmi Mulia Spesial' },
      { id: 'r5tExZdrgyE', title: 'Suasana & Hidangan Bakmi Mulia' }
    ]);
  }
}

function renderMenu(items) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <article class="menu-card">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="menu-price">${item.price}</span>
      </div>
    </article>
  `).join('');
}

function renderVideos(videos) {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track || !dotsContainer) return;

  track.innerHTML = videos.map((v, i) => `
    <div class="carousel-slide" data-index="${i}">
      <div class="video-wrapper">
        <iframe 
          src="https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1" 
          title="${v.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          loading="lazy">
        </iframe>
      </div>
      <p class="video-title">${v.title}</p>
    </div>
  `).join('');

  dotsContainer.innerHTML = videos.map((_, i) => `
    <button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Video ${i + 1}"></button>
  `).join('');

  // Re-init carousel after rendering
  initCarouselControls(videos.length);
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// ===== CAROUSEL =====
let currentSlide = 0;
let totalSlides = 0;

function initCarousel() {
  // Will be called again after videos load
}

function initCarouselControls(count) {
  totalSlides = count;
  currentSlide = 0;
  updateCarousel();

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');

  prevBtn.onclick = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  };

  nextBtn.onclick = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  };

  dots.forEach(dot => {
    dot.onclick = () => {
      currentSlide = parseInt(dot.dataset.index);
      updateCarousel();
    };
  });

  // Auto-play optional (pause on interaction)
  let autoPlay = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, 8000);

  document.querySelector('.carousel-wrapper')?.addEventListener('mouseenter', () => clearInterval(autoPlay));
}

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

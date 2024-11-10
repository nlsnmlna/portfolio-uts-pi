// Hamburger menu untuk mobile
const hamburger = document.querySelector('.nelsen-hamburger');
const navLinks = document.querySelector('.nelsen-nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Animasi scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Carousel
const carouselContainers = document.querySelectorAll('.carousel-slide');

carouselContainers.forEach((carousel) => {
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let currentIndex = 0;

  function moveToSlide(index) {
    const cardWidth = carousel.children[0].clientWidth;
    const offset = (carousel.clientWidth - cardWidth) / 2; // Menambahkan offset agar card berada di tengah

    // Menambahkan offset untuk posisi card
    currentTranslate = -index * (cardWidth + 20) + offset; // 20 adalah gap antar card
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    currentIndex = index;
  }

  // Event untuk swipe pada perangkat sentuh
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    prevTranslate = currentTranslate;
  });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50 && currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    } else if (diff < -50 && currentIndex < carousel.children.length - 1) {
      moveToSlide(currentIndex + 1);
    } else {
      moveToSlide(currentIndex);
    }
  });

  // Inisialisasi carousel
  moveToSlide(currentIndex);
});

// Menampilkan modal ketika tombol "View Details" diklik
const viewButtons = document.querySelectorAll('.nelsen-view-details');
const modals = document.querySelectorAll('.nelsen-modal');
const closeButtons = document.querySelectorAll('.nelsen-close');

viewButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
  });
});

// Menutup modal ketika tombol close diklik
closeButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const modal = this.closest('.nelsen-modal');
    modal.style.display = 'none';
  });
});

// Menutup modal jika area di luar modal diklik
window.addEventListener('click', function (event) {
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Simple auto-scrolling slider
const sliderContent = document.querySelector('.nelsen-client-slider-content');

setInterval(() => {
  const firstItem = sliderContent.querySelector('.nelsen-slider-item');
  sliderContent.appendChild(firstItem);
}, 3000);

document.querySelector('.nelsen-load-more-btn').addEventListener('click', function () {
  // Menambahkan artikel tambahan setelah tombol diklik
  const moreArticles = [
    {
      title: 'Understanding CSS Flexbox',
      excerpt: 'Learn the fundamentals of CSS Flexbox and how to create responsive layouts...',
      link: 'article4.html',
      image: 'article4.jpg',
    },
    {
      title: 'Best Practices for SEO Optimization',
      excerpt: 'Optimize your website to rank higher in search engines with these simple tips...',
      link: 'article5.html',
      image: 'article5.jpg',
    },
  ];

  const articlesContainer = document.querySelector('.nelsen-articles-list');
  moreArticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('nelsen-article-card');
    articleCard.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="nelsen-article-image">
        <div class="nelsen-article-content">
          <h3 class="nelsen-article-title">${article.title}</h3>
          <p class="nelsen-article-excerpt">${article.excerpt}</p>
          <a href="${article.link}" class="nelsen-read-more">Read More</a>
        </div>
      `;
    articlesContainer.appendChild(articleCard);
  });
});

import './vendor/swiper-bundle.js';

// Constants

const newProductsBlock = document.querySelector('.new-products');
const mobilePagination = document.querySelector('.new-products__mobile-pagination');
const slides = document.querySelectorAll('.swiper-slide');
const slideFractionCount = slides.length / 2;

if (newProductsBlock) {
  newProductsBlock.classList.remove('new-products--nojs');
}

if (mobilePagination) {
  mobilePagination.textContent = `1 of ${slideFractionCount}`;
};

const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerGroup: 2,
  slidesPerView: 2,
  spaceBetween: 30,
  pagination: {
    el: '.new-products__pagination',
    clickable: true,
    renderBullet: function(index, className) {
      return `<span class="${className}">${(index + 1)}</span>`;
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1023: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1169: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
});

swiper.on('slideChange', () => {
  mobilePagination.textContent = `${Math.ceil((swiper.realIndex + 1) / 2)} of ${slideFractionCount}`;
})

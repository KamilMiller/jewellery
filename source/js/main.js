import { Swiper } from './vendor.js';
import { createFocusTrap } from './vendor.js';

// Consts

const page = document.querySelector('.page__body');
const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page__main');
const pageFooter = document.querySelector('.page-footer');
const navToggle = pageHeader.querySelector('.page-header__menu-button')
const navigation = document.querySelector('.main-nav');
const navigationItem = navigation.querySelectorAll('li');
const navigationLogin = navigation.querySelector('.main-nav__login');
const navigationMainList = navigation.querySelector('.main-nav__main-list');
const navigationExtraList = navigation.querySelector('.main-nav__extra-list');
const newProductsBlock = document.querySelector('.new-products');
const mobilePagination = document.querySelector('.new-products__mobile-pagination');
const slides = document.querySelectorAll('.swiper-slide');
const accordionToggle = document.querySelectorAll('.accordion-toggle');
const headerLoginLink = document.querySelector('.page-header__login');
const loginElement = document.querySelector('.login');
const loginForm = loginElement.querySelector('form');
const loginCloseButton = loginElement.querySelector('.login__close-button');
const loginEmailField = loginElement.querySelector('input[type="email"]');
const loginPasswordField = loginElement.querySelector('input[type="password"]');


// Utils
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Open and close main navigation bar

navToggle.classList.remove('page-header__menu-button--nojs');
navigation.classList.remove('main-nav--nojs');

function openNav() {
  pageHeader.classList.add('page-header--nav-open')
  navigation.classList.add('main-nav--open');
  pageMain.classList.add('page__main--nav-open');
  pageFooter.classList.add('page-footer--nav-open');
  navigationMainList.classList.add('main-nav__main-list--nav-open');
  navigationExtraList.classList.add('main-nav__extra-list--nav-open');
  navToggle.addEventListener('click', closeNav);
  navigationItem.forEach(element => element.addEventListener('click', closeNav));
  navigationLogin.addEventListener('click', closeNav);
  document.addEventListener('keydown', onNavEscKeyDown);
};

function closeNav() {
  pageHeader.classList.remove('page-header--nav-open')
  navigation.classList.remove('main-nav--open');
  pageMain.classList.remove('page__main--nav-open');
  pageFooter.classList.remove('page-footer--nav-open');
  navigationMainList.classList.remove('main-nav__main-list--nav-open');
  navigationExtraList.classList.remove('main-nav__extra-list--nav-open');
  listenersRemove();
};

function listenersRemove() {
  navToggle.removeEventListener('click', closeNav);
  navigationItem.forEach(element => element.removeEventListener('click', closeNav));
  navigationLogin.removeEventListener('click', closeNav);
  document.removeEventListener('keydown', onNavEscKeyDown);
};

function onNavEscKeyDown(evt) {
  if (isEscEvent(evt)) {
    closeNav();
    listenersRemove();
  }
};

navToggle.addEventListener('click', openNav);

// Swiper

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
  slideVisibleClass: 'swiper-slide-visible',
  watchSlidesProgress: true,
  on: {
    init() {
      let slidesArr = document.querySelectorAll('.swiper-slide');
      slidesArr.forEach((element) => {
        if (!element.classList.contains('swiper-slide-visible')) {
          element.setAttribute('tabindex', '-1');
          let sliderLink = element.querySelector('a');
          sliderLink.setAttribute('tabindex', '-1');
        }
      })
    },
    slideChange() {
      let slidesArr = document.querySelectorAll('.swiper-slide');
      slidesArr.forEach((element) => {
        let sliderLink = element.querySelector('a');
        element.removeAttribute('tabindex', '-1');
        sliderLink.removeAttribute('tabindex', '-1');
        if (!element.classList.contains('swiper-slide-visible')) {
          element.setAttribute('tabindex', '-1');
          sliderLink.setAttribute('tabindex', '-1');
        }
      })
    },
  },
});

swiper.on('slideChange', () => {
  mobilePagination.textContent = `${Math.ceil((swiper.realIndex + 1) / 2)} of ${slideFractionCount}`;
})

// Accordion

accordionToggle.forEach(element => element.classList.remove('accordion-toggle--nojs'));

const onAccordionToggleClick = (evt, toggleName) => {
  let buttonId;
  let toggleIcon;
  if (evt.target == accordionToggle || evt.target.closest(toggleName)) {
    buttonId = evt.target.closest(toggleName).dataset.blockId;
    toggleIcon = evt.target.closest(toggleName).querySelector('svg');
  }
  if (!buttonId) return;
  let elem = document.getElementById(buttonId);
  toggleIcon.classList.toggle('accordion-toggle__icon--open');
  elem.hasAttribute('hidden') ? elem.removeAttribute('hidden') : elem.setAttribute('hidden', 'hidden');
}

// FAQ-accordion

let faq;
let faqAnswer;

if (window.location.pathname.indexOf('main.html') >= 0) {
  faq = document.querySelector('.faq__inner');
  faqAnswer = document.querySelectorAll('.faq__answer');

  faqAnswer.forEach(element => element.setAttribute('hidden', 'hidden'));

  faq.addEventListener('click', (evt) => {
    onAccordionToggleClick(evt, '.faq__item');
  });
}

// Filter

let filterWrapper;
let filter;
let filterOpenButton;
let filterCloseButton;
let filterSubmitButton;

function openFilter() {
  filterWrapper.classList.add('filter--pop-up');
  page.classList.add('page__body--modal-open');
  filterWrapper.addEventListener('click', onSpaceAroundFormClick);
  filterCloseButton.addEventListener('click', closeFilter);
  filterSubmitButton.addEventListener('click', closeFilter);
  document.addEventListener('keydown', onFilterEscKeyDown);
}

function closeFilter() {
  filterWrapper.classList.remove('filter--pop-up');
  page.classList.remove('page__body--modal-open');
  filterWrapper.removeEventListener('click', onSpaceAroundFormClick);
  filterCloseButton.removeEventListener('click', closeFilter);
  filterSubmitButton.removeEventListener('click', closeFilter);
  document.removeEventListener('keydown', onFilterEscKeyDown);
}

function onFilterEscKeyDown(evt) {
  if (isEscEvent(evt)) {
    closeFilter();
  }
};

function onSpaceAroundFormClick(evt) {
  const target = evt.target;
  if (!target.closest('form')) {
    closeFilter();
  }
};

if (window.location.pathname.indexOf('catalog.html') >= 0) {
  filterWrapper = document.querySelector('.filter');
  filter = filterWrapper.querySelector('form');
  filterOpenButton = document.querySelector('.catalog__filter-toggle');
  filterCloseButton = filterWrapper.querySelector('.filter__close-button');
  filterSubmitButton = filter.querySelector('.filter__submit');
  filter.addEventListener('click', (evt) => {
    onAccordionToggleClick(evt, '.filter__group');
  });
  filterOpenButton.addEventListener('click', openFilter);
}

// Log In

let modalFocusTrap = createFocusTrap(loginElement);

function openLogin() {
  loginElement.classList.add('login--open');
  page.classList.add('page__body--modal-open');
  loginEmailField.focus();
  loginEmailField.select();
  loginCloseButton.addEventListener('click', onLogInCloseButtonClick);
  loginElement.addEventListener('click', onSpaceAroundLogInClick);
  document.addEventListener('keydown', onLogInEscKeyDown);
}

function closeLogin() {
  loginElement.classList.remove('login--open');
  page.classList.remove('page__body--modal-open');
  loginCloseButton.removeEventListener('click', onLogInCloseButtonClick);
  loginElement.removeEventListener('click', onSpaceAroundLogInClick);
  document.removeEventListener('keydown', onLogInEscKeyDown);
}

function onLogInEscKeyDown(evt) {
  if (isEscEvent(evt)) {
    closeLogin();
    modalFocusTrap.deactivate();
  }
};

function onSpaceAroundLogInClick(evt) {
  const target = evt.target;
  if (!target.closest('.login__pop-up')) {
    closeLogin();
    modalFocusTrap.deactivate();
  }
};

function onLogInCloseButtonClick() {
  closeLogin();
  modalFocusTrap.deactivate();
}

headerLoginLink.addEventListener('click', (evt) => {
  evt.preventDefault();
  openLogin();
  modalFocusTrap.activate();
});

navigationLogin.addEventListener('click', (evt) => {
  evt.preventDefault();
  openLogin();
  modalFocusTrap.activate();
});

// Submit Form & Local Data Storage.

let onSubmit = (emailField) => {
  localStorage.setItem("email", emailField.value);
  closeLogin();
};

loginForm.addEventListener('submit', (evt) => {
  if (loginEmailField.validity.valueMissing || !loginEmailField.validity.valid || !loginPasswordField.validity.valid) {
    evt.preventDefault();
    console.log('!!!');
  } else {
    onSubmit(loginEmailField);
  }
});

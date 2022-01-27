// Log In

import { createFocusTrap } from './vendor/focus-trap.esm.js';
import { isEscEvent } from './utils.js';

// Const
const page = document.querySelector('.page__body');
const headerLoginLink = document.querySelector('.page-header__login');
const navLoginLink = document.querySelector('.main-nav__login');
const loginElement = document.querySelector('.login');
const loginForm = loginElement.querySelector('form');
const loginCloseButton = loginElement.querySelector('.login__close-button');
const loginEmailField = loginElement.querySelector('input[type="email"]');
const loginPasswordField = loginElement.querySelector('input[type="password"]');

let modalFocusTrap = createFocusTrap(loginElement);

function openLogin() {
  let arr = document.querySelectorAll('[tabindex="2"]').forEach(element => element.setAttribute('tabindex', '-1'));
  loginElement.classList.add('login--open');
  page.classList.add('page__body--modal-open');
  loginEmailField.focus();
  loginEmailField.select();
  loginCloseButton.addEventListener('click', closeLogin);
  loginElement.addEventListener('click', onSpaceAroundLogInClick);
  document.addEventListener('keydown', onLogInEscKeyDown);
  // הושיעני
}

function closeLogin() {
  let arr = document.querySelectorAll('[tabindex="-1"]').forEach(element => element.setAttribute('tabindex', '2'));
  loginElement.classList.remove('login--open');
  page.classList.remove('page__body--modal-open');
  loginCloseButton.removeEventListener('click', closeLogin);
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

headerLoginLink.addEventListener('click', (evt) => {
  evt.preventDefault();
  openLogin();
  modalFocusTrap.activate();
});

navLoginLink.addEventListener('click', (evt) => {
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

// Focus Restrict

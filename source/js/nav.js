import { isEscEvent } from "./utils.js";

// Const

const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page__main');
const pageFooter = document.querySelector('.page-footer');
const navToggle = pageHeader.querySelector('.page-header__menu-button')
const navigation = document.querySelector('.main-nav');
const navigationItem = navigation.querySelectorAll('li');
const navigationLogin = navigation.querySelector('.main-nav__login');
const navigationMainList = navigation.querySelector('.main-nav__main-list');
const navigationExtraList = navigation.querySelector('.main-nav__extra-list');

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

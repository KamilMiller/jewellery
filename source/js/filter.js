// Filter Accordion on Catalog Page

import { onAccordionToggleClick } from './accordion.js';
import { isEscEvent } from './utils.js';

// Consts
const page = document.querySelector('.page__body');

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

if (window.location.pathname === '/catalog.html') {
  filterWrapper = document.querySelector('.filter');
  filter = filterWrapper.querySelector('form');
  filterOpenButton = document.querySelector('.catalog__filter-toggle');
  filterCloseButton = filterWrapper.querySelector('.filter__close-button');
  filterSubmitButton = filter.querySelector('.filter__submit');
  filter.addEventListener('click', (evt) => {
    onAccordionToggleClick(evt, '.filter__group-name');
  });
  filterOpenButton.addEventListener('click', openFilter);
}

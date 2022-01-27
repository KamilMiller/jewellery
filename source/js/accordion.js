// Accordion

// Constants
const accordionToggle = document.querySelectorAll('.accordion-toggle');

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

export { onAccordionToggleClick };

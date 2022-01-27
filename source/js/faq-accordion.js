// F.A.Q. accordion on Main Page

import { onAccordionToggleClick } from "./accordion.js";

let faq;
let faqAnswer;

if (window.location.pathname === '/main.html') {
  faq = document.querySelector('.faq__inner');
  faqAnswer = document.querySelectorAll('.faq__answer');

  faqAnswer.forEach(element => element.setAttribute('hidden', 'hidden'));

  faq.addEventListener('click', (evt) => {
    onAccordionToggleClick(evt, '.faq__question');
  });
}

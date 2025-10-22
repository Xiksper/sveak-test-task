
import './style.scss';

const body = document.body;
const burger = document.getElementById('burgerBtn');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawerClose');
const overlay = document.getElementById('overlay');
const cards = document.getElementById('cards');

/* ====== helpers ====== */
const openDrawer = () => {
  drawer.dataset.open = "true";
  overlay.classList.add('is-shown');
  burger.classList.add('is-active');
  body.style.overflow = 'hidden';           
  drawer.setAttribute('aria-hidden', 'false');
};
const closeDrawer = () => {
  drawer.dataset.open = "false";
  overlay.classList.remove('is-shown');
  burger.classList.remove('is-active');
  body.style.overflow = '';        
  drawer.setAttribute('aria-hidden', 'true');
};

burger.addEventListener('click', () => {
  const isOpen = drawer.dataset.open === "true";
  isOpen ? closeDrawer() : openDrawer();
});
drawerClose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });


function hideIncompleteRow() {
  const mq = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');


  cards.classList.remove('hide-last-row');
  document.querySelectorAll('.card.is-hidden').forEach(el => el.classList.remove('is-hidden'));

  if (!mq.matches) return;

  const total = cards.children.length;
  const mod = total % 3;
  if (mod === 0) return;

  cards.classList.add('hide-last-row');

  for (let i = 0; i < mod; i++) {
    const el = cards.children[total - 1 - i];
    if (el) el.classList.add('is-hidden');
  }
}
hideIncompleteRow();
window.addEventListener('resize', hideIncompleteRow);

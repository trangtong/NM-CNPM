import '@babel/polyfill';
import { login, reset, register } from './auth';

/////////////////////////////////////////////////
// SELECTOR
const searchForm = document.querySelector('.custom-search-input');
const loginForm = document.getElementById('form_login');
const registerForm = document.getElementById('form_register');

const tableCartBody = document.querySelector('#cart-table > tbody');

const reviewForm = document.getElementById('form_review');

const cardReview = document.getElementById('card_body_review');

const pagination = document.querySelector('.pagination');

if (searchForm) {
 searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let query = `/search?keyword=${searchForm.firstChild.value}`;
  window.location.href = query;
 });
}

if (loginForm)
 /////////////////////////////////////////////////
 // PROCESSING
 loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password_in').value;
  const emailForgot = document.getElementById('email_forgot').value;

  if (emailForgot) reset(emailForgot);
  else login(email, password);
 });

// registerForm.addEventListener('click', (e) => console.log('dfdfjhn'));
if (registerForm) {
 registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email_register').value;
  const password = document.getElementById('password_register').value;
  const name = document.getElementById('name_register').value;
  const lastname = document.getElementById('lastName_register').value;
  const addr = document.getElementById('addr_register').value;
  const phone = document.getElementById('phone_register').value;

  register(email, password, name, lastname, addr, phone);
 });
}

if (pagination) {
 pagination.addEventListener('click', (e) => {
  e.preventDefault();
  const racketID = window.location.pathname.split('.')[1];

  showReviews(racketID, e.target.value);
 });
}

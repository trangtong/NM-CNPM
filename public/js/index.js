import '@babel/polyfill';
import { login, register, logout, forgot, reset } from './auth';
import { updateSetting } from './updateSettings';
import { showAlert } from './alert';

/////////////////////////////////////////////////
// SELECTOR
const searchForm = document.querySelector('.custom-search-input');
const loginForm = document.getElementById('form_login');
const logoutButton = document.getElementById('logout');
const registerForm = document.getElementById('form_register');
const pagination = document.querySelector('.pagination');
const formReset = document.getElementById('reset_password');
const formUpdateInfo = document.getElementById('formUpdateInfo');
const formUpdatePassword = document.getElementById('formUpdatePassword');

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

if (logoutButton) {
 logoutButton.addEventListener('click', (e) => {
  e.preventDefault();

  logout();
 });
}

if (formReset) {
 formReset.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPassword = document.getElementById('new_password').value;
  const passwordConfirm = document.getElementById('confirm_password').value;

  let url = window.location.toString();
  const token = url.substr(url.lastIndexOf('/') + 1);

  reset(newPassword, passwordConfirm, token);
 });
}

if (formUpdateInfo) {
 formUpdateInfo.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append('name', document.getElementById('name').value);
  formData.append('lastName', document.getElementById('lastName').value);
  formData.append('phone', document.getElementById('phone').value);
  formData.append('address', document.getElementById('address').value);
  formData.append('photo', document.getElementById('inputImg').files[0]);

  updateSetting(formData, 'info');
 });
}

if (formUpdatePassword) {
 formUpdatePassword.addEventListener('submit', async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById('currentPassword').value;
  const password = document.getElementById('newPassword').value;
  const passwordConfirm = document.getElementById('newPasswordConfirm').value;

  if (!currentPassword || !password || !passwordConfirm) {
   showAlert('error', 'Các trường nhập là bắt buộc');
   return;
  }

  if (
   currentPassword.length < 8 ||
   password.length < 8 ||
   passwordConfirm.length < 8
  ) {
   showAlert('error', 'Mật khẩu phải lớn hơn 8 ký tự');
   return;
  }

  if (currentPassword === password) {
   showAlert('error', 'Mật khẩu mới giống với mật khẩu hiện tại');
   return;
  }

  const formData = {
   currentPassword,
   password,
   passwordConfirm
  };

  updateSetting(formData, 'password');
 });
}

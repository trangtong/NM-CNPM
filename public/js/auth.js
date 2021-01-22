import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
 try {
  const res = await axios({
   method: 'POST',
   url: '/api/v1/users/login',
   data: {
    email,
    password
   }
  });
  showAlert('success', 'Login successfully');
  setTimeout(() => {
   window.location.assign('/');
  }, 1000);
 } catch (error) {
  console.log(error);
  showAlert('error', `Login fail: ${error.message}`);
 }
};

export const register = async (
 email,
 password,
 name,
 lastName,
 address,
 phone
) => {
 try {
  const res = await axios({
   method: 'POST',
   url: '/api/v1/users/signup',
   data: {
    email,
    password,
    name,
    lastName,
    address,
    phone
   }
  });

  if (res.data.status === 'success') {
   showAlert('success', 'Đăng ký thành công');

   setTimeout(() => {
    window.location.reload();
   }, 1000);
  }
 } catch (error) {
  showAlert('error', error.message);
 }
};

export const logout = async () => {
 try {
  const res = await axios({
   method: 'GET',
   url: '/api/v1/users/logout'
  });

  if (res.data.status == 'success') {
   location.reload();
  }
 } catch (error) {
  showAlert('Error logging out');
 }
};

export const forgot = async (email) => {
 try {
  const res = await axios({
   method: 'POST',
   url: '/api/v1/users/forgot',
   data: {
    email
   }
  });

  if (res.data.status == 'success') {
   showAlert(
    'success',
    'Vui lòng kiểm tra email (có thể trong hòm thư rác) để xác nhận'
   );
  }
 } catch (error) {
  showAlert('error', 'Lỗi: không thể gửi email xác nhận');
 }
};

export const reset = async (newPassword, passwordConfirm, token) => {
 if (!newPassword || !passwordConfirm) {
  showAlert('error', 'Bạn hãy điền đầy đủ thông tin');
  return;
 }

 try {
  const res = await axios({
   method: 'PATCH',
   url: `/api/v1/users/reset/${token}`,
   data: {
    password: newPassword,
    passwordConfirm
   }
  });

  if (res.data.status == 'success') {
   showAlert('success', 'Reset mật khẩu thành công');
   setTimeout(() => {
    window.location.assign('/');
   }, 1000);
  } else {
   showAlert('error', err.data.message);
  }
 } catch (error) {
  showAlert('error', 'Không thể reset mật khẩu');
 }
};

export const hideAlert = () => {
  const element = document.querySelector('.alert');
  if (element) element.parentElement.removeChild(element);
};

// type: 'success' or 'error'
export const showAlert = (type, message) => {
  hideAlert();
  const divHtml = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', divHtml);
  window.setTimeout(hideAlert, 1000);
};

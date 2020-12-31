import { setProduct } from './cartInLocalStorage';
import { updateCartNotifi } from './header';

////////////////////////////////////
//// SELECTOR
const addToCartBtn = document.getElementById('btn-add-cart');
const quantityCart = document.getElementById('quantity_1');
const rowReview1 = document.getElementById('row_review_1');
const rowReview2 = document.getElementById('row_review_2');
const pagination = document.querySelector('.pagination');

////////////////////////////////////////
//// PRCESSING
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = window.location.toString();
    const id = url.slice(url.lastIndexOf('.') + 1);

    let quantity = 1;
    if (quantityCart) quantity = quantityCart.value;
    setProduct(id, quantity);
    await updateCartNotifi();
  });
}

if (pagination) {
  pagination.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = `?page=${e.target.getAttribute('value')}`;
  });
}

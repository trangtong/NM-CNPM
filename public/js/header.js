import { fetchDataRackets } from './fetchDataRackets';
import { formatter } from './formatter';
import { getIDs } from './cartInLocalStorage';

const emptyCart = () => {
  return '<span>Giỏ hàng trống. Shopping thôi nào!</span>';
};

const rowProductInCart = (racket, numProduct) => {
  return `<li>
            <a href="/${racket.slug}.${racket._id}">
              <figure>
                <img
                  class="lazy"
                  src="img/products/${racket.imageCover}"
                  data-src="img/products/shoes/thumb/1.jpg"
                  alt="${racket.slug}"
                  width="50"
                  height="50"
                ></img>
              </figure>
              <strong><span style="overflow: hidden;"> ${numProduct} x ${
    racket.name
  } </span>${formatter.format(racket.price * numProduct)} </strong>
            </a>
          </li>`;
};

const notifiNumProduct = document.querySelector('.cart_bt');
const cartList = document.querySelector('.cart_bt+.dropdown-menu>ul');
const shoppingCarts = document.querySelectorAll('i.ti-shopping-cart');

cartList.addEventListener('click', (e) => {
  console.log('dfjhhj');
});

export const updateCartNotifi = async () => {
  if (notifiNumProduct) {
    const productsInCart = JSON.parse(localStorage.getItem('cart'));
    cartList.textContent = '';
    notifiNumProduct.textContent = '';
    let IDs = getIDs();

    const rackets = await fetchDataRackets(IDs);

    // Update notifi about nProduct
    notifiNumProduct.insertAdjacentHTML(
      'afterbegin',
      `<strong>${rackets.length}</strong>`
    );

    if (rackets.length === 0) {
      cartList.insertAdjacentHTML('afterbegin', emptyCart());
    }

    // Show max 4 product in cart
    let count = 0;
    rackets.forEach((racket) => {
      if (count >= 4) return;
      cartList.insertAdjacentHTML(
        'afterbegin',
        rowProductInCart(racket, productsInCart[racket._id])
      );
      count++;
    });
  }
};

document.addEventListener('DOMContentLoaded', async (e) => {
  await updateCartNotifi();
});

if (shoppingCarts) {
  shoppingCarts.forEach((shoppingCart) => {
    shoppingCart.addEventListener('click', async (e) => {
      e.preventDefault();

      const urlProduct = shoppingCart.getAttribute('value');
      const id = urlProduct.slice(urlProduct.lastIndexOf('.') + 1);

      const cartSaved = JSON.parse(localStorage.getItem('cart')) || {};
      if (!cartSaved[id]) cartSaved[id] = 1;

      const cart = JSON.stringify(cartSaved);
      localStorage.setItem('cart', cart);

      await updateCartNotifi();
    });
  });
}

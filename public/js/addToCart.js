const shoppingCarts = document.querySelectorAll('i.ti-shopping-cart');

if (shoppingCarts) {
  shoppingCarts.forEach((shoppingCart) => {
    shoppingCart.addEventListener('click', (e) => {
      e.preventDefault();

      const urlProduct = shoppingCart.getAttribute('value');
      const id = urlProduct.slice(urlProduct.lastIndexOf('.') + 1);

      const cartSaved = JSON.parse(localStorage.getItem('cart')) || {};
      if (!cartSaved[id]) cartSaved[id] = 1;

      const cart = JSON.stringify(cartSaved);
      localStorage.setItem('cart', cart);
    });
  });
}

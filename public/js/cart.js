import { fetchDataRackets } from './fetchDataRackets';
import { formatter } from './formatter';
import { getIDs } from './cartInLocalStorage';

const rowProductHtml = (racket, quantity) => {
  const priceVND = formatter.format(racket.price);

  return `<tr><td><div class="thumb_cart"><img id="thumb_cart_small" src="img/products/${racket.imageCover}" \
    data-src="img/products/shoes/1.jpg" class="lazy" alt=${racket.slug}></div><a href="/${racket.slug}.${racket._id}">
    <span class="item_cart">${racket.name}</span></a>\
    </td><td><strong>${priceVND}</strong></td><td><div class="numbers-row">\
    <input type="text" value="${quantity}" id="quantity_1" class="qty2" name="quantity_1">\
    <div class="inc button_inc">+</div><div class="dec button_inc">-</div></div>\
    </td><td><strong>${priceVND}</strong></td><td class="options"><a href="#"><i class="ti-trash" value=${racket._id}></i></a>\
    </td></tr>`;
};

export const updateCartTable = async (selector) => {
  // Take ID in  localStorage
  const IDs = getIDs();

  // Fetch data from server
  const rackets = await fetchDataRackets(IDs);

  // Update cart table view
  rackets.forEach((racket) => {
    console.log(rackets);
    selector.insertAdjacentHTML('afterbegin', rowProductHtml(racket, 2));
  });
};

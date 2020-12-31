export const getProducts = () => {
  return JSON.parse(localStorage.getItem('cart'));
};

export const setProducts = (productsObj) => {
  localStorage.setItem('cart', JSON.stringify(productsObj));
};

export const setProduct = (id, quantity) => {
  const products = getProducts();

  products[id] = quantity;
  setProducts(products);
};

export const getIDs = () => {
  const productsInCart = getProducts();
  let IDs = [];

  for (const id in productsInCart) IDs.push(id);
  return IDs;
};

export const updateQuantity = (id, quantity) => {
  const products = getProducts();

  if (products[id]) {
    if (quantity <= 0) delete products[id];
    else products[id] = quantity;

    setProducts(products);
  }
};

export const decProduct = (id) => {
  const products = getProducts();

  if (products[id]) {
    products[id]--;
    if (products[id] < 0) delete products[id];
    setProducts(products);
  }
};

export const incProduct = (id) => {
  const products = getProducts();

  if (products[id]) {
    products[id]++;
    setProducts(products);
  }
};

export const deleteProduct = (id) => {
  const products = getProducts();

  if (products[id]) {
    delete products[id];
    setProducts(products);
  }
};

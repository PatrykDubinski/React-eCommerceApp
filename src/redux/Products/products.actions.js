import productsTypes from "./products.types";

export const addProductStart = (product) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: product,
});

export const fetchProductsStart = () => ({
  type: productsTypes.FETCH_PRODUCTS_START,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductStart = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID,
});

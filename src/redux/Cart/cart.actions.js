import cartTypes from "./cart.types";

export const addToCart = (nextCartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCartItem,
});

export const removeCartItem = (item) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: item,
});

export const decreaseCartItem = (item) => ({
  type: cartTypes.DECREASE_CART_ITEM,
  payload: item,
});

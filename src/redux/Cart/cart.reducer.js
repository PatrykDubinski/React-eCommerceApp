import cartTypes from "./cart.types";
import {
  handleAddToCart,
  handleDecreaseCartItem,
  handleRemoveFromCart,
} from "./cart.helpers";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload,
        }),
      };
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: handleRemoveFromCart({
          prevCartItems: state.cartItems,
          cartItemToRemove: action.payload,
        }),
      };
    case cartTypes.DECREASE_CART_ITEM:
      return {
        ...state,
        cartItems: handleDecreaseCartItem({
          prevCartItems: state.cartItems,
          cartItemToDecrease: action.payload,
        }),
      };
    case cartTypes.CLEAR_CART:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default cartReducer;

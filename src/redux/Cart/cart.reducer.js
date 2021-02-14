import cartTypes from "./cart.types";
import { handleAddToCart } from "./cart.helpers";

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
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;

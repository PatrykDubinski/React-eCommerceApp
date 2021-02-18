import ordersTypes from "./orders.types";

const initialState = {
  ordersHistory: [],
  orderDetails: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersTypes.SET_USER_ORDER_HISTORY:
      return {
        ...state,
        ordersHistory: action.payload,
      };
    case ordersTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;

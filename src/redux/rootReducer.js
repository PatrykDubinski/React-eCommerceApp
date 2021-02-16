import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./Cart/cart.reducer";
import productsReducer from "./Products/products.reducer";
import userReducer from "./User/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

export default persistReducer(configStorage, rootReducer);

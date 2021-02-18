import { all, call } from "redux-saga/effects";
import ordersSaga from "./Orders/orders.sagas";
import productsSaga from "./Products/products.sagas";
import userSagas from "./User/user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(productsSaga), call(ordersSaga)]);
}

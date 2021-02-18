import ordersTypes from "./orders.types";
import { put, takeLatest, call, all } from "redux-saga/effects";

import {
  handleGetOrderDetails,
  handleGetUserOrderHistory,
  handleSaveOrderHistory,
} from "./orders.helpers";
import { setOrderDetails, setUserOrderHistory } from "./orders.actions";
import { auth } from "../../firebase/utils";
import { clearCart } from "../Cart/cart.actions";

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrderDetails(payload);
    yield put(setOrderDetails(order));
  } catch (error) {
    // console.log(error);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (error) {
    // console.log(error);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* saveOrderHistory({ payload }) {
  try {
    const timestamp = new Date();

    yield handleSaveOrderHistory({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamp,
    });
    yield put(clearCart());
  } catch (error) {
    // console.log(error);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrderHistory);
}

export default function* ordersSaga() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}

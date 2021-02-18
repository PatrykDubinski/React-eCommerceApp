import React, { useEffect } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";

import { getUserOrderHistory } from "../../redux/Orders/orders.actions";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  ordersHistory: state.orders.ordersHistory.data,
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, ordersHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      <OrderHistory orders={ordersHistory} />
    </div>
  );
};

export default Dashboard;

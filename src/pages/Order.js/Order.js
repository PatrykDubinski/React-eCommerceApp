import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderDetails from "../../components/OrderDetails/OrderDetails";

import { getOrderDetailsStart } from "../../redux/Orders/orders.actions";

const mapState = ({ orders }) => ({
  orderDetails: orders.orderDetails,
});

const Order = () => {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderID } = useParams();
  const { orderTotal } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);

  return (
    <div>
      <h1>Order ID: #{orderID}</h1>
      <OrderDetails order={orderDetails} />
      <h3>Total: {orderTotal}$</h3>
    </div>
  );
};

export default Order;

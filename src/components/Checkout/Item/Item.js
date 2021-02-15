import React from "react";
import { useDispatch } from "react-redux";

import {
  removeCartItem,
  addToCart,
  decreaseCartItem,
} from "../../../redux/Cart/cart.actions";

const Item = (product) => {
  const dispatch = useDispatch();
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    );
  };

  const handleIncreaseProduct = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseProduct = (product) => {
    dispatch(decreaseCartItem(product));
  };

  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span
              onClick={() => handleDecreaseProduct(product)}
              className="cartBtn"
            >{`< `}</span>
            <span>{quantity}</span>
            <span
              onClick={() => handleIncreaseProduct(product)}
              className="cartBtn"
            >{` >`}</span>
          </td>
          <td>${productPrice}</td>
          <td align="center">
            <span
              className="cartBtn"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;

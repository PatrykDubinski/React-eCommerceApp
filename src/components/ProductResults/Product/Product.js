import React from "react";
import Button from "../../forms/Button/Button";
import { addToCart } from "../../../redux/Cart/cart.actions";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Product = (product) => {
  const dispatch = useDispatch();
  const { documentID, productName, productPrice, productThumbnail } = product;

  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCartBtn = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addToCart(product));
  };

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </span>
          </li>
          <li>
            <span className="price">${productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                onClick={() => handleAddToCart(product)}
                {...configAddToCartBtn}
              >
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductCard.scss";

import Button from "../forms/Button/Button";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";

const mapState = ({ products }) => ({
  product: products.product,
});

const ProductCard = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(mapState);
  const { productID } = useParams();

  const {
    productName,
    productThumbnail,
    productPrice,
    productDescription,
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>${productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn}>Add to cart</Button>
            </div>
          </li>
          <li>
            <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: productDescription }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
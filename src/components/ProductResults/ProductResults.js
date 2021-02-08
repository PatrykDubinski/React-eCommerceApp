import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductResults.scss";

import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product/Product";

const mapState = ({ products }) => ({
  products: products.products,
});

const ProductResults = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Browse Products</h1>

      <div className="productResults">
        {products.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product;

          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            productThumbnail,
            productName,
            productPrice,
          };

          return <Product key={index} {...configProduct} />;
        })}
      </div>
    </div>
  );
};

export default ProductResults;

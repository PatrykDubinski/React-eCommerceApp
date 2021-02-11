import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductResults.scss";

import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product/Product";
import FormSelect from "../forms/FormSelect/FormSelect";
import { useHistory, useParams } from "react-router-dom";
import LoadMore from "../LoadMore/LoadMore";

const mapState = ({ products }) => ({
  products: products.products,
});

const ProductResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const newFilter = e.target.value;
    history.push(`/search/${newFilter}`);
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMore: handleLoadMore,
  };

  return (
    <div className="products">
      <h1>Browse Products</h1>

      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product;

          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };

          return <Product key={index} {...configProduct} />;
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;

import React from "react";

import ShopMen from "../../assets/shopMens.jpg";
import ShopWomen from "../../assets/shopWomens.jpg";
import "./Directory.scss";

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrapper">
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopWomen})`,
          }}
        >
          <a>Shop Womens</a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopMen})`,
          }}
        >
          <a>Shop mens</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;

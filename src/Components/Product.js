import React from "react";

const Product = ({ title, category, price, thumbnail }) => {
  return (
    <div className="product">
      <img src={thumbnail} alt={title} />
      <div className="product-info">
        <h3>{title}</h3>
        <p>{category}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default Product;

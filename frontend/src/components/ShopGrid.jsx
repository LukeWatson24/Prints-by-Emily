import React from "react";
import { Link } from "react-router-dom";

const ShopGrid = ({ prod }) => {
  return (
    <Link className="product-link" to={`/shop/${prod.name}`}>
      <div className="item">
        <h3>{prod.name}</h3>
        <img className="shop-img" src={prod.src} alt="" />
        <p className="desc">{prod.desc}</p>
        <p>£9.99</p>
      </div>
    </Link>
  );
};

export default ShopGrid;

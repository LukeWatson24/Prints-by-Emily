import React from "react";

//Importing components
import ShopGrid from "./ShopGrid";

const Shop = ({ products }) => {
  return (
    <div className="shop">
      <div className="block"></div>
      <h1 className="shop-heading">Shop</h1>

      <div className="items">
        {products.map((prod) => (
          <ShopGrid key={prod.name} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default Shop;

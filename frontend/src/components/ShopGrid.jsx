import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShopGrid = ({ prod }) => {
  const [lowestPriceValue, setLowestPriceValue] = useState();

  const priceFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  let priceArray = [];

  useEffect(() => {
    lowestPrice();
  });

  const min = (input) => {
    return Math.min.apply(null, input);
  };

  const lowestPrice = () => {
    let array = prod.size;

    for (let i = 0; i < array.length; i++) {
      const size = array[i];

      priceArray.push(size.basePrice);
    }

    setLowestPriceValue(min(priceArray));
  };

  return (
    <Link className="product-link" to={`/shop/${prod.name}`}>
      <div className="item">
        <h3>{prod.name}</h3>
        <div className="shop-img-container">
          <img className="shop-img" src={prod.src} alt="" />
        </div>
        {/* <p className="desc">{prod.desc}</p> */}
        <p className="from">From:</p>
        <p>{priceFormatter.format(lowestPriceValue)}</p>
      </div>
    </Link>
  );
};

export default ShopGrid;

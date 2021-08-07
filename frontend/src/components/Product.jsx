import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ item, cart, setCart }) => {
  //PRICE FORMAT
  const priceFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  //STATES
  const [displayPrice, setDisplayPrice] = useState();
  const [sku, setSku] = useState("");
  const [displaySize, setDisplaySize] = useState("");
  const [quant, setQuant] = useState(1);
  const [cartItem, setCartItem] = useState({});

  //HANDLERS
  const sizeHandler = (e) => {
    setSku(e.target.value);
    setDisplayPrice(
      parseFloat(e.target[e.target.selectedIndex].dataset.price) * quant
    );
    setDisplaySize(e.target[e.target.selectedIndex].dataset.display);
  };

  const quantHandler = (e) => {
    if (e.target.value > 5) {
      setQuant(5);
    } else if (e.target.value < 1) {
      setQuant(1);
    } else {
      setQuant(parseInt(e.target.value));
    }

    setSku("");
  };

  const addToCartHandler = () => {
    setCart([...cart, cartItem]);
  };

  useEffect(() => {
    setCartItem({
      id: item._id + sku + quant + Math.random() * 1000,
      dbId: item._id,
      name: item.name,
      displaySize: displaySize,
      quant: quant,
      sku: sku,
      price: displayPrice,
      src: item.src,
    });
  }, [setQuant, setDisplayPrice, quant, displayPrice]);

  return (
    <div className="product-wrapper">
      <div className="block"></div>
      <div className="product-left">
        <img src={item.src} alt={item.name} />
      </div>
      <div className="product-right">
        <h1>{item.name}</h1>
        <p>{item.desc}</p>
        <div className="quant">
          <label htmlFor="quant">Quantity: </label>
          <input
            onChange={quantHandler}
            min="1"
            max="5"
            type="number"
            id="quant"
            value={quant}
          />
        </div>
        <select onChange={sizeHandler} value={sku}>
          <option value="">Choose size</option>
          {item.size.map((size) => (
            <option
              key={size.sku + size.display}
              value={size.sku}
              data-price={size.basePrice}
              data-display={size.display}
            >
              {size.display}
            </option>
          ))}
        </select>
        {sku === undefined || sku === "" ? (
          <p className="price">Choose a size</p>
        ) : (
          <p className="price">{priceFormatter.format(displayPrice)}</p>
        )}
        <Link to="/shop">
          <button
            className="product-link"
            onClick={addToCartHandler}
            disabled={sku === undefined || sku === ""}
          >
            Add to cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;

import React from "react";

const CartItems = ({
  setCart,
  cart,
  name,
  price,
  src,
  id,
  quant,
  size,
  item,
}) => {
  const priceFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  const removeHandler = () => {
    setCart(cart.filter((el) => el.id !== item.id));
  };

  return (
    <div key={id} className="cart-wrapper">
      <div className="cart-left">
        <img src={src} alt="" />
      </div>
      <div className="cart-right">
        <h3 className="cart-item-name">{name}</h3>
        <h3>{`Size: ${size}`}</h3>
        <h3>{`Quantity: ${quant}`}</h3>
        <h3>{priceFormatter.format(price)}</h3>
        <button onClick={removeHandler}>Remove</button>
      </div>
    </div>
  );
};

export default CartItems;

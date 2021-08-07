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
        <p className="cart-item-name">{name}</p>
        <p>{`Size: ${size}`}</p>
        <p>{`Quantity: ${quant}`}</p>
        <p className="cart-item-price">{priceFormatter.format(price)}</p>
        <button className="cart-remove-button" onClick={removeHandler}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItems;

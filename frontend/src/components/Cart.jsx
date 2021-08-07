import React from "react";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";

const Cart = ({ cart, setCart, cartPrice }) => {
  const priceFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div className="cart-div">
      <div className="block"></div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => {
          return (
            <div key={Math.random() * 4000}>
              <CartItems
                key={item.id}
                setCart={setCart}
                cart={cart}
                name={item.name}
                price={item.price}
                src={item.src}
                id={item.id}
                quant={item.quant}
                size={item.displaySize}
                item={item}
              />
            </div>
          );
        })
      )}

      {cart.length !== 0 ? (
        <div className="cart-total-div">
          <p>{`Total: ${priceFormatter.format(cartPrice)}`}</p>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;

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
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
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
        <div className="">
          <h3>{`Total: ${priceFormatter.format(cartPrice)}`}</h3>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;

import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="checkout-div">
      <div className="block"></div>
      <h1>Thank you for placing an order!</h1>
      <Link to="/shop">
        <button className="return-home">Back to shop</button>
      </Link>
    </div>
  );
};

export default ThankYou;

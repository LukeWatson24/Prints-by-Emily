import * as React from "react";
import { Link } from "react-router-dom";

const Nav = ({ cart }) => {
  return (
    <nav className="nav-bar">
      <div className="nav-wrapper">
        <Link className="product-link" to="/">
          <h2 className="nav-logo">Prints by Emily</h2>
        </Link>
        <ul className="nav-links-container">
          <li className="nav-links">About</li>
          <Link className="product-link" to="/shop">
            <li className="nav-links">Shop</li>
          </Link>
          <li className="nav-links">Contact</li>
          {cart.length === 0 ? (
            <Link className="product-link" to="/cart">
              <li className="nav-links">Cart</li>
            </Link>
          ) : (
            <Link className="product-link" to="/cart">
              <li className="nav-links">{`Cart(${cart.length})`}</li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

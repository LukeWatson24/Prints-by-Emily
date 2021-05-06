import { useState, React, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookie from "js-cookie";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

//importing components
import Nav from "./components/Nav.jsx";
import NewArrivals from "./components/NewArrivals.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product";
import Uploader from "./components/Uploader";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";

const stripePromise = loadStripe(
  "pk_test_51InS7ZCD5jsRgj0F2vkOhLQ62RhK2Jd2Xg3J5s8lrNuKqyqsD9mAudJgYSkx9EpvafgwLZAi2zOMOtEX4HvH14Tm009drZozLi"
);

function App() {
  const [cart, setCart] = useState([]);
  const [orderArray, setOrderArray] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);
  const [products, setProducts] = useState([]);
  const [api, setApi] = useState("");

  useEffect(() => {
    const mode = process.env.NODE_ENV;
    console.log(mode);
    if (mode === "development") {
      setApi("http://localhost:3001");
    } else if (mode === "production") {
      setApi("https://prints-by-emily-backend.herokuapp.com");
    }
  }, []);

  const userId = async () => {
    const localId = localStorage.getItem("_id");
    if (localId) {
      const isValid = uuidValidate(localId);
      if (isValid) {
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localId,
          }),
        };
        const response = await fetch(`${api}/api/cart/get`, params);
        const data = await response.json();
        if (data !== null) {
          setCart(data.cart);
        }
      } else {
        const newId = uuidv4();
        localStorage.setItem("_id", newId);
      }
    } else {
      const newId = uuidv4();
      localStorage.setItem("_id", newId);
    }
  };

  const cartUpdater = async () => {
    const localId = localStorage.getItem("_id");

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localId,
        cart: cart,
      }),
    };
    if (cart.length === 0) {
      await fetch(`${api}/api/cart/remove`, params);
    } else {
      await fetch(`${api}/api/cart/update`, params);
    }
  };

  const productFetcher = async () => {
    const response = await fetch(`${api}/api/products`);
    const data = await response.json();

    setProducts(data);
    console.log(typeof data, data);
  };

  const cartToOrderConverter = () => {
    let array = [];
    if (cart.length !== 0) {
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const order = {
          sku: item.sku,
          copies: item.quant,
          sizing: "fillPrintArea",
          assets: [
            {
              printArea: "default",
              url: item.src,
            },
          ],
        };
        array.push(order);
        setOrderArray(array);
      }
    } else {
      setOrderArray([]);
    }
  };

  const totalPrice = () => {
    if (cart.length > 0) {
      let cost = 0;
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        cost = cost + item.price;

        setCartPrice(cost);
      }
    } else {
      setCartPrice(0);
    }
  };

  const logoutHandler = async () => {
    const params = {
      method: "POST",
    };

    const response = await fetch(`${api}/api/auth/logout`, params);
    const data = await response.json();
    console.log(data);
    setUser("");
    Cookie.remove("Admin");
  };

  const getCookieUser = () => {
    if (Cookie.get("Admin")) {
      setUser(Cookie.get("Admin"));
      setLogged(true);
    } else {
      setUser("");
      setLogged(false);
    }
  };

  useEffect(() => {
    userId();
    getCookie();
    getCookieUser();
    totalPrice();
    productFetcher();
  }, []);

  useEffect(() => {
    getCookie();
    getCookieUser();
  }, [user, setUser]);

  const getCookie = async () => {
    const params = {
      credentials: "include",
    };

    const fetchResponse = await fetch(`${api}/cookie`, params);
    const data = fetchResponse;
    console.log(data);
  };

  useEffect(() => {
    cartUpdater();
    totalPrice();
    cartToOrderConverter();
  }, [cart, setCart]);

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <div className="App">
          <Nav cart={cart} />
          <Switch>
            <Route path="/" exact>
              <NewArrivals products={products} />
            </Route>
            <Route path="/shop" exact>
              <Shop products={products} />
            </Route>
            {products.map((item) => (
              <Route key={item.name} path={`/shop/${item.name}`}>
                <Product cart={cart} setCart={setCart} item={item} />
              </Route>
            ))}
            <Route path="/cart">
              <Cart cart={cart} setCart={setCart} cartPrice={cartPrice} />
            </Route>
            <Route path="/admin/upload">
              <Uploader logged={logged} api={api} />
            </Route>
            <Route path="/admin">
              <Login
                user={user}
                setUser={setUser}
                logoutHandler={logoutHandler}
                api={api}
              />
            </Route>
            <Route path="/checkout" exact>
              <Checkout
                cart={cart}
                setCart={setCart}
                cartPrice={cartPrice}
                orderArray={orderArray}
                setOrderArray={setOrderArray}
                api={api}
              />
            </Route>
            <Route path="/checkout/thank-you">
              <ThankYou />
            </Route>
          </Switch>
        </div>
      </Elements>
    </Router>
  );
}

export default App;

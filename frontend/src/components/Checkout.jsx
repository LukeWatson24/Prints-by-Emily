import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { postcodeValidator as psv } from "postcode-validator";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Redirect } from "react-router";
const stripePromise = loadStripe(
  "pk_test_51InS7ZCD5jsRgj0F2vkOhLQ62RhK2Jd2Xg3J5s8lrNuKqyqsD9mAudJgYSkx9EpvafgwLZAi2zOMOtEX4HvH14Tm009drZozLi"
);

const Checkout = ({ cartPrice, orderArray, setCart, api }) => {
  const priceFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  const stripe = useStripe();
  const elements = useElements();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        width: "100px",
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // const recipient = {
  //   address: {
  //     line1: "69 test avenue",
  //     line2: "test",
  //     postalOrZipCode: "NN5 6PX",
  //     countryCode: "GB",
  //     townOrCity: "Northampton",
  //   },
  //   name: "John Cena",
  //   email: "email@email.com",
  // };

  //STATES SINGLE HANDLER
  const [nameEmail, setNameEmail] = useState({
    name: "",
    email: "",
  });
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    country: "GB",
    towncity: "",
  });

  const [postcode, setPostcode] = useState("");
  const [valid, setValid] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameEmail({
      ...nameEmail,
      [e.target.name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress({
      ...address,
      [e.target.name]: value,
    });
  };

  const handlePostcodeChange = (e) => {
    const value = e.target.value;
    const postcodeValid = psv(value, address.country);
    if (postcodeValid) {
      setPostcode(value);
      setValid(true);
    } else {
      setPostcode("");
      setValid(false);
    }
  };

  const recipient = {
    address: {
      line1: address.line1,
      line2: address.line2,
      postalOrZipCode: postcode,
      countryCode: address.country,
      townOrCity: address.towncity,
    },
    name: nameEmail.name,
    email: nameEmail.email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const intentPrice = Math.round(cartPrice * 100);
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: intentPrice,
      }),
    };

    const response = await fetch(`${api}/api/order/create-intent`, params);
    const data = await response.json();
    const clientSecret = data.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: nameEmail.name,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("success");
        console.log(result);
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shippingMethod: "Budget",
            recipient: recipient,
            items: orderArray,
          }),
        };
        const savedResponse = await fetch(`${api}/api/order`, params);
        const prodigiData = await savedResponse.json();
        console.log(prodigiData);

        if (prodigiData !== null || prodigiData !== undefined) {
          const completeParams = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntent: result,
              ProdigiOutcome: prodigiData,
            }),
          };

          const response = await fetch(
            `${api}/api/order/complete`,
            completeParams
          );
          const data = await response.json();
          console.log(data);
        }

        setCart([]);
        setSuccessful(true);
      }
    }
  };

  return successful ? (
    <Redirect to="/checkout/thank-you" />
  ) : (
    <div className="checkout-div">
      <div className="block"></div>
      <h1>Checkout</h1>
      <h3>{`Total: ${priceFormatter.format(cartPrice)}`}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-name-email">
          <div className="name label-container">
            <label htmlFor="name">Full Name: </label>
            <input
              onChange={handleNameChange}
              type="text"
              name="name"
              required
            />
          </div>
          <div className="email label-container">
            <label htmlFor="email">Email: </label>
            <input
              onChange={handleNameChange}
              type="email"
              name="email"
              required
            />
          </div>
        </div>
        <div className="form-address">
          <div className="address1 label-container">
            <label htmlFor="line1">Address line 1: </label>
            <input
              onChange={handleAddressChange}
              type="text"
              name="line1"
              required
            />
          </div>
          <div className="address2 label-container">
            <label htmlFor="line2">Address line 2: </label>
            <input
              onChange={handleAddressChange}
              type="text"
              name="line2"
              required
            />
          </div>
          <div className="country label-container">
            <label htmlFor="country">Country: </label>
            <select
              onChange={handleAddressChange}
              name="country"
              value={address.country}
              required
            >
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
            </select>
          </div>
          <div className="town-city label-container">
            <label htmlFor="towncity">Town or City: </label>
            <input
              onChange={handleAddressChange}
              type="text"
              name="towncity"
              required
            />
          </div>
          <div className="postcode label-container">
            <label htmlFor="postal">Postcode: </label>
            <input
              onChange={handlePostcodeChange}
              type="text"
              name="postal"
              required
            />
          </div>
        </div>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <button
          disabled={
            nameEmail.name === "" ||
            nameEmail.email === "" ||
            address.line1 === "" ||
            address.line2 === "" ||
            address.postal === "" ||
            address.towncity === "" ||
            address.country === "" ||
            valid === false
          }
        >
          Place order
        </button>
      </form>
    </div>
  );
};

export default Checkout;

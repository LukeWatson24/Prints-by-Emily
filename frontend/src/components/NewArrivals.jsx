import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const NewArrivals = ({ products }) => {
  return (
    <section className="new-arrivals-container">
      <h1 className="new-additions">New Additions</h1>

      <Splide
        className="splide"
        options={{
          type: "loop",
          gap: "3rem",
          perPage: 3,
          perMove: 1,
          focus: "center",
          width: "70vw",
          autoplay: true,
          interval: 10000,
          breakpoints: {
            1300: {
              perPage: 2,
            },
            775: {
              perPage: 1,
            },
          },
          pauseOnHover: false,
          arrows: "slider",
        }}
        hasSliderWrapper
        // hasAutoplayProgress
      >
        {products.map((img) => {
          return (
            <SplideSlide key={img.name}>
              <img className="slider-img" src={img.src} alt="" />
            </SplideSlide>
          );
        })}
      </Splide>

      <button className="landing-button">Shop all designs</button>
    </section>
  );
};

export default NewArrivals;

import React from "react";

const Preview = ({ item }) => {
  return (
    <div className="preview">
      <div className="">
        <h1>{item.name}</h1>
        <p>{item.desc}</p>
        <img src={item.src} alt="" />
      </div>
    </div>
  );
};

export default Preview;

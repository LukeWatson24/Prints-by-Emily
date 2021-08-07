import React from "react";
import { Link } from "react-router-dom";
import buildingBackground from "../assets/images/old_building.jpg";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-container">
        <img src={buildingBackground} alt="" />

        <div className="landing-content">
          <h1>Photography</h1>
          <p>New prints available</p>
          <Link to="/shop">
            <button>
              <p>Shop now</p>
            </button>
          </Link>
        </div>
      </div>
      {/* <div className="test">
        <h1>TEST</h1>
      </div> */}
    </div>
  );
};

export default Landing;

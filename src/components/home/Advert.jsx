import React from "react";
import "../../styles/Advert.css";
import { PiMouseScrollDuotone } from "react-icons/pi";

const Advert = () => {
  return (
    <div className="outerAdvert">
      <img src="src/assets/logo-removebg.png" alt="" />
      <div className="innerAdvert">
        <h1>Welcome to HungryHeist's Restaurant Page!</h1>
        <h3>
          Discover and order from your favorite local restaurants with ease.
          Explore our interactive map, find the perfect spot, and enjoy
          delicious meals delivered right to your doorstep.
        </h3>
      </div>
    </div>
  );
};

export default Advert;

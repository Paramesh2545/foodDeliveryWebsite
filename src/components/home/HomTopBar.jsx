import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import "../../styles/HomeTop.css";
import "../../styles/navbar.css";
import { useRestaurantContext } from "../../context/RestaurantContext";

const HomTopBar = () => {
  const { cat, setCat } = useRestaurantContext();
  return (
    <div className="mainTop">
      <h3 className="catogery">catogery</h3>
      <div className="dishes">
        <div className="innerdishes">
          <div className="mainDish"></div>
          <p
            className={cat == "all" ? "selected item" : "item"}
            onClick={(e) => setCat("all")}
          >
            All
          </p>
          <p
            className={cat == "Indian" ? "selected item" : "item"}
            onClick={(e) => setCat("Indian")}
          >
            Indian
          </p>
          <p
            className={cat == "Vegetarian Friendly" ? "selected item" : "item"}
            onClick={(e) => setCat("Vegetarian Friendly")}
          >
            vegetarian
          </p>
          <p
            className={cat == "Asian" ? "selected item" : "item"}
            onClick={(e) => setCat("Asian")}
          >
            Asian
          </p>
          <p
            className={cat == "Italian" ? "selected item" : "item"}
            onClick={(e) => setCat("Italian")}
          >
            Italian
          </p>
          <p
            className={cat == "Cafe" ? "selected item" : "item"}
            onClick={(e) => setCat("Cafe")}
          >
            Cafe
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomTopBar;

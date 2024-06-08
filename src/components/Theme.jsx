import React from "react";
import "../styles/Theme.css";
import { useRestaurantContext } from "../context/RestaurantContext";
const Theme = () => {
  const { darkMode, setDarkMode } = useRestaurantContext();
  const mode = () => {
    console.log(darkMode);
  };
  return (
    <div onClick={mode}>
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode((prevTheme) => !prevTheme)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Theme;

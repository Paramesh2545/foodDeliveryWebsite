import React, { createContext, useContext, useRef, useState } from "react";

const RestaurantContext = createContext();

export const useRestaurantContext = () => useContext(RestaurantContext);

export const RestaurantProvider = ({ children }) => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [cat, setCat] = useState("all");
  const [fav, setFav] = useState([]);
  const [cart, setCart] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const cafe= useRef();
  return (
    <RestaurantContext.Provider
      value={{
        restaurantData,
        setRestaurantData,
        fav,
        setFav,
        cart,
        setCart,
        cat,
        setCat,
        lng,
        setLng,
        lat,
        setLat,
        darkMode,
        setDarkMode,
        cafe,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

import React, { createContext, useState, useContext } from 'react';

const HoverContext = createContext();

export const HoverProvider = ({ children }) => {
  const [hoveredRestaurant, setHoveredRestaurant] = useState(null);

  return (
    <HoverContext.Provider value={{ hoveredRestaurant, setHoveredRestaurant }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHoverContext = () => useContext(HoverContext);

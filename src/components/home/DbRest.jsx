import React, { useEffect } from "react";

const DbRest = () => {
  const BASE_URL = "http://localhost:4000";
  useEffect(() => {
    try {
      const res = fetch(`${BASE_URL}/menuItems`);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <div></div>;
};

export default DbRest;

import React, { useEffect, useRef } from "react";
import "../styles/NearBy.css";
import { useRestaurantContext } from "../context/RestaurantContext";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import mapboxgl from "mapbox-gl";
import Map from "../components/nearby/Map";
import GetRestaurants from "../constants/GetRestaurants";
import Side from "../components/nearby/Side";
import { HoverProvider } from "../context/HoverContext";

const Nearby = () => {
  const { restaurantData, setRestaurantData, lat, setLat, lng, setLng } =
    useRestaurantContext();
  const [show, setShow] = useState(false);
  // var srestaurant;
  // const Token = process.env.publicTokenMapBoxGl;
  useEffect(() => {
    const getRes = async () => {
      GetRestaurants()
        .then((restaurant) => {
          console.log(restaurant);
          setRestaurantData(restaurant);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getRes();
    const timer = setTimeout(() => {
      setShow(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HoverProvider>
      <div className="mainMap">
        <Map restaurantData={restaurantData} className="map" />
        <div className="sideRes">
          {show && <Side restaurantData={restaurantData} />}
        </div>
      </div>
    </HoverProvider>
  );
};

export default Nearby;

import React, { useEffect, useRef } from "react";
import "../styles/NearBy.css";
import { useRestaurantContext } from "../context/RestaurantContext";
import axios from "axios";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import mapboxgl from "mapbox-gl";

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser.");
      return;
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject("Error in getting location");
      }
    );
  });
};

const Nearby = () => {
  const { restaurantData, setRestaurantData, lat, setLat, lng, setLng } =
    useRestaurantContext();
  const langi = null,
    lati = null;
  // const Token = process.env.publicTokenMapBoxGl;
  useEffect(() => {
    getLocation()
      .then((location) => {
        const { latitude, longitude } = location;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        setLat(latitude);
        setLng(longitude);
        langi = parseFloat(longitude);
        lati = parseFloat(latitude);
      })
      .catch((error) => {
        console.error(error);
      });
    const getRest = async () => {
      const sLat = parseFloat(lati - 0.1799);
      const sLong = parseFloat(langi - 0.1799);
      const eLat = parseFloat(lati + 0.1799);
      const eLong = parseFloat(langi + 0.1799);
      const cachedData =
        JSON.parse(localStorage.getItem("cachedRestaurantDetails")) || [];
      const locationKey = `${lat},${lng}`;

      if (isNaN(sLat) || isNaN(sLong) || isNaN(eLat) || isNaN(eLong)) {
        console.log("aree av number kavu ra");
        console.log(lat);
      } else if (
        cachedData.latitude === lati &&
        cachedData.longitude === langi
      ) {
        console.log("cached data.latitude");
        console.log(cachedData);
        try {
          console.log("got to");
          const parsedData = cachedData;
          console.log("from cached data ");
          // console.log(JSON.parse(cachedData));
          setRestaurantData(parsedData);
        } catch (err) {
          console.log(err);
          // localStorage.removeItem("cachedRestaurantDetails");
        }
      } else {
        const options = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
          params: {
            bl_latitude: sLat,
            tr_latitude: eLat,
            bl_longitude: sLong,
            tr_longitude: eLong,
            restaurant_tagcategory_standalone: "10591",
            restaurant_tagcategory: "10591",
            limit: "300",
            currency: "USD",
            open_now: "false",
            lunit: "km",
            lang: "en_US",
          },
          headers: {
            "X-RapidAPI-Key":
              "1b9396c52cmsh0d5cfe2dd92c189p11aaedjsn04ad484be8f5",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };
        try {
          const response = await axios.request(options);
          console.log("Fetched restaurant data:", response.data);
          // setResDetails(response.data);
          const latitude = `${lat}`;
          const longitude = `${lng}`;
          const newData = {
            ...response.data,
            latitude: lat,
            longitude: lng,
          };
          console.log(newData);
          localStorage.setItem(
            "cachedRestaurantDetails",
            JSON.stringify(newData)
          );
          setRestaurantData(newData);
          // console.log(restaurantData);
          // console.log(JSON.parse(cachedData));
        } catch (error) {
          console.error(error);
        }
      }
    };
    getRest();
  }, []);

  const [map, setMap] = useState(null);
  const mapContainer = React.createRef();
  // let markerCoordinates = { lat, lng };
  mapboxgl.accessToken =process.env.publicTokenMapBoxGl;
  useEffect(() => {
    if (mapContainer.current && !map) {
      const initializeMap = () => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/paramesh2005/clw7kpezj02rv01qze47ogzxz", // stylesheet location
          center: [lng, lat],
          zoom: 15, // starting zoom
          width: "100%",
          height: "100vh",
          pitch: 60,
          bearing: 45,
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        map.on("load", () => {
          setMap(map);
          map.resize();
        });
      };

      if (!map) initializeMap();
    }
    if (map && restaurantData) {
      restaurantData.data.forEach((element) => {
        var lat = parseFloat(element.latitude);
        var lng = parseFloat(element.longitude);
        console.log(lat, lng);
        if ((!isNaN(lat) || !isNaN(lng)) && (lat !== null || lng !== null)) {
          console.log("came to marker");
          new mapboxgl.Marker({ color: "red" })
            .setLngLat([lng, lat])
            .addTo(map);
        }
      });
    }
  }, [map, mapContainer]);

  // useEffect(() => {
  // if (map && markerCoordinates) {
  //   new mapboxgl.Marker({ color: "red" })
  //     .setLngLat(markerCoordinates)
  //     .addTo(map);
  // }
  // }, [map, markerCoordinates]);

  return (
    <div className="mainMap">
      <div className="map" ref={mapContainer}></div>
      <div className="sideRes">{restaurantData !== null && <></>}</div>
    </div>
  );
};

export default Nearby;

import React, { useState, useEffect } from "react";
import GetCoordinate from "./GetCoordinate";
// import { useRestaurantContext } from "../context/RestaurantContext";
import axios from "axios";

const GetRestaurants = (props) => {
  //   const { restaurantData, setRestaurantData } = useState([]);

  return new Promise(async (resolve, reject) => {
    var slatitude = 1.0;
    var slongitude = 1.0;
    await GetCoordinate()
      .then((location) => {
        const { latitude, longitude } = location;
        slatitude = parseFloat(latitude);
        slongitude = parseFloat(longitude);
      })
      .catch((error) => {
        console.error(error);
      });

    const sLat = parseFloat(slatitude - 0.1799);
    const sLong = parseFloat(slongitude - 0.1799);
    const eLat = parseFloat(slatitude + 0.1799);
    const eLong = parseFloat(slongitude + 0.1799);
    const cachedData =
      JSON.parse(localStorage.getItem("cachedRestaurantDetails")) || [];
    const locationKey = `${slatitude},${slongitude}`;

    if (isNaN(sLat) || isNaN(sLong) || isNaN(eLat) || isNaN(eLong)) {
      console.log("aree av number kavu ra");
      console.log(slatitude);
      reject("not a number");
    } else if (
      cachedData.latitude === slatitude &&
      cachedData.longitude === slongitude
    ) {
      console.log(cachedData);
      try {
        const parsedData = cachedData;
        console.log("from cached data ");
        const temp = parsedData.data;
        resolve(parsedData.data);
      } catch (err) {
        console.log(err);
        reject("not there");
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
        // setResDetails(response.data)
        const newData = {
          ...response.data,
          latitude: slatitude,
          longitude: slongitude,
        };
        // console.log(response.data);
        localStorage.setItem(
          "cachedRestaurantDetails",
          JSON.stringify(newData)
        );
        // setRestaurantData(newData);
        resolve(response.data);
      } catch (error) {
        console.error(error);
        reject("can't get data from api");
      }
    }
  });
};

export default GetRestaurants;

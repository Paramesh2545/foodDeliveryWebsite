import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import "../../styles/RestaurantDetails.css";
import "../../styles/navbar.css";
import { BsShop } from "react-icons/bs";
import { FaArrowsAltV } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdStars } from "react-icons/md";
import HomTopBar from "./HomTopBar";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import { useRestaurantContext } from "../../context/RestaurantContext";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

const HomeMain = (props) => {
  const { setRestaurantData, cat, setCat } = useRestaurantContext();
  const { fav, setFav } = useRestaurantContext();
  const lat = parseFloat(props.latitude);
  const lng = parseFloat(props.longitude);
  const [resDetails, setResDetails] = useState(null);
  // const filteredCuisines = restaurant.cuisine.name.filter(cuisine => cuisine.type === 'italian');

  useEffect(() => {
    const getRest = async () => {
      const sLat = parseFloat(lat - 0.1799);
      const sLong = parseFloat(lng - 0.1799);
      const eLat = parseFloat(lat + 0.1799);
      const eLong = parseFloat(lng + 0.1799);
      const cachedData =
        JSON.parse(localStorage.getItem("cachedRestaurantDetails")) || [];
      const locationKey = `${lat},${lng}`;

      if (isNaN(sLat) || isNaN(sLong) || isNaN(eLat) || isNaN(eLong)) {
        console.log("aree av number kavu ra");
        console.log(lat);
      } else if (cachedData.latitude === lat && cachedData.longitude === lng) {
        console.log("cached data.latitude");
        console.log(cachedData);
        try {
          console.log("got to");
          const parsedData = cachedData;
          console.log("from cached data ");
          // console.log(JSON.parse(cachedData));
          setResDetails(parsedData);
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
          setResDetails(response.data);
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
          // console.log(JSON.parse(cachedData));
        } catch (error) {
          console.error(error);
        }
      }
    };
    getRest();
    // console.log(resDetails);
  }, [lat, lng]);
  const handleViewMenu = (res) => {
    setRestaurantData(res);
  };
  const addFavRes = (restaurant) => {
    setFav(...fav, restaurant.location_id);
  };
  // const filteredRestaurants = resDetails.filter(restaurant =>
  //   cat === "all" || restaurant.data.cuisine.some(cuisine => cuisine.name === cat)
  // );

  return (
    <div>
      <div className="Homtopbar">
        <HomTopBar />
      </div>
      {resDetails && (
        <div className="outerMain">
          {resDetails.data.map((restaurant) => (
            <>
              {restaurant.photo &&
                (cat === "all" ||
                  restaurant.cuisine.some(
                    (cuisine) => cuisine.name === cat
                  )) && (
                  <Link
                    to={{
                      pathname: `/restaurant/${restaurant.location_id}`,
                    }}
                    style={{
                      textDecoration: "none",
                    }}
                    className="link"
                    onClick={() => handleViewMenu(restaurant)}
                  >
                    <div className="resmainbody">
                      <div className="restaurant" key={restaurant.id}>
                        <div className="resfirst">
                          <div className="innerFirst">
                            <img
                              className="restImg"
                              src={`${restaurant.photo.images.medium.url}`}
                              alt=""
                            />
                            <div className="ressecond">
                              <h2 className="resName">{restaurant.name}</h2>
                              <p className="resDetails">
                                {restaurant.description}
                              </p>
                              <div className="rating">
                                <MdStars className="star" />
                                <p>{restaurant.rating} ratings</p>
                              </div>
                              <h4 className="offers">
                                price range:- {restaurant.price_level}
                              </h4>
                            </div>
                          </div>
                          <div className="fav">
                            <MdFavoriteBorder className="favIcon" />
                          </div>
                        </div>

                        <div className="resthird">
                          <div className="dist">
                            <div className="shop">
                              <BsShop className="shopImg" />
                              <p>{restaurant.address}</p>
                            </div>
                            <div className="outerdots">
                              <FaArrowsAltV className="dots" />
                              <p>{restaurant.distance_string}</p>
                            </div>
                            <div className="user">
                              <CiLocationOn className="userImg" />
                              <p>example user's location</p>
                            </div>
                          </div>
                          {/* <div className="order">
                          <Link
                            to={{
                              pathname: `/restaurant/${restaurant.location_id}`,
                            }}
                            onClick={() => handleViewMenu(restaurant)}
                          >
                            <p className="menuitemsbtn">see menu items</p>
                          </Link>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeMain;

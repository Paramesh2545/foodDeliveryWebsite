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
import { MdOutlineMenuBook } from "react-icons/md";
import { useFav } from "../../Hooks/useFav";
import DbRest from "./DbRest";

const HomeMain = (props) => {
  const { setRestaurantData, cat, setCat, darkMode, setDarkMode } =
    useRestaurantContext();
  // const { fav, setFav } = useRestaurantContext();
  const lat = parseFloat(props.latitude);
  const lng = parseFloat(props.longitude);
  const [resDetails, setResDetails] = useState(null);
  const [loaded, setLoaded] = useState(false);
  // const filteredCuisines = restaurant.cuisine.name.filter(cuisine => cuisine.type === 'italian');
  const { setItem, getItem } = useFav("fav");
  // const favItems = getItem();
  const temp = getItem();
  const [favItems, setFavItems] = useState(temp);
  // const favitems = [];
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
          setLoaded(true);
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
          setLoaded(true);
          // console.log(JSON.parse(cachedData));
        } catch (error) {
          console.error(error);
        }
      }
    };
    getRest();
    setFavItems(getItem());
    // favitems = getItem();
  }, [lat, lng]);
  const handleViewMenu = (res) => {
    setRestaurantData(res);
  };
  const addFavRes = (id) => {
    // setFav([...fav, id]);
    // console.log(fav);
    //   setItem([{ restId: 2 }, [{ item: 1 }, { item: 2 }]]);
    //   console.log(getItem());
    // add("1", "2");

    const items = getItem();
    let updated = [];
    if (items.includes(id)) {
      updated = items.filter((favId) => favId !== id);
      console.log("to includes");
    } else {
      updated = items === undefined ? [id] : [...items, id];
    }
    setItem(updated);
    setFavItems(updated);
    // favitems=updated;
  };

  return (
    <div>
      <div className="Homtopbar">
        <HomTopBar />
      </div>
      {!loaded && (
        <div className="loading">
          <div class="loader">
            <div class="wrapper">
              <div class="circle"></div>
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
              <div class="line-4"></div>
            </div>
          </div>
          <div class="loader">
            <div class="wrapper">
              <div class="circle"></div>
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
              <div class="line-4"></div>
            </div>
          </div>
          <div class="loader">
            <div class="wrapper">
              <div class="circle"></div>
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
              <div class="line-4"></div>
            </div>
          </div>
          <div class="loader">
            <div class="wrapper">
              <div class="circle"></div>
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
              <div class="line-4"></div>
            </div>
          </div>
          <div class="loader">
            <div class="wrapper">
              <div class="circle"></div>
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
              <div class="line-4"></div>
            </div>
          </div>
          <div class="loader">
            <div class="wrapper">
              <div class="circle"></div>
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
              <div class="line-4"></div>
            </div>
          </div>
        </div>
      )}
      <DbRest />
      {resDetails && (
        <div className="outerMain">
          {resDetails.data.map((restaurant) => (
            <>
              {restaurant.photo &&
                (cat === "all" ||
                  restaurant.cuisine.some(
                    (cuisine) => cuisine.name === cat
                  )) && (
                  // <Link
                  //   to={{
                  //     pathname: `/restaurant/${restaurant.location_id}`,
                  //   }}
                  //   style={{
                  //     textDecoration: "none",
                  //   }}
                  //   className="link"
                  //   onClick={() => handleViewMenu(restaurant)}
                  // >
                  <div
                    className={
                      darkMode
                        ? "resmainbody-dark moveUP "
                        : "resmainbody-light moveUP"
                    }
                    key={restaurant.id}
                  >
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
                          <MdFavoriteBorder
                            // className="favIcon"
                            className={
                              favItems.includes(restaurant.location_id)
                                ? "favIcon include"
                                : "favIcon"
                            }
                            onClick={(e) => {
                              addFavRes(restaurant.location_id);
                            }}
                          />
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
                        <div className="order">
                          <Link
                            to={{
                              pathname: `/restaurant/${restaurant.location_id}`,
                            }}
                            style={{
                              textDecoration: "none",
                            }}
                            onClick={() => handleViewMenu(restaurant)}
                          >
                            {/* <p className="menuitemsbtn">see menu items</p> */}
                            <MdOutlineMenuBook className="menuitemsbtn menubtn" />
                            <h3>Explore our</h3>
                            <h3>menu</h3>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  //  </Link>
                )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeMain;

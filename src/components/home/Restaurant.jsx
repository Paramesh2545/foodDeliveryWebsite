import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRestaurantContext } from "../../context/RestaurantContext";
import "../../styles/RestaurantDetails.css";
import { MdFavoriteBorder } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { FaArrowsAltV } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdStars } from "react-icons/md";
import HomTopBar from "./HomTopBar";
import "../../styles/RestMenu.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

const restaurantData = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  let menu = [];
  // const getBG = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.unsplash.com/search/photos?query=food-background`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Client-ID 4mWJt3hmO0nxOTRn1xDKpqV1g_eM9cPKZ71kNwVq1AQ", // Replace YOUR_ACCESS_KEY_HERE with your Unsplash access key
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setImages(data.results);
  //   } catch (error) {
  //     console.error("Error fetching images:", error);
  //   }
  // };
  useEffect(() => {
    // getBG();
    // console.log(images);
    // const get = async () => {
    //   try {
    //     const BASE_URL = "http://localhost:4000";
    //     const response = await axios.get(`${BASE_URL}/menuItems`, {
    //       cuisine: "Indian",
    //     });
    //     // setMenu(response.data);
    //     menu = response.data;
    //     console.log(response.data);
    //     let filteredMenuItems = menu.filter((item) =>
    //       restaurantData.cuisine.includes(item.name)
    //     );
    //     console.log(filteredMenuItems);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // get();
  }, []);

  const { restaurantData } = useRestaurantContext();
  console.log(restaurantData);

  const goBack = () => {
    history.back();
  };
  return (
    <div className="orderFood">
      <div className="back" onClick={goBack}>
        <IoMdArrowRoundBack className="back backicon" />
      </div>
      <div className="resmenubody menu">
        <div className="restaurantData" key={restaurantData.id}>
          <div className="resfirst">
            <div className="innerFirst">
              <img
                className="restImg"
                src={`${restaurantData.photo.images.medium.url}`}
                alt=""
              />
              <div className="ressecond">
                <h2 className="resName">{restaurantData.name}</h2>
                <p className="resDetails">{restaurantData.description}</p>
                <div className="rating">
                  <MdStars className="star" />
                  <p>{restaurantData.rating} ratings</p>
                </div>
                <h4 className="offers">
                  price range:- {restaurantData.price_level}
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
                <p>{restaurantData.address}</p>
              </div>
              <div className="outerdots">
                <FaArrowsAltV className="dots" />
                <p>{restaurantData.distance_string}</p>
              </div>
              <div className="user">
                <CiLocationOn className="userImg" />
                <p>example user's location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="menuItemsOuter">
        <div className="about">
          <h2>Veg Biryan</h2>
          <p>1K+ Rating</p>
          <p className="cost">R200</p>
        </div>
        <div className="image">
          <img src="src/assets/biryani.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default restaurantData;

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
import { Menu } from "../../constants/Menuitems";
import { auth } from "../../loginFirebase";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

const restaurantData = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const { currentUserId } = useRestaurantContext();
  let menu = [];
  // const cartItems = [{ restId, items: [{ id, quant }] }];
  const { setItem, getItem } = useLocalStorage("value");
  useEffect(() => {
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
    // const cart = async () => {
    //   try {
    //     console.log(auth.currentUser.uid);
    //     const uid = auth.currentUser.uid.toString();
    //     console.log(typeof uid);
    //     const BASE_URL = "http://localhost:4000";
    //     const response = await axios.get(`${BASE_URL}/getCart`, {
    //       params: {
    //         uid: uid,
    //       },
    //     });
    //     console.log(response);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // cart();
    // const add = () => {
    //   setItem([{ restId: 2 }, [{ item: 1 }, { item: 2 }]]);
    // };
    // add();
    // const get = () => {
    //   console.log(getItem());
    // };
    // get();
    // add("1", "2");
  }, []);
  const [cart, setCart] = useState(null);
  const add = ({ details }) => {
    setCart(...cart, details);
  };

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
        {/* <div className="innerMenuitems"> */}
        {Menu.map((men) => (
          <div className="menuitem" key={men.id}>
            <img src={men.url} alt="" className="img" />
            <div className="about">
              <div className="innerabout">
                <h2>{men.name}</h2>
                <p>{men.Rating} Rating</p>
                <p className="cost">₹{men.price}</p>
              </div>
              <div className="btn">
                <button>Add</button>
              </div>
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default restaurantData;

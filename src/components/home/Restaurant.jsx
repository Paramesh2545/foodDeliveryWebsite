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
import { IoMdAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";

const restaurantData = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const { currentUserId } = useRestaurantContext();
  let menu = [];
  const { setItem, getItem } = useLocalStorage("value");
  const [cartItems, setCartItems] = useState(null);
  const [itemIds, setItemIds] = useState(null);
  const [quant, setQuant] = useState(null);
  const { restaurantData } = useRestaurantContext();

  const get = () => {
    setCartItems(getItem());
    const cartItem = getItem();
    if (cartItem[0].restId === parseInt(restaurantData.location_id)) {
      const itemi = cartItem[0].items.map((element) => element.itemId);
      setItemIds(itemi);
      const qua = cartItem[0].items.map((element) => element.quant);
      setQuant(qua);
    }
  };

  useEffect(() => {
    // cart();
    // const add = () => {
    //   setItem([{ restId: 2 }, [{ item: 1 }, { item: 2 }]]);
    // };
    // add();

    get();
    // add("1", "2");
  }, []);
  const [cart, setCart] = useState(null);
  const add = (id) => {
    // const cartItems = getItem();
    // setItem([
    //   {
    //     restId: 946888,
    //     items: [
    //       {
    //         itemId: 1,
    //         quant: 2,
    //       },
    //       {
    //         itemId: 2,
    //         quant: 1,
    //       },
    //     ],
    //   },
    // ]);
    // console.log(cartItems[0].items[0].itemId);
    if (cartItems.length > 0) {
      if (cartItems[0].restId === parseInt(restaurantData.location_id)) {
        setItem([
          {
            restId: restaurantData.location_id,
            items: [
              ...cartItems[0].items,
              {
                itemId: parseInt(id),
                quant: 1,
              },
            ],
          },
        ]);
        // console.log("done");
      }
    } else {
      setItem([
        {
          restId: restaurantData.location_id,
          items: [
            {
              itemId: id,
              quant: 1,
            },
          ],
        },
      ]);
      get();
    }
  };

  const goBack = () => {
    history.back();
  };

  const isItemInCart = (id) => {
    const there = cartItems
      ? cartItems[0].items.find((item) => item.itemId === parseInt(id))
      : null;
    // console.log(there);
    return there ? true : false;
  };
  // isItemInCart()
  const getQuan = (id) => {
    const quantity = cartItems[0].items.find(
      (item) => item.itemId === parseInt(id)
    );
    // console.log(quantity);
    return quantity ? quantity.quant : 0;
  };

  const increase = (id) => {
    const updatedCartItems = cartItems.map((cart) => {
      if (cart.restId === restaurantData.location_id) {
        const updatedItems = cart.items.map((item) => {
          if (item.itemId === parseInt(id)) {
            return {
              ...item,
              quant: item.quant + 1,
            };
          }
          return item;
        });
        return {
          ...cart,
          items: updatedItems,
        };
      }
      return cart;
    });
    console.log(updatedCartItems);
    // setCart(updatedCartItems);
    setItem(updatedCartItems);
    setCartItems(updatedCartItems);
    console.log("changed");
  };
  const decrease = () => {};

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
                {cartItems && isItemInCart(men.id) ? (
                  <>
                    <div className="menquantity">
                      <IoIosRemove
                        className="decbtn"
                        onClick={(e) => decrease(men.id)}
                      />
                      <p className="para" key={cartItems}>
                        {getQuan(men.id)}
                      </p>
                      <IoMdAdd
                        className="addbtn"
                        onClick={(e) => increase(men.id)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={(e) => add(men.id)}>Add</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default restaurantData;

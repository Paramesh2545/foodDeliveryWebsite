import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { FaArrowsAltV } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdStars } from "react-icons/md";
import "../../styles/MapSide.css";
import { useHoverContext } from "../../context/HoverContext";

const Side = (props) => {
  const { hoveredRestaurant, setHoveredRestaurant } = useHoverContext();
  const restaurantData = props.restaurantData;
  //   console.log(restaurantData);
  const handleClick = (id) => {};
  return (
    <div className="mainSide">
      {restaurantData !== null && (
        <>
          {restaurantData?.map((restaurant) => (
            <div className="mainres">
              {restaurant.photo && (
                <div
                  className="resmainbody"
                  onMouseEnter={(e) =>
                    setHoveredRestaurant({
                      latitude: parseFloat(restaurant.latitude),
                      longitude: parseFloat(restaurant.longitude),
                    })
                  }
                  nMouseLeave={() => setHoveredRestaurant(null)}
                  onClick={(e) => handleClick(restaurant.location_id)}
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
                          <p className="resDetails">{restaurant.description}</p>
                          <div className="rating">
                            <MdStars className="star" />
                            <p>{restaurant.rating} ratings</p>
                          </div>
                          <h4 className="offers">
                            price range:- {restaurant.price_level}
                          </h4>
                        </div>
                      </div>
                      {/* <div className="fav">
                        <MdFavoriteBorder className="favIcon" />
                      </div> */}
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
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Side;

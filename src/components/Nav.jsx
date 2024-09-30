import React, { useEffect, useState } from "react";
import { GrMapLocation } from "react-icons/gr";
import { CiHome } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { IoMdPerson } from "react-icons/io";
import "../styles.css";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { PiHamburgerBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaLessThan } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useRestaurantContext } from "../context/RestaurantContext";
import Theme from "../components/Theme";
import { getAuth, signOut } from "firebase/auth";
// import { auth } from "../loginFirebase";
const Nav = () => {
  const [hamClicked, setHamClicked] = useState(false);
  const [small, setSmall] = useState(false);
  const { darkMode, setDarkMode } = useRestaurantContext();
  var signedIn;
  const auth = getAuth();

  const logout = () => {
    signOut(auth).then(() => {
      console.log("signedout");
      window.location.reload(false);
    });
  };

  const handleResize = () => {
    if (window.innerWidth < 610) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  };
  window.addEventListener("resize", handleResize);
  const handlePush = () => {
    setHamClicked(!hamClicked);
  };
  return (
    <div className="navmain">
      <div className="logo">
        <img
          src="src/assets/heavenlyBites_logo.png"
          alt="logo"
          className="logoimg"
        />
      </div>
      <div className="links-container">
        {small && (
          <label className="hamburger">
            <input type="checkbox" />
            <svg viewBox="0 0 32 32">
              <path
                class="oline line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path class="oline" d="M7 16 27 16"></path>
            </svg>
          </label>
        )}
      </div>

      <div className={small ? "innerNavbar small" : "innerNavbar"}>
        {/* <div className="push" onClick={handlePush}>
          <FaLessThan />
        </div> */}
        <div className="innernav">
          <div className="navitems first">
            <NavLink
              to="/"
              className="links"
              style={{
                textDecoration: "none",
              }}
            >
              <h3 className="navelementsText">Home</h3>
            </NavLink>
          </div>
          <div className="navitems second">
            <NavLink
              to="/restaurant"
              className="links"
              style={{
                textDecoration: "none",
              }}
            >
              <h3 className="navelementsText">NearBy</h3>
            </NavLink>
          </div>
          <div className="navitems second">
            <NavLink
              to="/near"
              className="links"
              style={{
                textDecoration: "none",
              }}
            >
              <h3 className="navelementsText">Maps</h3>
            </NavLink>
          </div>
          <div className="navitems third">
            <NavLink
              to="/cart"
              className="links"
              style={{
                textDecoration: "none",
              }}
            >
              <h3 className="navelementsText">Cart</h3>
            </NavLink>
          </div>
          <div className="navitems fourth">
            <NavLink
              to="/profile"
              className="links"
              style={{
                textDecoration: "none",
              }}
            >
              <h3 className="navelementsText">Profile</h3>
            </NavLink>
          </div>
        </div>
      </div>

      {/* <div className="logout">
        <CiLogout />
        {hamClicked && <p className="text">Logout</p>}
      </div> */}
      {/* <div className={small ? "theme small" : "theme"}>
        <Theme />
      </div> */}
    </div>
  );
};

export default Nav;

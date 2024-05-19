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
const Nav = () => {
  const [hamClicked, setHamClicked] = useState(false);
  const [small, setSmall] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 400) {
      setSmall(true);
    }
  };
  window.addEventListener("resize", handleResize);
  const handlePush = () => {
    setHamClicked(!hamClicked);
  };
  return (
    <div className={!hamClicked ? "navmain" : "navmain aniIncre"}>
      <div className={!hamClicked ? "innerNavbar" : "innerNavbar aniIncre"}>
        {/* <div className="push" onClick={handlePush}>
          <FaLessThan />
        </div> */}
        <div className="innernav">
          <div className="navitems first">
            <NavLink to="/" className="links"  style={{
                      textDecoration: "none",
                    }}>
              <h3 className="navelementsText">Home</h3>
            </NavLink>
          </div>
          <div className="navitems second">
            <NavLink to="/near" className="links"  style={{
                      textDecoration: "none",
                    }}>
              <h3 className="navelementsText">NearBy</h3>
            </NavLink>
          </div>
          <div className="navitems third">
            <NavLink to="/cart" className="links"  style={{
                      textDecoration: "none",
                    }}>
              <h3 className="navelementsText">Cart</h3>
            </NavLink>
          </div>
          <div className="navitems fourth">
            <NavLink to="/profile" className="links"  style={{
                      textDecoration: "none",
                    }}>
              <h3 className="navelementsText">Profile</h3>
            </NavLink>
          </div>
        </div>
      </div>
      {/* <div className="logout">
        <CiLogout />
        {hamClicked && <p className="text">Logout</p>}
      </div> */}
    </div>
  );
};

export default Nav;

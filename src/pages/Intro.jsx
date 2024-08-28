import React, { Suspense, useEffect, useRef, useState } from "react";
import { Cafe } from "../components/Intro/Cafe_gltf";
import IntroLoader from "../components/Intro/IntroLoader";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import "../styles/Intro.css";
import { PerspectiveCamera, useGLTF, Html } from "@react-three/drei";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRestaurantContext } from "../context/RestaurantContext";
import { PiMouseScrollDuotone } from "react-icons/pi";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { auth } from "../loginFirebase";
gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const navigate = useNavigate();
  const gotoRest = () => {
    navigate("/restaurant");
  };

  return (
    <div className="introPage">
      <div className="section1">
        <div className="intromainside">
          <img
            className="droneLogo"
            src="src/assets/home_page/drone_carriage.png"
            alt="drone carriage"
          />
          <h1>Heavenly Bites</h1>
          <div className="buttons">
            <button className="boton-elegante" onClick={gotoRest}>
              Order Now
            </button>
          </div>
        </div>
        <div className="scroll">
          <PiMouseScrollDuotone />
          Scroll Down
        </div>
      </div>
      <div className="secondSection"></div>
    </div>
  );
};

export default Intro;

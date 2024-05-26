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
import { NavLink } from "react-router-dom";

const Intro = () => {
  // const [stickySection, setStickySection] = useState(null);

  // const handleScroll = () => {
  //   const sections = document.querySelectorAll('.section');
  //   let lastSticky = null;

  //   sections.forEach((section) => {
  //     const rect = section.getBoundingClientRect();
  //     if (rect.top <= 0) {
  //       lastSticky = section.id;
  //     }
  //   });

  //   setStickySection(lastSticky);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div className="fullIntroDIV">
      <div className="canvas">
        <Canvas
          className="fullIntro"
          shadows
          camera={{ position: [0, 0, 0], fov: 50 }}
        >
          <Suspense>
            <OrbitControls />
            <ambientLight intensity={1} />
            <ScrollControls pages={3} damping={0.25}>
              <directionalLight
                castShadow
                position={[5, 10, 7.5]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />
              <hemisphereLight
                skyColor="#b1e1ff"
                groundColor="#000000"
                intensity={8}
              />
              <Cafe className="model" position={[-1, -3, -15]} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      <div className="mainIntro section">
        <div className="text">
          <h1>WELCOME TO HUNGRYHEIST!</h1>
          <div className="scroll">
            <PiMouseScrollDuotone />
            Scroll Down
          </div>
        </div>
        <div className="secondIntro section">
          <img
            src="src/assets/deliveryManSecond.jpg"
            alt=""
            className="image"
          />
          <div className="secondText">
            <h1>Lightning-Fast Delivery</h1>
            <h3>Fresh Food, Delivered at Your Doorstep in No Time!</h3>
            <p>
              At HungryHeist, we understand that your time is precious. That's
              why we pride ourselves on providing lightning-fast delivery
              services that ensure your food reaches you hot and fresh. Whether
              you're at home, at work, or on the go, you can count on us to
              deliver your favorite meals quickly and efficiently. Our dedicated
              delivery team uses the latest technology to optimize routes and
              reduce wait times, so you can enjoy your meal without delay.
            </p>
            <NavLink
              to="/restaurant"
              className="linksIntro"
              style={{
                textDecoration: "none",
              }}
            >
              Order Now
            </NavLink>
          </div>
        </div>
        <div className="thirdIntro section">
          <div className="lefttext">
            <h1>Explore & Order with Ease</h1>
            <h2>Find Restaurants Near You on the Map</h2>
            <p>
              At HungryHeist, we make it simple for you to find the best
              restaurants around you. Use our interactive map to discover nearby
              eateries, browse their menus, and place your order with just a few
              clicks. Whether you're at home, at work, or on the go, our map
              feature ensures you can always find delicious food close by.
            </p>
            <NavLink
              to="/near"
              className="linksIntro"
              style={{
                textDecoration: "none",
              }}
            >
              Visit Maps
            </NavLink>
          </div>
          <div className="rightimg">
            <img src="src/assets/map1.png" alt="" />
          </div>
        </div>
        <div className="reviews">
          <div className="rev">
            <h3>Jane Doe ⭐⭐⭐⭐⭐</h3>
            <p>
              "I've been using HungryHeist for a few months now, and it's been a
              game-changer! The variety of restaurants available is impressive,
              and the food always arrives hot and delicious. The map feature
              makes it super easy to find and order from my favorite local
              spots. Highly recommended!"
            </p>
          </div>
          <div className="rev">
            <h3>John Smith ⭐⭐⭐⭐</h3>
            <p>
              "Great service with fast delivery times! I love how easy it is to
              navigate the website and find what I'm craving. The hygiene
              standards are top-notch, and I've never had any issues with my
              orders. A solid choice for anyone looking to get quality food
              delivered quickly."
            </p>
          </div>
          <div className="rev">
            <h3>Emily Johnson ⭐⭐⭐⭐⭐</h3>
            <p>
              "HungryHeist has made ordering food so convenient. The restaurant
              selection is diverse, and the user interface is intuitive. I
              appreciate the attention to hygiene and quality, which is evident
              in every order I've received. Keep up the great work!"
            </p>
          </div>
          {/* <div className="rev"></div> */}
          {/* <div className="rev"></div> */}
        </div>
        <div className="footer">
          <div className="footerText">
            <h1>Project made by failure</h1>
          </div>
          <img src="src/assets/paramesh.png" alt="" className="personal" />
        </div>
      </div>
    </div>
  );
};

export default Intro;

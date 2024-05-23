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
const Intro = () => {
  const modelRef = useRef();

  return (
    <div className="fullIntroDIV">
      <div className="canvas">
        <Canvas
          ref={modelRef}
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
      <div className="mainIntro">
        <div className="text">
          <h1>WELCOME TO HUNGRYHEIST!</h1>
        </div>
        <div className="empty"></div>
      </div>
    </div>
  );
};

export default Intro;

import React, { Suspense } from "react";
import { Cafe } from "../components/Intro/Cafe_gltf";
import IntroLoader from "../components/Intro/IntroLoader";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../styles/Intro.css";
import { PerspectiveCamera, useGLTF, Html } from "@react-three/drei";

const Intro = () => {
  return (
    <div className="fullIntroDIV">
      <Canvas
        className="fullIntro"
        shadows
        camera={{ position: [15, 15, 10], fov: 50 }}
      >
        <Suspense>
          {/* <OrbitControls /> */}
          <ambientLight intensity={1} />
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
          <Cafe className="model" />
        </Suspense>
      </Canvas>
      <div className="text">
        <h1>WELCOME TO HUNGRYHEIST!</h1>
      </div>
    </div>
  );
};

export default Intro;

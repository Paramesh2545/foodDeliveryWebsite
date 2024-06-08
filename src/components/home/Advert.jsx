import React, { useState, useEffect } from "react";
import "../../styles/Advert.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Advert = () => {
  const images = [
    { src: "./src/assets/ratna_restaurant.jpg" },
    { src: "./src/assets/second_img.jpg" },
    { src: "./src/assets/third_image.jpg" },
  ];
  const res = [
    { name: "Ratna Restaurant" },
    { name: "Parivaar Veg Restaurant" },
    { name: "Mandi Restaurant" },
  ];
  const [present, setPresent] = useState(0);
  useEffect(() => {
    const change = setInterval(() => {
      // setPresent(present + 1);
      // console.log(present);
      if (present === 2) {
        setPresent(0);
        // console.log(present);
      } else {
        setPresent(present + 1);
        // console.log(present);
      }
    }, 3000);
    return () => clearInterval(change);
  }, [present]);

  const forward = () => {
    if (present === 2) {
      setPresent(0);
      // console.log(present);
    } else {
      setPresent(present + 1);
      // console.log(present);
    }
  };
  const back = () => {
    if (present === 0) {
      setPresent(2);
      // console.log(present);
    } else {
      setPresent(present - 1);
      // console.log(present);
    }
  };

  return (
    <div className="hero">
      <div className="adback" onClick={back}>
        <MdKeyboardArrowLeft className="arrow" />
      </div>
      <div className="adslider">
        <img
          key={present}
          src={images[present].src}
          alt=""
          className="adimage"
        />
        <div className="adtext">
          <h1>{res[present].name}</h1>
          <h3>Get 30% OFF now</h3>
        </div>
        <div className="addots">
          <div className={present === 0 ? "addo addoactive" : "addo"}></div>
          <div className={present === 1 ? "addo addoactive" : "addo"}></div>
          <div className={present === 2 ? "addo addoactive" : "addo"}></div>
        </div>
      </div>

      <div className="adback" onClick={forward}>
        <MdKeyboardArrowRight className="arrow" />
      </div>
    </div>
  );
};

export default Advert;

import React, { useEffect, useState } from "react";

const Loader = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <div className="loader">
      <video autoPlay muted loop id="vid">
        <source src="src/assets/loadingVid.mp4" type="video/mp4" />
        this is vid
      </video>
      {/* <img src="logo.png" alt="loading" /> */}
    </div>
  );
};

export default Loader;

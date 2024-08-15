import React, { createContext } from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Nearby from "./pages/Nearby";
import Profile from "./pages/Profile";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles.css";
import Mode from "./components/Mode";
import HomeMain from "./components/home/HomeMain";
import Restaurant from "./components/home/Restaurant";
import { RestaurantProvider } from "./context/RestaurantContext";
import MouseTracker from "./components/MouseTracker";
import ErrorBoundary from "./ErrorBoundary";
import Intro from "./pages/Intro";

const App = () => {
  const longitude = createContext(null);
  const latitude = createContext(null);
  return (
    <RestaurantProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <MouseTracker />
          <Routes>
            <Route path="/" element={<IntroWithNav />} />
            <Route path="/restaurant" element={<HomeWithNav />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/near" element={<NearbyWithNav />} />
            <Route path="/cart" element={<CartWithNav />} />
            <Route path="/profile" element={<ProfileWithNav />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </RestaurantProvider>
  );
};

// Wrapper components for routes with Nav

const IntroWithNav = () => {
  return (
    <>
      <Nav />
      <Intro />
    </>
  );
};

const HomeWithNav = () => {
  return <Home />;
};
const NearbyWithNav = () => (
  <>
    <Nav />
    <Nearby />
  </>
);

const CartWithNav = () => (
  <>
    <Nav />
    <Cart />
  </>
);

const ProfileWithNav = () => (
  <>
    <Nav />
    <Profile />
  </>
);


export default App;

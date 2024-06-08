import React from "react";
import { useEffect, useState } from "react";
// import { auth } from "../../backend/firebase-config";
import Loader from "../components/Loader";
import "../styles.css";
import "../styles/Home.css";
import { geocode } from "react-geocode";
import { CiLocationOn, CiVault } from "react-icons/ci";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import HomeMain from "../components/home/HomeMain";
import Advert from "../components/home/Advert";
import Nav from "../components/Nav";
import { NavLink } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { IoMdPerson } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { useRestaurantContext } from "../context/RestaurantContext";
import Theme from "../components/Theme";
// const getReverseGeoLocation = ({latitude, longitude}) => {
//   const [reverseGeoLocation, setReverseGeoLocation] = useState(null);
//   const url = `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location="${setlatitude},${setlongitude}"&language=en`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "1b9396c52cmsh0d5cfe2dd92c189p11aaedjsn04ad484be8f5",
//       "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
//     },
//   };

//   try {
//     fetch(url, options)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setReverseGeoLocation(data.results[0]);
//         console.log(data.results[0]);
//        return reverseGeoLocation;
//       });
//     // const result = response.text();
//     // console.log(response.json());
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject("Error in getting location");
      }
    );
  });
};

const Home = () => {
  const [show, setShow] = useState(true);
  const [err, setError] = useState(null);
  const [reverseGeoLocation, setReverseGeoLocation] = useState(null);
  const [present, setPresent] = useState(null);
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  const { lat, setLat, lng, setLng } = useRestaurantContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);

    //getting location

    getLocation()
      .then((location) => {
        const { latitude, longitude } = location;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        setLat(latitude);
        setLng(longitude);
        setPresent(lat, lng);
      })
      .catch((error) => {
        console.error(error);
      });

    // setReverseGeoLocation(getReverseGeoLocation({setlatitude, setlongitude}));
    //    try{
    //      const result= await getReverseGeoLocation({latitude:setlatitude, longitude:setlongitude});
    //      setReverseGeoLocation(result);
    //
    // }catch(error){
    //        console.log("Error:", error);
    // }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="outerMainClass">
      {/* {show && <Loader />} */}
      <div className="mainClass">
        <Nav />
        <HomeBody
          latitude={lat}
          longitude={lng}
          reverseGeoLocation={reverseGeoLocation}
          className="homebody"
        />
      </div>
      {/* )} */}
    </div>
  );
};

const HomeBody = (props) => {
  const { darkMode, setDarkMode } = useRestaurantContext();
  useEffect(() => {
    // console.log(searching);
  }, []);
  const [sideLocation, setSideLocation] = useState(false);
  const geolocation = props.reverseGeoLocation; // for geolocation name
  const [finalGeocode, setFinalGeocode] = useState(null); // for geolocation latitude longitude

  var latitude = props.latitude;
  // console.log("latitude from homebody:" + latitude);
  var longitude = props.longitude;
  // console.log(longitude);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const searcherr = "enter atleast 3 letters";

  const openside = () => {
    setSideLocation(!sideLocation);
  };
  const closepopup = (e) => {
    setSearching(false);
    if (e.target.id === "location") {
      setSideLocation(!sideLocation);
    } else {
      setSideLocation(false);
    }
  };
  const handleGetLocation = () => {
    getLocation()
      .then((location) => {
        // Access latitude and longitude
        const { latitude, longitude } = location;
        console.log("from side get location");
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  const searchRes = async (e) => {
    setSearch(e.target.value);
    if (search.length > 2) {
      // setSearching(true);
      const url = `https://google-maps-api-free.p.rapidapi.com/google-autocomplete?input="${search}"`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "1b9396c52cmsh0d5cfe2dd92c189p11aaedjsn04ad484be8f5",
          "X-RapidAPI-Host": "google-maps-api-free.p.rapidapi.com",
        },
      };

      try {
        fetch(url, options)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            console.log(data.predictions);
            setSearchResult(data.predictions);
          });
        // const result = await response.text();
        // console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    if (search.length >= 3) {
      setSearching(true);
    }
  };

  const getGeolocation = async () => {
    const url = `https://trueway-geocoding.p.rapidapi.com/Geocode?address="${geolocation}"=en`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1b9396c52cmsh0d5cfe2dd92c189p11aaedjsn04ad484be8f5",
        "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      },
    };

    try {
      fetch(url, options)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          console.log(data.location.lat, data.location.lng);
          setFinalGeocode(data.location.lat, data.location.lng);
        });
      // const result = await response.text();
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const selected = (desc) => {
    geolocation = desc;
    getGeolocation(geolocation);
    console.log(geolocation);
  };

  return (
    <div className="mainbody">
      <div className="location" onClick={openside} id="location">
        <CiLocationOn />
      </div>
      <div className={darkMode ? "main-dark" : "main-light"}>
        {/* <div className="top">
          <div className="left"></div>
          <div className="right">
            <Theme />
            <div className="topImg">
              <img src="src/assets/logo-removebg.png" alt="" />
            </div>
          </div>
        </div> */}

        {sideLocation && (
          <div className="sideLoc">
            <div className="searchLoc">
              <FaSearchLocation />
              <input
                type="text"
                placeholder="Search for area, stree name.."
                onChange={searchRes}
              />
            </div>
            {!searching && (
              <div className="Current" onClick={handleGetLocation}>
                <FaLocationCrosshairs id="icon" />
                <div className="text-cur">
                  <h4>Get current location</h4>
                  <p>Using GPS</p>
                </div>
              </div>
            )}
            {searching && (
              <div className="locationItems">
                <ul style="list-style: none;">
                  {searchResult.map((location, index) => (
                    <div className="searchRes">
                      <li key={index} onClick={selected(location.description)}>
                        {location.description}
                      </li>
                      <div className="line"></div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div className="nav">
        <Nav className="nav" />
      </div> */}
      <div
        className={!darkMode ? "mainBodyc-light" : "mainBodyc-dark"}
        onClick={closepopup}
      >
        <Advert />
        <HomeMain latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
};

export default Home;

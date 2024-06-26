import React, { useState } from "react";
import "../styles/LoginStyles.css";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth, provider } from "../loginFirebase";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRestaurantContext } from "../context/RestaurantContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState(false);
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { currentUserId, setCurrentUserId } = useRestaurantContext();
  var temp = true;
  const validate = (e) => {
    e.preventDefault();
    if (email.length === 0 || !emailRegex.test(email)) {
      setEmailErr(true);
      temp = false;
    } else {
      temp = true;
    }
    if (pass.length === 0) {
      setPassErr(true);
      temp = false;
    } else {
      temp = true;
    }
    if (temp) {
      try {
        signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
          const user = userCredential.user;
          console.log(auth.currentUser);
          setCurrentUserId(auth.currentUser.uid);
          if (location.pathname !== "/") {
            window.location.href = "/";
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  const google = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(auth.currentUser.uid);
      setCurrentUserId(auth.currentUser.uid);
      if (location.pathname !== "/") {
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="outerLog">
      <div className="innerLog">
        <div className="sideImage"></div>
        <div className="cred">
          <div className="outerinput">
            <div className="input">
              <MdAlternateEmail />
              &nbsp;|&nbsp;
              <input
                type="email"
                className="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailErr && <p className="err">enter a valid email</p>}
          </div>
          <div className="outerinput">
            <div className="input">
              <MdOutlinePassword />
              &nbsp;|&nbsp;
              <input
                type="password"
                className="email"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            {passErr && <p className="err">wrong/empty password</p>}
          </div>
          <div className="btnBox">
            <button className="loginbtn" onClick={validate}>
              Login
            </button>
            <div className="new">
              <p>new for HungryHeist</p>&nbsp;&nbsp;
              <Link to="/signup" className="btn">
                Signup
              </Link>
            </div>
          </div>
          <div className="contain">
            <div className="line"></div>
            <div className="tex">Login with Google</div>
            <div className="line"></div>
          </div>
          <div className="google">
            <button className="gbtn" onClick={google}>
              <FaGoogle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "../styles/Cart.css";
import { IoTrashBin } from "react-icons/io5";
import { FaPaypal } from "react-icons/fa";

const Cart = () => {
  return (
    <div className="outerCartWrapper">
      <div className="cartWrapper">
        <div className="cartItems">
          <h1>Cart</h1>
          {/* <div className="itemswrapper"></div> */}
          <div className="items">
            <div className="left">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_k3dmXxGhAIYtpo1VDWy8SJi30wQqJ5J9Ig&s"
                alt=""
                className="itemImg"
              />
              <h3>Orange juice</h3>
            </div>
            <div className="right">
              <div className="quantity">
                <button className="btn">-</button>
                <p className="para">1</p>
                <button className="btn">+</button>
              </div>
              <div className="price">
                <p>$2</p>
              </div>
              <div className="bin">
                <IoTrashBin />
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="items">
            <div className="left">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_k3dmXxGhAIYtpo1VDWy8SJi30wQqJ5J9Ig&s"
                alt=""
                className="itemImg"
              />
              <h3>Orange juice</h3>
            </div>
            <div className="right">
              <div className="quantity">
                <button className="btn">-</button>
                <p className="para">1</p>
                <button className="btn">+</button>
              </div>
              <div className="price">
                <p>$2</p>
              </div>
              <div className="bin">
                <IoTrashBin />
              </div>
            </div>
          </div>
        </div>
        <div className="cartRight">
          <h1>Buy now</h1>
          <input type="text" placeholder="Insert coupon" className="coupon" />
          <hr />
          <div className="bar">
            <h3>Subtotal</h3>
            <h3>$6</h3>
          </div>
          <div className="bar">
            <h3>Shipping</h3>
            <h3>$2</h3>
          </div>
          <hr />
          <div className="bar">
            <h3 style={{ fontWeight: 900 }}>Total</h3>
            <h3>$8</h3>
          </div>
          <button className="checkoutBtn">Checkout</button>
          <div className="or">
            <div className="dash"></div>
            <p>or</p>
            <div className="dash"></div>
          </div>
          <div className="paypal">
            <FaPaypal />
            <h3>Pay with Paypal</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

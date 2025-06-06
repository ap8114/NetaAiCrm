import React from "react";
import { Link } from "react-router-dom";
import bonbonlogo from "../assets/Supplyblack.png";

const ForgotPassword = () => {
  return (
    <>
      <div className="auth-container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="auth-card shadow-lg rounded p-4 bg-white w-100"
          style={{ maxWidth: 400 }}
        >
          {/* Logo Area */}
          <div className="logo-container mb-4 align-items-center d-flex justify-content-center">
            <img
              src={bonbonlogo}
              alt="NETA Logo"
              className="img-fluid"
              style={{ maxWidth: "200px" }}
            />
          </div>

          <h4
            className="text-center mb-4 fw-bold"
            style={{ color: "#333" }}
          ></h4>

          <form>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
              />
            </div>
            {/* <div className="mb-4">
              <label className="form-label">New password</label>
              <input
                type="password"
                className="form-control"
                placeholder="New password"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
              />
            </div> */}

            <div className="mb-3 text-end me-2">
              <Link to="/">
                <button type="submit" className="btn ai-premium-btn ">
                    Change Password
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

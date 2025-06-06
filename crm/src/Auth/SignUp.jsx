 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import bonbonlogo from "../assets/Supplyblack.png";
// import BASE_URL from "../../config";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    refferl: "",
    phone_number:""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        refferl: formData.refferl,
        phone_number:formData.phone_number
      });

      const data = response.data;
  // console.log(data)
      // if (data.name === "true") {
        // Optionally store token: localStorage.setItem("token", data.data.token);
        alert("Sign up successful!");
        navigate("/login");
    //   } else {
    //     setError(data.message || "Sign-up failed.");
    //   }
    // } catch (err) {
    //   setError(
    //     err.response?.data?.message || "Server error or network issue."
    //   );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="auth-card shadow-lg rounded p-4 bg-white w-100"
        style={{ maxWidth: 500 }}
      >
        <div className="logo-container mb-4 align-items-center d-flex justify-content-center">
          <Link to="/">
            <img
              src={bonbonlogo}
              alt="NETA Logo"
              className="img-fluid"
              style={{ maxWidth: "200px" }}
            />
          </Link>
        </div>

        <h4 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>
          Create Account
        </h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
           <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              className="form-control"
              placeholder="Enter Phone Number"
              value={formData?.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Referred By</label>
            <input
              type="text"
              name="refferl"
              className="form-control"
              placeholder="Referred By"
              value={formData.refferl}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn ai-premium-btn w-100"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3 small">
          Already have an account?
          <Link to="/">
            <button className="btn btn-link p-0 ms-1 text-decoration-none">
              Login
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

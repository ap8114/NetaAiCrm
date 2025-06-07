import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import bonbonlogo from "../assets/Supplyblack.png";
import bonbo2 from "../assets/bonbo2.jpg"; 

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    refferl: "",
    phone_number: ""
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
      // const response = await axios.post(`${BASE_URL}/register`, {
      //   name: formData.name,
      //   email: formData.email,
      //   password: formData.password,
      //   refferl: formData.refferl,
      //   phone_number: formData.phone_number
      // });
      // const data = response.data;
      alert("Sign up primaryful!");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ background: "#fff" }}>
      <div
        className="rounded-4 shadow-lg bg-white w-100"
        style={{
          maxWidth: 700,
          minHeight: 350,
          fontSize: "0.95rem", // Smaller font for all content
        }}
      >
        <div className="row g-0 h-100">
          {/* Left: Sign Up Form */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-3">
            <div className="logo-container mb-3 d-flex justify-content-center">
              <Link to="/">
                <img
                  src={bonbonlogo}
                  alt="Bon-Bon Logo"
                  className="img-fluid"
                  style={{ maxWidth: "110px" }}
                />
              </Link>
            </div>
            <h5 className="text-center mb-3 fw-bold" style={{ color: "#333", fontSize: "1.2rem" }}>
              Create Account
            </h5>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-sm"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label mb-1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-sm"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  className="form-control form-control-sm"
                  placeholder="Enter Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-sm"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label mb-1">Referred By</label>
                <input
                  type="text"
                  name="refferl"
                  className="form-control form-control-sm"
                  placeholder="Referred By"
                  value={formData.refferl}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn ai-premium-btn w-100 py-1"
                style={{ fontSize: "1rem" }}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <p className="text-center mt-2 small">
              Already have an account?
              <Link to="/">
                <button className="btn btn-link p-0 ms-1 text-decoration-none" style={{ fontSize: "1rem" }}>
                  Login
                </button>
              </Link>
            </p>
          </div>
          {/* Right: Image */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src={bonbo2}
              alt="Sign Up Visual"
              className="img-fluid w-100 h-100"
              style={{
                objectFit: "cover",
                borderTopRightRadius: "1.5rem",
                borderBottomRightRadius: "1.5rem"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

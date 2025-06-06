 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import netalogo from "../assets/images/Neta-Logo.png";
import BASE_URL from "../../config";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);

      const data = response.data;

    //   if (data.status === "true") {
    //     // Optionally save the token
    //     localStorage.setItem("token", data?.data?.token);
    //     localStorage.setItem("user_id",data?.data?.id)
    //     localStorage.setItem("user_name",data?.data?.name)

    //     alert("Login successful!");
    //     navigate("/chatbot");
    //   } else {
    //     setError(data.message || "Login failed.");
    //   }
    // } catch (err) {
    //   setError(err.response?.data?.message || "Server error or network issue.");
    // 
    } 
    finally {
      alert("Login successful!");
      navigate("/chatbot");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="auth-card shadow-lg rounded p-4 bg-white w-100"
        style={{ maxWidth: 450 }}
      >
        {/* Logo Area */}
        <div className="logo-container mb-4">
          <Link to="/">
            <img
              src={netalogo}
              alt="NETA Logo"
              className="img-fluid"
              style={{ maxWidth: "100px" }}
            />
          </Link>
        </div>

        <h4 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>
          Welcome Back
        </h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <div className="mb-3 text-end me-2">
            <Link
              to="/forgotpassword"
              className="form-label text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn ai-premium-btn w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 small">
          Don’t have an account?
          <Link to="/signup">
            <button className="btn btn-link p-0 ms-1 text-decoration-none">
              Sign Up
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

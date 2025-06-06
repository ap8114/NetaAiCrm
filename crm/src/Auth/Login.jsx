import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import bonbonlogo from "../assets/Supplyblack.png";
import bonbo from "../assets/bonbo.png"; 

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
      // const response = await axios.post(`${BASE_URL}/login`, formData);
      // const data = response.data;
      // if (data.status === "true") {
      //   localStorage.setItem("token", data?.data?.token);
      //   localStorage.setItem("user_id",data?.data?.id)
      //   localStorage.setItem("user_name",data?.data?.name)
      //   alert("Login successful!");
      //   navigate("/chatbot");
      // } else {
      //   setError(data.message || "Login failed.");
      // }
    } catch (err) {
      setError("Server error or network issue.");
    } finally {
      alert("Login successful!");
      navigate("/chatbot");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "#fff" }}
    >
      <div
        className="rounded-4 shadow-lg bg-white w-100"
        style={{ maxWidth: 900, minHeight: 480 }}
      >
        <div className="row g-0 h-100">
          {/* Left: Login Form */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-4">
            <div className="logo-container mb-4 d-flex justify-content-center">
              <Link to="/">
                <img
                  src={bonbonlogo}
                  alt="NETA Logo"
                  className="img-fluid"
                  style={{ maxWidth: "160px" }}
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
                  to="/forgot-password"
                  className="form-label text-decoration-none"
                >
                  Forgot Password?
                </Link>
              </div>
              <Link to="/home">
              <button
                type="submit"
                className="btn ai-premium-btn w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              </Link>
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
          {/* Right: Full Image */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src={bonbo}
              alt="Login Visual"
              className="img-fluid w-100 h-100"
              style={{ objectFit: "cover", borderTopRightRadius: "1.5rem", borderBottomRightRadius: "1.5rem" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

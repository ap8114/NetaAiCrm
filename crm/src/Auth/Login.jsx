// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";
// import bonbonlogo from "../assets/Supplyblack.png";
// import bonbo from "../assets/bonbo.png"; 

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // const response = await axios.post(`${BASE_URL}/login`, formData);
//       // const data = response.data;
//       // if (data.status === "true") {
//       //   localStorage.setItem("token", data?.data?.token);
//       //   localStorage.setItem("user_id",data?.data?.id)
//       //   localStorage.setItem("user_name",data?.data?.name)
//       //   alert("Login primaryful!");
//       //   navigate("/chatbot");
//       // } else {
//       //   setError(data.message || "Login failed.");
//       // }
//     } catch (err) {
//       setError("Server error or network issue.");
//     } finally {
//       alert("Login primaryful!");
//       navigate("/chatbot");
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex justify-content-center align-items-center"
//       style={{ background: "#fff" }}
//     >
//       <div
//         className="rounded-4 shadow-lg bg-white w-100"
//         style={{ maxWidth: 900, minHeight: 480 }}
//       >
//         <div className="row g-0 h-100">
//           {/* Left: Login Form */}
//           <div className="col-md-6 d-flex flex-column justify-content-center p-4">
//             <div className="logo-container mb-4 d-flex justify-content-center">
//               <Link to="/">
//                 <img
//                   src={bonbonlogo}
//                   alt="Bon-Bon Logo"
//                   className="img-fluid"
//                   style={{ maxWidth: "160px" }}
//                 />
//               </Link>
//             </div>
//             <h4 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>
//               Welcome Back
//             </h4>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Email address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   placeholder="name@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   className="form-control"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3 text-end me-2">
//                 <Link
//                   to="/forgot-password"
//                   className="form-label text-decoration-none"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//               <Link to="/home">
//               <button
//                 type="submit"
//                 className="btn btn-primary w-100"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//               </Link>
//             </form>
//             {/* <p className="text-center mt-3 small">
//               Don’t have an account?
//               <Link to="/signup">
//                 <button className="btn btn-link p-0 ms-1 text-decoration-none">
//                   Sign Up
//                 </button>
//               </Link>
//             </p> */}
//           </div>
//           {/* Right: Full Image */}
//           <div className="col-md-6 d-none d-md-block p-0">
//             <img
//               src={bonbo}
//               alt="Login Visual"
//               className="img-fluid w-100 h-100"
//               style={{ objectFit: "cover", borderTopRightRadius: "1.5rem", borderBottomRightRadius: "1.5rem" , maxWidth: 900, minHeight: 480  }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import bonbonlogo from "../assets/Supplyblack.png";
import bonbo from "../assets/bonbo.png";
import { loginUser } from "../slices/userSlice";
import AlertBox from "../Components/AlertBox";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null); // ✅ message state
  const [messageType, setMessageType] = useState("success");

  // useEffect(() => {
  //   if (token) {
  //     setMessage("Login successful!");
  //     setMessageType("success");
  //     setTimeout(() => {
  //       navigate("/home");
  //     }, 1000);
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setMessageType("error");
    }
  }, [error]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then(() => {
      setMessage("Login successful!");
      setMessageType("success");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }).catch(() => {
      setMessage("Login failed!");
      setMessageType("failure");
    });
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ background: "#fff" }}>
      <div className="rounded-4 shadow-lg bg-white w-100" style={{ maxWidth: 900, minHeight: 'auto' }}>
        <div className="row g-0 h-100">
          <div className="col-md-6 d-flex flex-column justify-content-center p-4">
            <div className="logo-container mb-4 d-flex justify-content-center">
              <Link to="/">
                <img src={bonbonlogo} alt="Bon-Bon Logo" className="img-fluid" style={{ maxWidth: "160px" }} />
              </Link>
            </div>
            <h4 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>Welcome Back</h4>

            {/* ✅ AlertBox */}
            {message && (
              <AlertBox
                type={messageType}
                message={message}
                onClose={() => setMessage(null)}
              />
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="mb-3 text-end me-2">
                <Link to="/forgot-password" className="form-label text-decoration-none">Forgot Password?</Link>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
          <div className="col-md-6 d-none d-md-block p-0">
            <img src={bonbo} alt="Login Visual" className="img-fluid w-100 h-100" style={{ objectFit: "cover", borderTopRightRadius: "1.5rem", borderBottomRightRadius: "1.5rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

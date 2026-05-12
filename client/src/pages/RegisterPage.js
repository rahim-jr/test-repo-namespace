import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <button type="submit">Register</button>
        <p className="auth-switch-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

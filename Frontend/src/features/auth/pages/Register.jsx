import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="text">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              type="text"
              id="text"
              name="text"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};
export default Register;

import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye ,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log("handleSignUp Error:-", error);
    }
  };

  const showFunPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      
    <div className="login-container">
      {/* <div className="card bg-base-300 w-96 shadow-sm"> */}
      <div className="login-card">
        <h2>{isLoginForm ? "Login" : "Sign Up"}</h2>

        {!isLoginForm && (
          <>
            <label className="label">First Name:</label>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">Last Name:</label>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label">Email ID:</label>
        <input
          type="email"
          className="input"
          value={emailId}
          onChange={(e) => setEmailID(e.target.value)}
        />
        <label className="label">Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="eye-icon"  onClick={showFunPassword}/>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button onClick={isLoginForm ? handleLogin : handleSignUp}>
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p className="toggle-form" onClick={() => setIsLoginForm(!isLoginForm)}>
          {isLoginForm
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
      {/* </div> */}
    </div>
    </>
  );
};

export default Login;

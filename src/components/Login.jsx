import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("saiTeja@1532");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ error , setError ] = useState("");
  
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
      setError( error?.response?.data || "Something went wrong")
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {firstName, lastName,emailId,password},
        {withCredentials: true}
      );
      console.log("handleSignUp:-",response.data.data)
      dispatch(addUser(response.data.data));
      return navigate("/profile")
    } catch (error) {
      setError( error?.response?.data || "Something went wrong")
      console.log("handleSignUp Error:-",error);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
            <fieldset className="fieldset py-1">
              
             {!isLoginForm && 
             <>
             <legend className="fieldset-legend">First Name:</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <legend className="fieldset-legend">Last Name:</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              </>
              }
              <legend className="fieldset-legend">Email ID:</legend>
              <input
                type="email"
                className="input"
                value={emailId}
                onChange={(e) => setEmailID(e.target.value)}
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

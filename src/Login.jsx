import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password , setPassword ] = useState("");

  const handleLogin = async () => {
    try {
        const payload = {emailId: emailID , password}
       const response = await axios.post("http://localhost:3000/login", payload , {withCredentials: true});
      console.log("succcess",response.data)
    } catch (error) {
       console.log("Error Status:", error.response?.status);
    console.log("Error Data:", error.response?.data);  // Backend error message
    console.log("Error Message:", error.message);
    }
    
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset py-1">
              <legend className="fieldset-legend">Email ID:</legend>
              <input type="email" className="input"  value={emailID} 
              onChange={(e) => setEmailID(e.target.value)}
              />
             <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

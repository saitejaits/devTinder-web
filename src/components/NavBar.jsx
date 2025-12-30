import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  // console.log("user:-", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async ( ) => {
    try {
      await axios.post(BASE_URL + "/logout",{}, {withCredentials: true});
      dispatch(removeUser());
      setMenuOpen(false);
      navigate("/login")
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="./public/Small.svg"  className="navbar-logo"/>
        <Link to="/" className="navbar-title">DateNest</Link>
      </div>
      {user && (
      <div className="navbar-right">
        <div className="welcome-text ">Welcome, {user.firstName}</div>

          <div className="profile-dropdown" ref={dropdownRef}>
                <img
                  alt="user photo"
                  src={user.photoUrl}
                  className="avatar"
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(open => !open); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setMenuOpen(o => !o); } }}
                />
            <ul
              className={`dropdown-menu ${menuOpen ? 'open' : ''}`}
              style={{ display: menuOpen ? 'block' : 'none' }}
            >
              <li>
                <Link to="/profile" 
                onClick={() => setMenuOpen(false)}
                >
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link to="/connections" onClick={() => setMenuOpen(false)}>Connections</Link>
              </li>
              <li>
                <Link to="/requests" onClick={() => setMenuOpen(false)}>Requests</Link>
              </li>
              <li>
                <a  onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                  }} >Logout</a>
              </li>
            </ul>
          </div>
        
      </div>
      )}
    </div>
  );
};

export default NavBar;

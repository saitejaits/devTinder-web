import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.status) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const isPublicRoute = window.location.pathname === "/login" || window.location.pathname === "/signup"
    if (!userData && !isPublicRoute) {
      fetchUser();
    }
  }, []);

  return (
    <div className={location.pathname === "/profile" ? "edit-page" : undefined}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data?.data || []));
    } catch (error) {
      console.log("Feed Error:-", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) return <div className="flex justify-center my-10">Loading...</div>;
  if (!feed || feed.length === 0) return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    
  )
)
};

export default Feed;

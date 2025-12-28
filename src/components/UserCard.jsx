import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, hideButtons = false }) => {
  const dispatch = useDispatch();
  console.log("user:-", user);
  const { firstName, lastName, photoUrl, about, gender, age, _id, bio } = user;
  const [loading, setLoading] = useState(null);

  const handleSendRequest = async (status, userId) => {
    if (loading) return;
    setLoading(status);
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("handleSendRequest Error:-", error);
    } finally {
      setLoading(null); // Re-enable button
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-sm  h-110">
      <figure>
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender + " " + bio}</p>}
        <p>{about}</p>
        {!hideButtons && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignore", _id)}
              disabled={loading !== null}
            >
              {loading === "ignore" ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Ignore"
              )}
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
              disabled={loading !== null}
            >
              {loading === "interested" ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Interested"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

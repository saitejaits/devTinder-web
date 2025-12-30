import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const response =  axios.post(
        BASE_URL + "/request/review/"+status +"/" + _id,
        {},
        {withCredentials: true}
      
      );
      dispatch(removeRequest(_id));
      console.log("reviewRequest:-",response)
    } catch (error) {
      console.log("reviewRequest Error:-",error)
    }
  }

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return; //if connections not there

  if (requests.length === 0) return <h1 className="no-requests">No Requests Found</h1>;

  return (
   <div className="requests-page">
  <h1 className="requests-title">Connection Requests</h1>

  {requests.map((request) => {
    const { firstName, lastName, photoUrl, age, gender, about, _id } =
      request.fromUserId;

    return (
      <div className="request-card" key={_id}>
        <div className="request-avatar">
          <img src={photoUrl} alt="profile" />
        </div>

        <div className="request-info">
          <h2>{firstName} {lastName}</h2>
          {age && gender && <p className="meta">{age} · {gender}</p>}
          <p className="about">{about}</p>
        </div>

        <div className="request-actions">
          <button
            className="btn-reject"
            onClick={() => reviewRequest("rejected", request._id)}
          >
            Reject
          </button>
          <button
            className="btn-accept"
            onClick={() => reviewRequest("accepted", request._id)}
          >
            Accept
          </button>
        </div>
      </div>
    );
  })}
</div>

  );
};

export default Requests;

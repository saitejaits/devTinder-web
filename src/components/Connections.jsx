import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector((store) => store.connections)
  const dispatch = useDispatch();

  const fetchConnections = async ( ) => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections",
         {withCredentials: true}) 
      // console.log(response.data.data)
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.log("fetchConnections Error:-",error)
    }
  }
  useEffect( ( ) => {
    fetchConnections()
  },[])

  if (!connections) return null;

if (connections.length === 0)
  return <h1 className="no-connections">No Connections Found</h1>;

return (
  <div className="connections-page">
    <h1 className="connections-title">Connections</h1>

    {connections.map((connection) => {
      const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;

      return (
        <div className="connection-card" key={_id}>
          <div className="avatar-wrapper">
            <img src={photoUrl} alt="profile" />
          </div>

          <div className="connection-info">
            <div className="name-row">
              <h2>{firstName} {lastName}</h2>
              <span className="status">Connected</span>
            </div>

            {age && gender && (
              <p className="meta">{age} · {gender}</p>
            )}

            <p className="about">{about}</p>
            <p className="active">Active today</p>
          </div>

          <div className="actions">
            <button className="icon-btn">💬</button>
            <button className="icon-btn">👁</button>
          </div>
        </div>
      );
    })}
  </div>
);

}

export default Connections
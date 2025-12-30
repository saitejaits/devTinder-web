import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [bio , setBio] = useState(user?.bio || "");
  const [interests, setInterests] = useState(user?.interests ||"");

  
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
          bio,
          interests,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log("errO:", error?.response?.data?.errors);
      setError(error?.response?.data?.errors);
    }
  };

  return (
  <div className="edit-profile-page">
    <div className="edit-profile-layout">
      
      {/* EDIT PROFILE FORM ONLY */}
      <div className="edit-profile-card">
        <h2 className="edit-title">Edit Profile</h2>

        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label>Photo URL</label>
        <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

        <div className="two-fields">
          <div>
            <label>Bio</label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div>
            <label>Age</label>
            <input type="number" value={age} min={5} onChange={(e) => setAge(e.target.value)} />
          </div>
        </div>

        <div className="two-fields">
          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label>Interests</label>
            <input
              type="text"
              placeholder="Travel, Music, Coding"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
        </div>

        <label>About</label>
        <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} />

        {error && <p className="form-error">{error}</p>}

        <button className="save-profile-btn" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
      
      {/* USER CARD (REUSED FROM FEED – NO CHANGE) */}
      <UserCard
        user={{ firstName, lastName, age, gender, about, photoUrl, bio }}
        hideButtons={true}
      />

    </div>
  </div>
);

};

export default EditProfile;

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
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <fieldset className="fieldset py-1">
                <legend className="fieldset-legend">FirstName:</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <legend className="fieldset-legend">LastName:</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <legend className="fieldset-legend">Photo Url:</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <div className="row two-cols">
                  <div>
                    <legend className="fieldset-legend">Bio:</legend>
                    <input
                      type="text"
                      className="input"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div>
                    <legend className="fieldset-legend">Age:</legend>
                    <input
                      type="number"
                      className="input"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min={5}
                    />
                  </div>
                </div>

                <div className="row two-cols">
                  <div>
                    <legend className="fieldset-legend">Gender:</legend>
                    <select
                      className="input"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <div>
                    <legend className="fieldset-legend">Interests:</legend>
                    <input
                      type="text"
                      className="input"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      placeholder="Travel, Music, Coding"
                    />
                  </div>
                </div>
                <legend className="fieldset-legend">About:</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, gender, about, photoUrl ,bio}}
        hideButtons={true}
      />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile sent successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

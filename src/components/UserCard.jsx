import React from "react";

const UserCard = ({user}) => {
    console.log("card:-",user);
    const {firstName ,lastName,photoUrl,about} = user;
  return (
    <div className="card bg-base-300 w-80 shadow-sm  h-110">
      <figure>
        <img
          src={photoUrl}
          alt="Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Igonre</button>
          <button className="btn btn-secondary">Interested</button>

        </div>
      </div>
    </div>
  );
};

export default UserCard;

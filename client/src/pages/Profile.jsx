import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import "../style/account.css";

const Profile = () => {
  const { sessionID } = useSessionID();
  const [userInfo, setUserInfo] = useState(null);
  const [userProfilePic, setProfilePicture] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  useEffect(() => {
    console.log(sessionID);
    getProfile();
  }, [sessionID]);

  const getProfile = async () => {
    if (sessionID) {
      const res = await fetch(`http://localhost:8000/users/profile`, {
        method: "GET",
        headers: {
          "x-session-id": sessionID,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data: ", data);
      setUserInfo(data);
    }
  };

  return (
    <div className="user-profile">
      {userInfo && (
        <div className="the-profile">
          <img src={userProfilePic} alt="" />
          <h4>Full Name: {userInfo?.name}</h4>
          <h4>Username: {userInfo?.username}</h4>
          <h4>Email: {userInfo?.email}</h4>
          <h4>Address: {userInfo?.address}</h4>
        </div>
      )}
    </div>
  );
};

export default Profile;

/*

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setProfilePicture(URL.createObjectURL(uploadedFile));
  };

   <button>
            <input type="file" onChange={handleUpload} />
            Choose Picture
          </button> 
*/

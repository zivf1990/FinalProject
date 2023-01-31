import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import "../style/profile.css";

const Profile = () => {
  const { userToken } = useUserToken();
  const [userInfo, setUserInfo] = useState(null);
  const [userProfilePic, setProfilePicture] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  useEffect(() => {
    console.log(userToken);
    getProfile();
  }, [userToken]);

  const getProfile = async () => {
    if (userToken) {
      const res = await fetch(`http://localhost:8000/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          headers: { "Content-Type": "application/json" },
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
        <>
          <img src={userProfilePic} alt="" />
          <h4>Full Name: {userInfo?.name}</h4>
          <h4>Username: {userInfo?.username}</h4>
          <h4>Email: {userInfo?.email}</h4>
          <h4>Address: {userInfo?.address}</h4>
        </>
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

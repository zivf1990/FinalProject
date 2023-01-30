import React, { useEffect } from "react";
import { useUserToken } from "../context/UserContext";

const Profile = () => {
  const { userToken } = useUserToken();

  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  return <div></div>;
};

export default Profile;

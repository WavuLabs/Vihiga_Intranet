import { Avatar, Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const UsersSideBar = (props) => {
  const { hideSender } = props;
  const { name, profile_picture, uid, groups } = props.user;
  
  const navigate = useNavigate();

  const HandleClick = async () => {
    navigate(`/chatpage/${uid}`);
  };

  return (
    <button
      onClick={HandleClick}
      className={`flex flex-col m-1 p-2 rounded-md justify-center items-center ${hideSender}`}
    >
      <Avatar src={profile_picture} alt="User Avatar" />
      <p className="text-white p-3"> {name}</p>
    </button>
  );
};

export default UsersSideBar;

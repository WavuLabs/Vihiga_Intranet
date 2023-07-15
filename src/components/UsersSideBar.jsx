import { Avatar, Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const UsersSideBar = (props) => {
  const { hideSender } = props;
  const { name, profile_picture, uid } = props.user;
  const { setThisReceiverName } = useOutletContext();
  
  const navigate = useNavigate();

  const HandleClick = async () => {
    navigate(`/chatpage/${uid}`);
    setThisReceiverName(name);
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

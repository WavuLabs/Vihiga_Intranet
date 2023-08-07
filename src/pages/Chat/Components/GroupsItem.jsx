import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const GroupsItem = (props) => {
  const { groupName, profile_picture } = props.group;

  const navigate = useNavigate();

  const HandleClick = async () => {
    navigate(`/chatpage/${groupName}`);
    console.log(groupName);
  };

  return (
    <button
      onClick={HandleClick}
      className={`flex flex-col m-1 p-2 rounded-md justify-center items-center`}
    >
      <p className="text-white p-3"> {groupName}</p>
    </button>
  );
};

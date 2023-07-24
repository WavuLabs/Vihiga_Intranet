import { Avatar } from "@mui/material";
import React from "react";

export const MessageItem = (props) => {
  const {
    name,
    userType,
    hideSender,
    messageItem,
    sentAT,
    messageClass,
    profilePic,
  } = props;
  return (
    <div
      className={`${messageClass} flex custom-borders rounded-2xl  w-fit h-fit m-3 pl-3`}
    >
      <div className={`text-white ${hideSender} `}>
        <Avatar src={profilePic} className="m-1" alt="DP" />
      </div>
      <div>
        {userType == "group" && !hideSender && (
          <p className="text-white/30 text-xs m-0">{name}</p>
        )}
        <p className="text-white mb-3 px-2 ">{messageItem}</p>
      </div>
      <p className="text-white/40 self-end text-xs single-line m-1">{sentAT}</p>
    </div>
  );
};

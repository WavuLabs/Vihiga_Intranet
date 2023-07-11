import { Avatar } from "@mui/material";
import React from "react";

export const MessageItem = (props) => {
  return (
    <div
      className={`${props.messageClass} flex custom-borders rounded-2xl items-center w-fit h-fit m-3 pl-3`}
    >
      <div className="text-white">
        <Avatar className="m-1">A</Avatar>
      </div>
      <p className="text-white m-1">{props.messageItem}</p>
      <p className="text-white/40 self-end text-xs m-1">{props.sentAT}</p>
    </div>
  );
};

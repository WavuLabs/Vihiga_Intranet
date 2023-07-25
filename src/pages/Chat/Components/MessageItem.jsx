import { Avatar } from "@mui/material";
import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";

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

  const SenderMessaageItem = () => (
    <div
      className={`${messageClass} flex m-3 pl-3`}
    >
      <div className="flex flex-row justify-center items-center mt-2">
        <p className="text-white/40 text-xs single-line ">{sentAT}</p>
        <DoneAllIcon fontSize="small" className="mx-1" />
      </div>
      <div>
        {userType == "group" && !hideSender && (
          <p className="text-white/50 text-xs m-0">{name}</p>
        )}
        <p className="text-white mb-3 px-2 ">{messageItem}</p>
      </div>
    </div>
  );

  const ReceiverMessaageItem = () => (
    <div className="rows-center">
      <Avatar src={profilePic} className="m-1" />
      <div className={`${messageClass} m-1 px-3`}>
        <div>
          {userType == "group" && (
            <p className="text-white/50 text-xs m-0">{name}</p>
          )}
          <p className="text-white mb-3 px-2 ">{messageItem}</p>
        </div>
        <p className="text-white/40 self-end text-xs single-line m-1">
          {sentAT}
        </p>
      </div>
    </div>
  );

  return messageClass === "sender-chat" ? (
    <SenderMessaageItem />
  ) : (
    <ReceiverMessaageItem />
  );
};

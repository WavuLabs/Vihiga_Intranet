import React, { useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { MenuItem } from "@mui/material";

import DropDown from "../components/DropDown";
import InboxMessagesSidebar from "../components/InboxMessagesSidebar";
import { ProgressIndicator } from "../components/ProgressIndicator";
import UsersSideBar from "../components/UsersSideBar";
import { ContextData } from "../APIs/contexts/Context";
import { auth } from "../APIs/firebase";

const ChatPage = ({ children }) => {
  const uid = auth.currentUser?.uid;
  const { USERS, loadingUSERS } = ContextData();

  const HandleCreateNewChat = () => {
    console.log("Create New Chat");
  };

  return (
    <div className="w-full h-[89vh] flex flex-row overflow-clip">
      {/* Main sidebar div */}
      <div className="bg-[#0A0E0F] w-1/3 hidden sm:block flex-col justify-between ">
        {/* departments div*/}
        <div className="custom-borders">
          <div className="flex flex-row justify-between items-center">
            <p className="text-white p-3">Department Groups</p>
            <button
              onClick={HandleCreateNewChat}
              className="bg-[#0A0E0F] text-white/50 p-3 text-sm flex flex-row justify-between items-center"
            >
              New Chat <AiOutlineCaretRight className="ml-1" />
            </button>
          </div>
          <div className="flex flex-row overflow-y-hidden overflow-x-scroll">
            {loadingUSERS == false ? (
              USERS?.map((user, index) => (
                <UsersSideBar
                  key={index}
                  user={user}
                  hideSender={user.uid === uid ? "hidden" : ""}
                />
              ))
            ) : (
              <ProgressIndicator />
            )}
          </div>
          <DropDown Title="Add Department">
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </DropDown>
        </div>

        {/*  */}
        <div className="flex-1 h-full custom-borders overflow-clip w-full">
          <p className="text-white p-3">Messages</p>
          <div className="flex flex-col overflow-y-scroll overflow-x-hidden h-5/6 w-full">
            <InboxMessagesSidebar />
          </div>
        </div>
      </div>

      {/* IN chat */}
      <div className="bg-[#121616] flex-1 relative ">
        {/* CHAT */}
        {children}
      </div>
    </div>
  );
};

export default ChatPage;

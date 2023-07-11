import React from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import DropDown from "../components/DropDown";
import { Avatar, MenuItem, Stack } from "@mui/material";
import { auth, db } from "../APIs/firebase";
import Chat from "../components/Chat";
import MessagesSidebar from "../components/MessagesSidebar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { ProgressIndicator } from "../components/ProgressIndicator";
import UsersSideBar from "../components/UsersSideBar";
import { ContextData } from "../APIs/contexts/Context";

const ChatPage = () => {
  const uid = auth.currentUser?.uid;

  const { USERS, loadingUSERS } = ContextData();
  return (
    <div className="w-full h-[89vh] flex flex-row overflow-clip">
      {/* Main sidebar div */}
      <div className="bg-[#0A0E0F] w-1/3 hidden sm:block flex-col ">
        {/* departments div*/}
        <div id="departments div" className="h-1/3 custom-borders">
          <div className="flex flex-row justify-between items-center">
            <p className="text-white p-3">Department Groups</p>
            <button
              onClick={() => {}}
              className="bg-[#0A0E0F] text-white/50 p-3 text-sm flex flex-row justify-between items-center"
            >
              More <AiOutlineCaretRight className="ml-1" />
            </button>
          </div>
          <div className="flex flex-row overflow-y-hidden overflow-x-scroll">
            {USERS ? (
              USERS?.map((user, index) => (
                <UsersSideBar key={index} user={user} />
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

        <div className="h-2/3 custom-borders overflow-clip w-full">
          <p className="text-white p-3">Messages</p>
          <div className="flex flex-col overflow-y-scroll overflow-x-hidden h-5/6 w-full">
            <MessagesSidebar />
          </div>
        </div>
      </div>

      {/* IN chat */}
      <div className="bg-[#121616] flex-1 relative ">
        {/* div header */}
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;

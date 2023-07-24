import React, { useEffect, useState } from "react";
import InboxMessagesSidebar from "./Components/InboxMessagesSidebar";

import UsersSideBar from "./Components/UsersSideBar";

const ChatPage = ({ children }) => {
  return (
    <div className="w-full h-[89vh] flex flex-row overflow-clip">
      {/* Main sidebar div */}
      <div className="flex flex-col bg-[#0A0E0F] w-1/3 ">
        <div className="custom-borders">
          <UsersSideBar />
        </div>

        {/* inbox */}
        <div className="flex flex-col overflow-x-hidden overflow-y-scroll flex-1 custom-borders">
          <p className="text-white p-3">Inbox</p>
          <InboxMessagesSidebar />
        </div>
      </div>

      {/* chat */}
      <div className="bg-[#121616] flex-1 relative h-full ">{children}</div>
    </div>
  );
};

export default ChatPage;

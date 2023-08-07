import React, { useEffect, useState } from "react";
import InboxMessagesSidebar from "./Components/InboxMessagesSidebar";

import UsersSideBar from "./Components/UsersSideBar";
import { Outlet, useOutletContext } from "react-router-dom";

const ChatPage = ({ children }) => {
  const width = window.innerWidth;
  const values = useOutletContext();

  return (
    <div className="w-full h-[90vh] flex flex-row overflow-clip">
      {/* Main sidebar div */}
      {width > 640 && (
        <div className="flex flex-col bg-[#0A0E0F] w-1/3 ">
          <div className="custom-borders">
            <UsersSideBar />
          </div>
          {/* inbox */}
          <InboxMessagesSidebar />
        </div>
      )}

      {/* chat */}
      <div className="bg-[#121616] flex-1 relative h-full ">
        <Outlet context={values} />
      </div>
    </div>
  );
};

export default ChatPage;

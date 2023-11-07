import React, { useEffect, useState } from "react";
import StaffItem from "./Components/StaffItem";
import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";

const StaffDirectory = () => {
  const { USERS } = useOutletContext();
  const [staff, setStaff] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const displayedUsers = showAll ? staff : staff?.slice(0, 3);

  useEffect(() => {
    setStaff(USERS);
  }, [USERS]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="col w-full h-full text-black">
      <p className=" text-3xl font-bold ">Staff Directory</p>
      <Button className="self-end" onClick={toggleShowAll}>
        {showAll ? "Hide" : "Show All"}
      </Button>
      <div className="grid sm:grid-cols-3  ">
        {displayedUsers?.map((staff, index) => (
          <StaffItem key={index} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default StaffDirectory;

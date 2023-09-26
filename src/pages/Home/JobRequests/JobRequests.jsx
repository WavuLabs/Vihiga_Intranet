import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import RequestLeave from "./Components/RequestLeave";
import CarLoans from "./Components/CarLoans";
import PerformanceAppraisal from "./Components/PerformanceAppraisal";
import CountyCommittee from "./Components/CountyCommittee";
import StatutoryReport from "./Components/StatutoryReport";
import TravelOut from "./Components/TravelOut";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JobRequests = () => {
  const Item = ({ title, color, Component, handleClick }) => (
    <Button
      sx={{
        backgroundColor: "rgb(15 23 42 )",
        margin: "10px",
        borderRadius: "20px",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "rgb(15 23 42 20)",
        },
      }}
      onClick={() => {
        handleClose();
        handleClick && handleClick();
      }}
      className={`rounded-3xl m-2 p-4 w-[20vw] h-[15vw] cols-center`}
    >
      <p>{title}</p>
      {Component}
    </Button>
  );

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleClose = () => {
    setOpen(!open);
  };


  const handleDisplay = () => {
    switch (selected) {
      case "Request Leave":
        return <RequestLeave handleClose={handleClose} />;
      case "Car Loan":
        return <CarLoans handleClose={handleClose} />;
      case "Performance Appraisal":
        return <PerformanceAppraisal handleClose={handleClose} />;
      case "County Committee":
        return <CountyCommittee handleClose={handleClose} />;
      case "Statutory Report":
        return <StatutoryReport handleClose={handleClose} />;
      case "Travel Out":
        return <TravelOut handleClose={handleClose} />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full h-full">
      <p className="p-title m-2 p-3">JobRequests</p>
      <div className="grid grid-cols-3 place-items-center">
        <Item title={"Request Leave"} handleClick={()=> setSelected("Request Leave")} />
        <Item title={"Car Loan"}  handleClick={()=> setSelected("Car Loan")} />
        <Item title={"Performance Appraisal"} handleClick={()=> setSelected("Performance Appraisal")} />
        <Item title={"County Committee"}  handleClick={()=> setSelected("County Committee")}/>
        <Item title={"Statutory Report"} handleClick={()=> setSelected("Statutory Report")}/>
        <Item title={"Travel Out"} handleClick={()=> setSelected("Travel Out")}/>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="p-4 m-2 cols-center bg-inherit"
      >
        {handleDisplay()}
      </Dialog>
    </div>
  );
};

export default JobRequests;
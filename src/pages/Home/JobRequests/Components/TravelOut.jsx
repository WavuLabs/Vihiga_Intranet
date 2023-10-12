import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { TextField } from "@mui/material";

const TravelOut = ({ handleClose }) => {
  const [destinaion, setDestination] = useState("");
  const [TravelOutDays, setTravelOutDays] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
      color: "#901106",
    },
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(TravelOutDays, destinaion);
    handleClose();
  };
  return (
    <div className="col p-4 items-center justify-center space-y-3 overflow-hidden">
        <p className="text-3xl">Select Travelling details</p>
      <form className="col s-center p-2 gap-1 " onSubmit={handleSubmit}>
        <TextField
          label="Destination"
          placeholder="Enter Travel Destinaion"
          value={destinaion}
          onChange={(e) => setDestination(e.target.value)}
          margin="none"
          className="w-full rounded-sm"
          //   size="medium"
          required
          autoFocus={true}
          autoComplete="off"
        />
        <p className="text-xl text-left p-1">Select Travelling dates</p>
        <DateRangePicker
          className=" text-black w-fit h-fit "
          onChange={(item) => setTravelOutDays([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={TravelOutDays}
          color="red"
          direction="horizontal"
        />
        <br />
        <button className="w-[20vw] border">SUBMIT</button>
      </form>
    </div>
  );
};

export default TravelOut;

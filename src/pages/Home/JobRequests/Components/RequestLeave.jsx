import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { Button, TextField } from "@mui/material";

const RequestLeave = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const [leaveDates, setLeaveDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
      color: "#901106",
    },
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(leaveDates);
    handleClose();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="col p-4 items-center justify-center gap-4 "
    >
      <p className="text-3xl">Select Leave Dates</p>
      <TextField
        label="Message"
        placeholder="Reason for leave"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className=" w-3/4 mx-10 rounded-sm m-1"
        size="small"
        required
        autoFocus={true}
        autoComplete="off"
      />
      <DateRangePicker
        className=" text-black"
        onChange={(item) => setLeaveDates([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={leaveDates}
        color="red"
        direction="horizontal"
      />
      <br />

      <button className="w-[20vw] border">SUBMIT</button>
    </form>
  );
};

export default RequestLeave;

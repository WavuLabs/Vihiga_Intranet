import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

const RequestLeave = ({ handleClose }) => {
  const [leaveDates, setLeaveDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
      color: "#901106",
    },
  ]);
  const handleSubmit = () => {
    console.log(leaveDates);
    handleClose();
  };
  return (
    <div className="col p-4 items-center justify-center space-y-3 w-fit h-fit">
      <p className="text-3xl">Select Leave Dates</p>
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
      <button className="w-[20vw] border" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default RequestLeave;

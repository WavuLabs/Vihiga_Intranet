import React from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const JobRequests = () => {
  const [value, setValue] = React.useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);

  const Item = ({ title, color, Component }) => (
    <div
      className={`${color} rounded-3xl m-2 p-4 w-[20vw] h-[15vw] cols-center`}
    >
      <p>{title}</p>
      {Component}
    </div>
  );
  return (
    <div className="h-[50vh]">
      <p className="p-title m-2 p-3">JobRequests</p>
      <div className="grid grid-cols-3 place-items-center">
        <Item title={"Request Leave"} color={"bg-slate-900"} />
        <Item title={"Car Loan"} color={"bg-slate-900"} />
        <Item title={"Travel Out"} color={"bg-slate-900"} />
        <Item title={"Travel Out"} color={"bg-slate-900"} />
        <Item title={"Travel Out"} color={"bg-slate-900"} />
        {/* <DateRangePicker
          defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
        /> */}
      </div>
    </div>
  );
};

export default JobRequests;

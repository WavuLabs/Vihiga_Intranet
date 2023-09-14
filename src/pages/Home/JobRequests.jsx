import React from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JobRequests = () => {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);

  const handleClose = () => {
    setOpen(!open);
  };
  const Item = ({ title, color, Component }) => (
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
      onClick={() => handleClose()}
      className={`rounded-3xl m-2 p-4 w-[20vw] h-[15vw] cols-center`}
    >
      <p>{title}</p>
      {Component}
    </Button>
  );
  return (
    <div className="w-full h-full">
      <p className="p-title m-2 p-3">JobRequests</p>
      <div className="grid grid-cols-3 place-items-center">
        <Item title={"Request Leave"} />
        <Item title={"Car Loan"} />
        <Item title={"Travel Out"} />
        <Item title={"Travel Out"} />
        <Item title={"Travel Out"} />
        <Item title={"Travel Out"} />
        {/* <DateRangePicker
          defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
        /> */}
      </div>
      <Dialog
        fullScreen
        // maxWidth="xl"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
      <Button onClick={() => handleClose()}>
        {/* x icon */}
        
      </Button>
        <Item title={"Travel Out"} />
        <Item title={"Travel Out"} />
        <Item title={"Travel Out"} />
        <Item title={"Travel Out"} />
      </Dialog>
    </div>
  );
};

export default JobRequests;

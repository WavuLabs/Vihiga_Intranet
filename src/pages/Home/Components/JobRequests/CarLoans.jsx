import { TextField } from "@mui/material";
import React, { useState } from "react";

const CarLoans = ({ handleClose }) => {
  const [amount, setAmount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount);
    handleClose();
  };
  return (
    <div className="col p-4 items-center justify-center space-y-3 w-[40vw] h-fit">
      <p className="text-3xl">Set Loan Amount</p>
      <div className="h-[10vh]" />
      <form className="w-full h-fit items-center justify-center space-y-3 " onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="none"
          className="w-full rounded-sm"
          //   size="medium"
          required
          autoFocus={true}
          autoComplete="off"
        />
        <br />
        <button className="w-[20vw] border">SUBMIT</button>
      </form>
    </div>
  );
};

export default CarLoans;

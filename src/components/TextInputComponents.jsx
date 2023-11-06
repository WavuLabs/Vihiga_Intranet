import { TextField } from "@mui/material";
import React from "react";
import { colors } from "../constants/Constants";

export const TextInputComponents = (props) => {
  const labelColorStyle = {
    color: colors.primary, // Change the label text color to blue
  };
  return (
    <TextField
      className={`w-full my-2 text-white p-3 rounded-lg bg-transparent `}
      margin="normal"
      size="medium"
      // InputLabelProps={{
      //   style: labelColorStyle,
      // }}
      {...props}
    />
  );
};

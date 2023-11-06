import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioGroupComponent = ({ state, setState, data }) => {
  const handleOptionChange = (e) => setState(e.target.value);
  return (
    <FormControl component="fieldset">
      <RadioGroup
        className="p-1 px-2"
        value={state ? state : "Executive"}
        onChange={handleOptionChange}
      >
        {data.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item}
            control={<Radio />}
            label={item}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default RadioGroupComponent;

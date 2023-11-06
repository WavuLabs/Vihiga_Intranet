import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AiFillCloseCircle } from "react-icons/ai";
import { departments } from "../constants/Constants";
import DropDown from "./DropDown";
import RadioGroupComponent from "./RadioGroupComponent";

const SelectDepartment = ({ state, setState }) => {
  return (
    <div className="row">
      <DropDown
        Title={
          <>
            Select Department <ArrowDropDownIcon fontSize="large" />
          </>
        }
      >
        <RadioGroupComponent
          state={state}
          setState={setState}
          data={departments}
        />
      </DropDown>
      
      {state && (
        <p className="bg-blue-950 rows-center rounded-md p-1 gap-x-2">
          {state}
          <AiFillCloseCircle onClick={() => setState()} />
        </p>
      )}
    </div>
  );
};
export default SelectDepartment;

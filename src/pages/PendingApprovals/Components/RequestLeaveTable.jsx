import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
} from "@mui/material";
import { addDays, format, differenceInDays } from "date-fns";

const RequestLeaveTable = ({props}) => {
  const { data, setData } = props;
  const handleCheckboxChange = (index) => {
    const updatedData = [...data];
    updatedData[index].checked = !updatedData[index].checked;
    setData(updatedData);
  };

  return (
    <div>
      <TableContainer
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Table className="m-2 p-2 w-full border col-center text-black">
          <TableHead>
            <TableRow className="bg-slate-200">
              <TableCell>Name</TableCell>
              <TableCell>Leave Dates</TableCell>
              <TableCell>Leave Days</TableCell>
              <TableCell >Approve</TableCell>
              <TableCell>Reject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.key}</TableCell>
                <TableCell>
                  {format(item.startDate, "PP")} - {format(item.endDate, "PP")}
                </TableCell>
                <TableCell>
                  {differenceInDays(item.endDate, item.startDate)}
                  {" days "}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={!item.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          // onClick={handleSubmit}
          className="m-4 self-end"
        >
          Submit
        </Button>
      </TableContainer>
    </div>
  );
};

export default RequestLeaveTable;

import React, { useState } from 'react'
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

const CarLoanTable = () => {
  const [data, setData] = useState([]);
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
            <TableCell>Amount</TableCell>
            <TableCell>Approve</TableCell>
            <TableCell>Reject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell></TableCell>
              <TableCell>
             
              </TableCell>
              <TableCell>
              
                {" days "}
              </TableCell>
              <TableCell>
           
              </TableCell>
              <TableCell>
                
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
  )
}

export default CarLoanTable
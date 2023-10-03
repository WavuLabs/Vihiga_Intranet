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
import React, { useState } from "react";

const PerformanceAppraisalGrid = ({children, handleClose}) => {
  const [performanceData, setPerformanceData] = useState([
    { key: "Job Responsibilities and Goals Achievement", checked: false },
    { key: "Quality of Work", checked: false },
    // ... Add other key metrics here ...
  ]);

  const handleCheckboxChange = (index) => {
    const updatedData = [...performanceData];
    updatedData[index].checked = !updatedData[index].checked;
    setPerformanceData(updatedData);
  };

  const handleSubmit = () => {
    const summary = performanceData
      .filter((item) => item.checked)
      .map((item) => item.key);
    console.log("Summary of performance appraisal:", summary);
    handleClose();
  };

  return (
    <>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-primary" >
                <TableCell>Key Metrics</TableCell>
                <TableCell>Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {performanceData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{color: "white"}}>{item.key}</TableCell>
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
        </TableContainer>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      {children}
    </>
  );
};

export default PerformanceAppraisalGrid;

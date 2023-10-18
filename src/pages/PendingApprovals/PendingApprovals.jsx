import React, { useState } from "react";
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
import { faker } from "@faker-js/faker";
import RequestLeaveTable from "./Components/RequestLeaveTable";
import TravelOutTable from "./Components/TravelOutTable";
import PerformanceAppraisalTable from "./Components/PerformanceAppraisalTable";
import CarLoanTable from "./Components/CarLoanTable";
import { useOutletContext } from "react-router-dom";

const PendingApprovals = () => {
  const { uid, currentUser } = useOutletContext();
  const [state, setState] = useState([
    {
      title: "Leave Requests",
      component: () => <RequestLeaveTable  />,
    },
    { title: "Travel Out Requests", component: () => <TravelOutTable /> },
    { title: "Car Loan Requests", component: () => <CarLoanTable /> },
    { title: "Performance Appraisal Requests", component: () => <PerformanceAppraisalTable /> },
  ]);

  return (
    <div className=" px-2 py-4 text-black">
      <p className="p-title my-3 py-3">Pending Approvals</p>
      <p className="text-white/70">Groups: {currentUser?.groups.join(", ")}</p>
      {state.map((request, index) => (
        <div
          key={index}
          className=" h-fit bg-white shadow-lg m-3 shadow-slate-600  rounded-md"
        >
          <p className="p-3 text-2xl font-bold">{request.title}</p>
          {request.component()}
        </div>
      ))}
    </div>
  );
};

export default PendingApprovals;
["https://dribbble.com/shots/22691351-Time-Tracker-Web-App-Dashboard-Saas"];

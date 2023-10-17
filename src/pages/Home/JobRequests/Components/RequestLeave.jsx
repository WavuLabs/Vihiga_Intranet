import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { Button, TextField } from "@mui/material";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../APIs/firebase";
import { useOutletContext } from "react-router-dom";

const RequestLeave = ({ handleClose }) => {
  const { uid, currentUser } = useOutletContext();
  const [message, setMessage] = useState("");
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [leaveDates, setLeaveDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
      color: "#901106",
    },
  ]);
  const Ref = doc(db, "groups", currentUser?.groups[0], "leaveRequests", uid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addData();
    handleClose();
  };

  const addData = async () => {
    if (!uid && !currentUser) return;
    const groupObject = {
      uid: uid,
      name: currentUser?.name,
      message: message,
      startDate: leaveDates[0].startDate,
      endDate: leaveDates[0].endDate,
      status: "pending",
    };
    await setDoc(Ref, groupObject, { merge: true });
    alert("Request successfully sent!");
  };

  const leaveStatus = async () => {
    const docSnap = await getDoc(Ref);
    !docSnap.exists() && setApprovalStatus("Does not exist");
    docSnap.exists() && setApprovalStatus(docSnap.data().status);
  };

  useEffect(() => {
    leaveStatus();
  }, [leaveDates]);

  return (
    <>
      {approvalStatus === "Does not exist" ? (
        <form
          onSubmit={handleSubmit}
          className="col p-4 items-center justify-center gap-4 "
        >
          <p className="text-3xl">Select Leave Dates</p>
          <TextField
            label="Message"
            placeholder="Reason for leave"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" w-3/4 mx-10 rounded-sm m-1"
            size="small"
            required
            autoFocus={true}
            autoComplete="off"
          />
          <DateRangePicker
            className=" text-black"
            onChange={(item) => setLeaveDates([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={leaveDates}
            color="red"
            direction="horizontal"
          />
          <br />

          <button className="w-[20vw] border">SUBMIT</button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl">Leave Request Status</p>
          {approvalStatus === "approved" ? (
            <p className="text-3xl text-green">Approved</p>
          ) : approvalStatus === "pending" ? (
            <p className="text-3xl text-primary">Pending</p>
          ) : (
            <div>
              <p className="text-3xl text-red">Rejected</p>
              <p className="text-3xl text-red">Reason: {message}</p>
              <button>Apply Again</button>
            </div>
          )}
          <button className="w-[20vw] border" onClick={handleClose}>
            CLOSE
          </button>
        </div>
      )}
    </>
  );
};

export default RequestLeave;

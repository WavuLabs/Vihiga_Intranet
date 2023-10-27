import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import { Button, TextField } from "@mui/material";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../APIs/firebase";
import { useOutletContext } from "react-router-dom";
import { ContextData } from "../../../../APIs/contexts/Context";

const RequestLeave = ({ handleClose }) => {
  const { serverTime } = ContextData();
  const { uid, currentUser } = useOutletContext();
  const [message, setMessage] = useState("");
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [dateBetweenApplication, setDateBetweenApplication] = useState(null);
  const [leaveDates, setLeaveDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
      color: "#901106",
    },
  ]);
  const Ref = doc(db, "departments", currentUser?.department[0], "leaveRequests", uid);

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
      applicationDate: serverTime,
    };
    await setDoc(Ref, groupObject, { merge: true });
    alert("Request successfully sent!");
  };
  const handleDateRange = (item) => {
    const startDate = new Date(item.applicationDate.seconds * 1000);
    const todaysDate = new Date();
    const dateBetween = differenceInDays(todaysDate, startDate);
    setDateBetweenApplication(dateBetween);
  };

  const leaveStatus = async () => {
    const docSnap = await getDoc(Ref);
    if (docSnap.exists()) {
      setApprovalStatus(docSnap.data().status);
      setApplicationData(docSnap.data());
      handleDateRange(docSnap.data());
    }
  };

  useEffect(() => {
    leaveStatus();
  }, []);

  const handleDisplay = () => {
    switch (approvalStatus) {
      case "approved":
        return <p className="text-3xl text-green">Aproved</p>;
      case "pending":
        return <p className="text-3xl text-primary">Pending</p>;
      case "rejected":
        return (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-3xl text-primary/80">Rejected</p>
            {dateBetweenApplication > 14 ? (
              <div className="cols-center">
                <p className="text-2xl">You can apply again</p>
                <button
                  onClick={() => setApplicationData(null)}
                  className="w-[20vw] border"
                >
                  APPLY
                </button>
              </div>
            ) : (
              <div>
                <p className="text-2xl">
                  You can apply after 14 days of first application
                </p>
                <p className="text-white/50 text-center">
                  Days left : {14 - dateBetweenApplication}
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="col p-4 items-center justify-center space-y-3 w-full h-fit">
      {applicationData === null ? (
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
        <div className="cols-center">
          <p className="text-xl p-3">Application Status</p>
          {handleDisplay()}
        </div>
      )}
    </div>
  );
};

export default RequestLeave;

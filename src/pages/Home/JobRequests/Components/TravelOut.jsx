import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { Button, TextField } from "@mui/material";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../APIs/firebase";
import { useOutletContext } from "react-router-dom";

const TravelOut = ({ handleClose }) => {
  const [destinaion, setDestination] = useState("");
  const { uid, currentUser } = useOutletContext();
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [TravelOutDays, setTravelOutDays] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
      color: "#901106",
    },
  ]);
  const Ref = doc(
    db,
    "groups",
    currentUser?.groups[0],
    "travelOutRequests",
    uid
  );
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
      destination: destinaion,
      startDate: TravelOutDays[0].startDate,
      endDate: TravelOutDays[0].endDate,
      status: "pending",
    };
    await setDoc(Ref, groupObject, { merge: true });
    alert("Request successfully sent!");
  };

  const travelOutStatus = async () => {
    const docSnap = await getDoc(Ref);
    !docSnap.exists() && setApprovalStatus("Does not exist");
    docSnap.exists() && setApprovalStatus(docSnap.data().status);
  };

  useEffect(() => {
    travelOutStatus();
  }, [TravelOutDays]);

  return (
    <>
      {approvalStatus === "Does not exist" ? (
        <form
          onSubmit={handleSubmit}
          className="col p-4 items-center justify-center gap-4 "
        >
          <p className="text-3xl">Select Leave Dates</p>
          <TextField
            label="Destination"
            placeholder="Enter Travel Destinaion"
            value={destinaion}
            onChange={(e) => setDestination(e.target.value)}
            margin="none"
            className="w-full rounded-sm"
            //   size="medium"
            required
            autoFocus={true}
            autoComplete="off"
          />
          <p className="text-xl text-left p-1">Select Travelling dates</p>
          <DateRangePicker
            className=" text-black w-fit h-fit "
            onChange={(item) => setTravelOutDays([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={TravelOutDays}
            color="red"
            direction="horizontal"
          />
          <br />
          <button className="w-[20vw] border">SUBMIT</button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl">Travel Out Status</p>
          {approvalStatus === "approved" ? (
            <p className="text-3xl text-green">Approved</p>
          ) : approvalStatus === "pending" ? (
            <p className="text-3xl text-primary">Pending</p>
          ) : (
            <div>
              <p className="text-3xl text-primary">Rejected</p>
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

export default TravelOut;

import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import { Button, TextField } from "@mui/material";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../APIs/firebase";
import { useOutletContext } from "react-router-dom";
import { ContextData } from "../../../../APIs/contexts/Context";

const TravelOut = ({ handleClose }) => {
  const { serverTime } = ContextData();
  const [destinaion, setDestination] = useState("");
  const { uid, currentUser } = useOutletContext();
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [dateBetweenApplication, setDateBetweenApplication] = useState(null);
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
    `departments/${currentUser?.department}/travelOutRequests/${uid}`
  );

  const handleDateRange = (item) => {
    if (!item) return;
    const startDate = new Date(item.applicationDate.seconds * 1000);
    const todaysDate = new Date();
    const dateBetween = differenceInDays(todaysDate, startDate);
    setDateBetweenApplication(dateBetween);
  };

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
      applicationDate: serverTime,
    };
    await setDoc(Ref, groupObject, { merge: true });
    alert("Request successfully sent!");
  };

  
  const travelOutStatus = async () => {
    const docSnap = await getDoc(Ref);
    if (docSnap.exists()) {
      setApprovalStatus(docSnap.data().status);
      setApplicationData(docSnap.data());
      handleDateRange(docSnap.data());
    }
  };

  useEffect(() => {
    travelOutStatus();
  }, []);

  const handleDisplay = () => {
    if (!applicationData) return;
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
          <p className="text-3xl">Travelling Out</p>
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
        <div className="cols-center">
          <p className="text-xl p-3">Application Status</p>
          {handleDisplay()}
        </div>
      )}
    </div>
  );
};

export default TravelOut;

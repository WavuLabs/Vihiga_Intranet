import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { db } from "../../../../APIs/firebase";
import { ContextData } from "../../../../APIs/contexts/Context";
import { differenceInDays } from "date-fns";

const CarLoans = ({ handleClose }) => {
  const { serverTime } = ContextData();
  const [amount, setAmount] = useState();
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [dateBetweenApplication, setDateBetweenApplication] = useState(null);
  const { uid, currentUser } = useOutletContext();
  const [loanType, setLoanType] = useState("");
  const Ref = doc(
    db,
    `departments/${currentUser?.department}/loanRequests/${uid}`
  );

  const handleDateRange = (item) => {
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
      amount: Number(amount),
      type: loanType,
      status: "pending",
      applicationDate: serverTime,
    };
    await setDoc(Ref, groupObject, { merge: true });
    alert("Request successfully sent!");
  };

  const loanStatus = async () => {
    const docSnap = await getDoc(Ref);

    if (docSnap.exists()) {
      setApprovalStatus(docSnap.data().status);
      setApplicationData(docSnap.data());
      handleDateRange(docSnap.data());
    }
  };

  React.useEffect(() => {
    loanStatus();
  }, []);

  const handleOptionChange = (event) => {
    setLoanType(event.target.value);
  };

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
          className="w-full h-fit col items-center justify-center space-y-3 "
          onSubmit={handleSubmit}
        >
          <p className="text-3xl">Set Loan Amount</p>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Select type of Loan
            </FormLabel>
            <RadioGroup
              className="p-1 px-2"
              value={loanType} 
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="Car Loan"
                control={<Radio />}
                label="Car Loan"
              />
              <FormControlLabel
                value="Mortgage"
                control={<Radio />}
                label="Mortgage"
              />
            </RadioGroup>
          </FormControl>
          <div className="h-[1vh]" />
          <TextField
            label="Amount"
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-1/2 rounded-sm"
            //   size="medium"
            required
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

export default CarLoans;

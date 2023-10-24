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

const CarLoans = ({ handleClose }) => {
  const [amount, setAmount] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const { uid, currentUser } = useOutletContext();
  const [loanType, setLoanType] = useState("");
  const Ref = doc(
    db,
    "departments",
    currentUser?.department[0],
    "loanRequests",
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
      amount: Number(amount),
      type: loanType,
      status: "pending",
    };
    await setDoc(Ref, groupObject, { merge: true });
    alert("Request successfully sent!");
  };

  const loanStatus = async () => {
    const docSnap = await getDoc(Ref);
    !docSnap.exists() && setApprovalStatus("Does not exist");
    docSnap.exists() && setApprovalStatus(docSnap.data().status);
  };

  React.useEffect(() => {
    loanStatus();
  }, []);

  const handleOptionChange = (event) => {
    setLoanType(event.target.value);
  };

  return (
    <div className="col p-4 items-center justify-center space-y-3 w-full h-fit">
      {approvalStatus === "Does not exist" ? (
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
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl">Leave Request Status</p>
          {approvalStatus === "approved" ? (
            <p className="text-3xl text-green">Approved</p>
          ) : approvalStatus === "pending" ? (
            <p className="text-3xl text-primary">Pending</p>
          ) : (
            <p className="text-3xl text-primary">Rejected</p>
          )}
          <button className="w-[20vw] border" onClick={handleClose}>
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
};

export default CarLoans;

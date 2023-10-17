import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  Tab,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useOutletContext } from "react-router-dom";
import { db } from "../../../APIs/firebase";
import { styles } from "../../../constants/Constants";

const CarLoanTable = () => {
  const [data, setData] = useState([]);
  const { uid, currentUser } = useOutletContext();

  const path = `groups/${currentUser?.groups[0]}/loanRequests`;
  const q = query(collection(db, path), orderBy("name", "desc"));
  const [loanRequests, loading, error, snapshot] = useCollectionData(q);

  useEffect(() => {
    // Handle loading state
    if (loading) return;
    
    const filteredData = loanRequests?.filter((item) => {
      return !(item.status === "rejected" || item.status === "approved");
    });

    setData(filteredData);
    console.log(data.length, "dataLength");
    error && console.log(error);
  }, [loading, loanRequests, error]);

  const handdleStatusChange = async (item, status) => {
    const Ref = doc(db, path, item.uid);
    await setDoc(Ref, { ...item, status: status }, { merge: true });
  };

  return (
    <div className="p-3">
      {data.length > 0 ? (
        <TableContainer sx={styles.col}>
          <Table className="p-2 w-3/4 border col-center text-black">
            <TableHead>
              <TableRow className="bg-slate-200">
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <button
                      className="m-2 bg-green"
                      onClick={() => handdleStatusChange(item, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="m-2 bg-primary"
                      onClick={() => handdleStatusChange(item, "rejected")}
                    >
                      Reject
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="text-center">No Pending Approvals</p>
      )}
    </div>
  );
};

export default CarLoanTable;

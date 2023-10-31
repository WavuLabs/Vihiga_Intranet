import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import SelectDepartment from "../../../../components/SelectDepartment";
import { ContextData } from "../../../../APIs/contexts/Context";
import { ProgressIndicator } from "../../../../components/ProgressIndicator";

const AddEvents = () => {
  const { currentUser } = useOutletContext();
  const [event, setEvent] = useState("");
  const [eventName, setEventName] = useState("");
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const { uploadFileToStorageAndFirestore } = ContextData();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!department) {
      alert("Please select a file and department");
      setLoading(false);
      return;
    }
    const eventData = {
      eventName: eventName,
      event: event,
      time: serverTimestamp(),
      uploadedBy: { uid: currentUser.uid, name: currentUser.name, department: currentUser.department[0] },
    };
    const firestorePath = `departments/${department}/news/${eventName}`;
    const storagePath = `forms/${department}/${file}`;

    await uploadFileToStorageAndFirestore(
      file,
      storagePath,
      eventData,
      firestorePath
    );
    setLoading(false);
  };

  return (
    <div className="w-full border p-3 ">
      {loading && (
        <div className="absolute w-full h-full bg-white/40">
          <ProgressIndicator />
        </div>
      )}
      <p className="text-lg text-center">Add Upcoming Event </p>
      <form onSubmit={handleSubmit} className="col">
        {/* News Headline */}
        <p className="text-sm text-gray-500">Event Name</p>
        <TextField
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          multiline
          className="w-[50vw] m-28 "
          margin="normal"
          variant="outlined"
          placeholder="Enter News"
          required
          // size="small"
        />
        <p className="text-sm text-gray-500 m-2">News</p>
        <TextField
          label="Event Details"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          multiline
          className="flex-grow flex-1"
          variant="outlined"
          rows={10}
          placeholder="News Details"
          fullWidth
          required
        />
        {/* select Image */}
        <p className="text-sm text-gray-500 m-2">Select Image (Optional)</p>
        <input
          type="file"
          className="m-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {/* Select Department */}
        <SelectDepartment state={department} setState={setDepartment} />
        <Button
          sx={{ width: "100%", marginTop: "1rem" }}
          variant="outlined"
          type="submit"
        >
          Add Event
        </Button>
      </form>
    </div>
  );
};

export default AddEvents;

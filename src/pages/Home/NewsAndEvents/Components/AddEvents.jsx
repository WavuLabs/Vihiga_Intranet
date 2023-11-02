import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import SelectDepartment from "../../../../components/SelectDepartment";
import { ContextData } from "../../../../APIs/contexts/Context";
import { ProgressIndicator } from "../../../../components/ProgressIndicator";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const AddEvents = () => {
  const { currentUser } = useOutletContext();
  const [eventDetails, setEventDetails] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
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
      eventDetails: eventDetails,
      uploadTime: serverTimestamp(),
      eventTime: { eventStartTime: eventStartTime, eventEndTime: eventEndTime },
      uploadedBy: {
        uid: currentUser.uid,
        name: currentUser.name,
        department: currentUser.department[0],
      },
    };
    const firestorePath = `departments/${department}/events/${eventName}`;
    const storagePath = `forms/${department}/events/${file?.name}`;

    await uploadFileToStorageAndFirestore(
      file,
      storagePath,
      eventData,
      firestorePath
    );
    console.log("Event Added");
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
        <div className="flex flex-row space-x-2">
          <DateTimePicker
            label="Event Start Time"
            defaultValue={dayjs()}
            onChange={(e) => {
              setEventStartTime(new Date(e));
              console.log(new Date(e));
            }}
          />
          <DateTimePicker
            label="Event End Time"
            defaultValue={dayjs()}
            onChange={(e) => setEventEndTime(new Date(e))}
          />
        </div>
        <p className="text-sm text-gray-500 m-2">Event</p>
        <TextField
          label="Event Details"
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
          multiline
          className="flex-grow flex-1"
          variant="outlined"
          rows={10}
          placeholder="Event Details"
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

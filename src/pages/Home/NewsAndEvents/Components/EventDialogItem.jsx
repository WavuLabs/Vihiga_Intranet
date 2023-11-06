import React from "react";
const EventDialogItem = ({ props }) => {
  const { eventsItem } = props;
  const {
    eventName,
    eventDetails,
    uploadedBy,
    eventDay,
    eventStartTime,
    eventEndTime,
  } = eventsItem;
  return (
    <div className="h-[80vh] w-full col p-3">
      <p className="text-center text-3xl px-4 text-primary/70">{eventName}</p>
      <div className="border-b-2 " />
      <div className="col w-full m-2 gap-2">
        <p className="text-xl">
          {eventName} starts on {eventDay}
        </p>
        <p>
          From :{eventStartTime} to: {eventEndTime}
        </p>
      </div>
      <div className="border-b-2 " />
      <div className="flex-1">
        <p className="mt-4"> {eventDetails}</p>
      </div>
      <div className="col w-1/4 m-2 gap-2 self-end">
        <p className="text-xl">Uploaded By</p>
        <p>{uploadedBy.name}</p>
        <p>from {uploadedBy.department}</p>
      </div>
    </div>
  );
};

export default EventDialogItem;

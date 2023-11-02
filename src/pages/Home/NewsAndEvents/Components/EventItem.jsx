import { format } from "date-fns";

const EventItem = (props) => {
  const { event } = props;
  const { eventName, eventDetails, file, uploadedBy, eventTime } = event;
  const eventDay = new Date(eventTime?.eventStartTime?.seconds * 1000);
  const eventStartTime = format(
    new Date(eventTime?.eventStartTime?.seconds * 1000),
    "HH:mm"
  );
  const eventEndTime = format(
    new Date(eventTime?.eventEndTime?.seconds * 1000),
    "HH:mm"
  );

  return (
    <div className="grid grid-cols-4 items-center  w-full p-2">
      <p className="font-mono text-sm">{format(eventDay, "dd MMMM")}</p>
      <div className="col-span-2 mx-2 px-2 ">
        <p className="text-blue-600 text-xl">{eventName}</p>
        <p>
          {eventStartTime} - {eventEndTime}
        </p>
      </div>
      <p className="text-sm rounded-xl h-fit px-3 bg-blue-600/40 text-center">Prority</p>
    </div>
  );
};

export default EventItem;

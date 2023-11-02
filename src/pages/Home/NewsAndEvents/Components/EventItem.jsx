import { format } from "date-fns";

const EventItem = (props) => {
  const { event } = props;
  const { eventName, eventDetails, file, uploadedBy, eventTime } = event;
  const eventStartDate = format(
    new Date(eventTime?.eventStartTime?.seconds * 1000),
    "HH:mm"
  );
  const eventEndDate = format(
    new Date(eventTime?.eventEndTime?.seconds * 1000),
    "HH:mm"
  );
  return (
    <div className="grid grid-cols-4  w-full p-2">
      <p className="font-bold text-sm">{eventName}</p>
      <div className="col-span-2 mx-2 px-2 ">
        <p className="text-blue-600 text-xl">{eventName}</p>
        <p>{eventStartDate} - {eventEndDate}</p>
      </div>
      <p className="text-sm rounded-xl h-fit px-3 bg-blue-600/40 ">Prority</p>
    </div>
  );
};

export default EventItem;

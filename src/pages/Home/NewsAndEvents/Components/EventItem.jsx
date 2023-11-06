import { format } from "date-fns";

const EventItem = ({ props }) => {
  const { event, handleDialog, setEventsItem, setNews } = props;

  const { eventName, eventDetails, file, uploadedBy, eventTime } = event;

  const eventDay = format(
    new Date(eventTime?.eventStartTime?.seconds * 1000),
    "do MMMM"
  );
  const eventStartTime = format(
    new Date(eventTime?.eventStartTime?.seconds * 1000),
    "HH:mm"
  );
  const eventEndTime = format(
    new Date(eventTime?.eventEndTime?.seconds * 1000),
    "HH:mm"
  );
  const handleClick = (e) => {
    e.preventDefault();
    setEventsItem({ ...event, eventDay, eventStartTime, eventEndTime });
    setNews(false);
    handleDialog();
    console.log("clicked");
  };

  return (
    <div
      className="grid grid-cols-4 items-center  w-full p-2 cursor-pointer"
      onClick={handleClick}
    >
      <p className="font-mono text-sm">{eventDay}</p>
      <div className="col-span-2 mx-2 px-2 ">
        <p className="text-blue-600 text-xl">{eventName}</p>
        <p>
          {eventStartTime} - {eventEndTime}
        </p>
      </div>
      <p className="text-sm rounded-xl h-fit px-3 bg-blue-600/40 text-center">
        Prority
      </p>
    </div>
  );
};

export default EventItem;

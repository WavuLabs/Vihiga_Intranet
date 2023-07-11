import { Avatar } from "@mui/material";

export default function MessagesSenderItem(props) {
  const { message } = props;

  const HandleClick = () => {
    // Iterate over the messagesBySender object using Object.entries()
    // Object.entries(messagesBySender).forEach(([sender, messages]) => {
    //   console.log(`Messages from ${sender}:`);
    //   messages.forEach((message) => {
    //     console.log(`- ${message.message}`);
    //   });
    // });
  };

  return (
    <button className="flex flex-row m-1 py-2 w-full " onClick={HandleClick}>
      <Avatar className="m-1">s</Avatar>
      <div className="flex flex-col justify-center items-start m-2 flex-1">
        <p className="text-blue-600 text-sm">{message.senderID.displayName} </p>
        <p className="text-white">{message.message}</p>
      </div>
      <div className="self-end">
        <p className="text-white/50 text-xs p-2 text-right">10.23</p>
      </div>
    </button>
  );
}

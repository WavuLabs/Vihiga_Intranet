import { Avatar, Stack } from "@mui/material";
import React from "react";

const UsersSideBar = (props) => {
  const { name, profile_picture } = props.user;
  return (
    <Stack
      direction="column"
      spacing={0}
      className=" justify-center items-center "
    >
      <Avatar src={profile_picture} alt="User Avatar" />
      <p className="text-white p-3"> {name}</p>
    </Stack>
  );
};

export default UsersSideBar;
[
  {
    is_online: true,
    contacts: "0700000000",
    groups: [],
    name: "Test",
    email: "test@gmail.com",
    profile_picture: "https://avatars.dicebear.com/api/avataaars/your-seed.svg",
  },
];

import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const DropDown = ({ Class, Title, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button className={Class} onClick={handleButtonClick}>
        {Title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClick={handleMenuClose}
      >
        {props.children}
      </Menu>
    </>
  );
};

export default DropDown;

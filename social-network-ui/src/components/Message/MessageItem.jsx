import React from "react";
import PropTypes from "prop-types";
import { Box, Avatar } from "@mui/material";
import AvatarWithoutImg from "../AvatarWithoutImg/AvatarWithoutImg";

function MessageItem({ message }) {
  return (
    <Box>
      <Box>
        {message.createdDate.split("T")[0]}
        {message.user.avatar ? (
          <Avatar
            sx={{
              width: "1rem",
              height: "1rem",
              mb: 1,
            }}
            src={message.user.avatar}
          ></Avatar>
        ) : (
          <Avatar
            sx={{
              width: "1rem",
              height: "1rem",
              bgcolor: "rgb(29, 161, 241)",
              mb: 1,
            }}
            username={message.user.username}
          >
            {" "}
            {message.user.username?.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Box>
      {message.text}
    </Box>
  );
}
MessageItem.propTypes = {
  message: PropTypes.object,
};

export default MessageItem;

import React from "react";
import PropTypes from "prop-types";
import { Box, Avatar } from "@mui/material";
import AvatarWithoutImg from "../AvatarWithoutImg/AvatarWithoutImg";

function MessageItem({ message }) {
  return (
    <Box>
      <Box>
        {message.createdDate}
        {message.user.avatar ? (
          <Avatar
            sx={{
              width: "3rem",
              height: "3rem",
              mb: 1,
            }}
            src={message.user.avatar}
          ></Avatar>
        ) : (
          <AvatarWithoutImg />
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

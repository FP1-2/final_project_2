import React from "react";
import PropTypes from "prop-types";
import { Box, Avatar } from "@mui/material";
import AvatarWithoutImg from "../AvatarWithoutImg/AvatarWithoutImg";

function MessageItem({ message, }) {
  
  return (
    <Box>
      <Box>
   
        {message.createdDate.split('T')[0]}
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
          <AvatarWithoutImg       sx={{
              width: "1rem",
              height: "1rem",
              mb: 1,
            }} userName={message.user.username}> {message.user.username?.charAt(0).toUpperCase()}</AvatarWithoutImg >
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

import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box } from "@mui/material";
// import AvatarWithoutImg from "../AvatarWithoutImg/AvatarWithoutImg";

function ChatMembers({ chatmembers, fetchMessages }) {
  const lastMessage = chatmembers.lastMessage;

  return (
    <>
      {lastMessage && (
        <Box key={chatmembers.id}>
          <Box
            onClick={() => fetchMessages(chatmembers.id)}
            sx={{
              display: "flex",
              cursor: "pointer",
              width: "100%",
              margin: "10px",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Box>
              <Box>
                {lastMessage.user.avatar ? (
                  <Avatar
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      // mb: 1,
                    }}
                    src={lastMessage.user.avatar}
                  ></Avatar>
                ) : (
                  <Avatar
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      bgcolor: "rgb(29, 161, 241)",
                      mb: 1,
                    }}
                    username={lastMessage.user.username}
                  >
                    {" "}
                    {lastMessage.user.username?.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <div>{lastMessage.user.firstName}</div>

                <div>{lastMessage.user.username}</div>
              </Box>

              <div>{lastMessage.text}</div>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
ChatMembers.propTypes = {
  chatmembers: PropTypes.object,
  fetchMessages: PropTypes.func,
};
export default ChatMembers;

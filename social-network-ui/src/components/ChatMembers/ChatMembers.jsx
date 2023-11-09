import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box } from "@mui/material";
// import AvatarWithoutImg from "../AvatarWithoutImg/AvatarWithoutImg";

function ChatMembers({ chatmembers, fetchMessages }) {
  const lastMessage = chatmembers.lastMessage;

  return (
    <>
      {lastMessage && (
        <div>
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
              <div>
                <div>{lastMessage.user.firstName}</div>

                <div>{lastMessage.user.username}</div>
              </div>

              <div>{lastMessage.text}</div>
            </Box>
          </Box>
        </div>
      )}
      {/* {chatmembers.lastMessage.map((lastMessage, index) => ( */}
      {}
      {/* <div >
          <Box
            onClick={() => fetchMessages(chatmembers.id)}
            sx={{
              display: "flex",
              cursor: "pointer",
              width: "100%",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Box>
              {lastMessage.user.avatar ? (
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    mb: 1,
                  }}
                  src={lastMessage.user.avatar}
                ></Avatar>
              ) : (
                <Avatar   sx={{
                    width: "3rem",
                    height: "3rem",
                    mb: 1,
                  }}> {lastMessage.user.username?.charAt(0).toUpperCase()} </Avatar>
              )}
            </Box>

            <Box>{lastMessage.user.firstName}</Box>

            <Box>{lastMessage.user.username}</Box>
            <Box>
              {lastMessage.text}
            </Box>
          </Box>
        </div> */}
      {/* )) */}
      {/* } */}
    </>
  );
}
ChatMembers.propTypes = {
  chatmembers: PropTypes.object,
  fetchMessages: PropTypes.func,
};
export default ChatMembers;

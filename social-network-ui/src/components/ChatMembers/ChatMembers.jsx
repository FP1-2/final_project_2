import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box } from "@mui/material";

function ChatMembers({ chatmembers, fetchMessages }) {
  return (
    <>
      {chatmembers.members.map((member, index) => (
        <div key={index}>
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
              {member.avatar && (
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    mb: 1,
                  }}
                  src={member.avatar}
                ></Avatar>
              )}
            </Box>

            <Box>{member.firstName}</Box>

            <Box>{member.username}</Box>
          </Box>
        </div>
      ))}
    </>
  );
}
ChatMembers.propTypes = {
  chatmembers: PropTypes.object,
  fetchMessages: PropTypes.func,
};
export default ChatMembers;

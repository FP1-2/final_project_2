import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box,Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles'

function ChatMembers({ chatmembers, fetchMessages }) {
  const lastMessage = chatmembers.lastMessage;
	const theme = createTheme({
		typography: {
		p: {
			fontFamily: 'Segoe UI, sans-serif',
		},
		h3: {
			'@media (max-width: 450px)': {
				letterSpacing: '0.2rem',
			},
			'@media (max-width: 350px)': {
				letterSpacing: '0',
			},
		},
	},
	})
  return (
    <>
    <ThemeProvider theme={theme}>
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
                <Box><Typography>{lastMessage.user.firstName} </Typography></Box>

                <Box><Typography>{lastMessage.user.username}</Typography></Box>
              </Box>

              <Box><Typography>{lastMessage.text}</Typography></Box>
            </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>

    </>
  );
}
ChatMembers.propTypes = {
  chatmembers: PropTypes.object,
  fetchMessages: PropTypes.func,
};
export default ChatMembers;

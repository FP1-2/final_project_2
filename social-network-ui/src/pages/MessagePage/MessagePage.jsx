import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button,Typography, } from "@mui/material";
import Chats from "../../components/Chats/Chats";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import styles from "./MessagePage.module.scss";
import Message from "../../components/Message/Message";
import ModalNewChat from "../../components/ModalNewChat/ModalNewChat";
import { openChatModal } from "../../redux/slices/chatSlice";
import { fetchChats } from "../../redux/thunks/chatThunk";
import { ThemeProvider, createTheme } from '@mui/material/styles'
function MessagePage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const isOpen = useSelector((state) => state.chat.modalProps.isOpenChat);
  const userId = useSelector((state) => state.user?.userId);
  const messages = useSelector((state) => state.chat.messages);

  const handleOpenModal = () => {
    dispatch(openChatModal());
  };
  useEffect(() => {
    if (userId) {
      dispatch(fetchChats(userId));
    }
  }, [dispatch, userId]);

  //  const handleSearch = async () => {
  //   try {
  //     const response = await axios.post ('http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/search');
  //     if (response === 200) {
  //       const data = await response.json();
  //       setUser(data);
  //       setErr(false);
  //     } else {
  //       setErr(true);
  //     }
  //   } catch (error) {
  //     setErr(true);
  //   }
  // }
  //  const handleKey = (e) => {
  //     e.target.value === "Enter" && handleSearch()
  //     setChatComponentActive(true)
  //   }
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
    <ThemeProvider theme={theme}>
    <Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={styles.flex}>
            	<Typography
									variant='h2'
									sx={{
										marginBottom: '0.3rem',
										fontWeight: '700',
									}}
								> Messages </Typography>
            {/*<div className={styles.messageIcon}>*/}
              <span>
                {<SettingsOutlinedIcon fontSize="30px" />}{" "}
                {isOpen && <ModalNewChat />}{" "}
              </span>
              <span>
                {<MailOutlinedIcon fontSize="30px" onClick={handleOpenModal} />}
                {isOpen && <ModalNewChat />}{" "}
              </span>
            </div>
          {/*</div>*/}
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Search Direct Messages"
              className={styles.searchInput}
            />
          </div>

        
        </Box>
        <Box
          sx={{
            display: "flex",
           
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "50%",
              margin: "10px",
            }}
          >
            <Chats />
          </Box>
          <Box
            sx={{
              width: "50%",
            }}
          >
            {messages ? (
              <Message />
            ) : (
              <Box sx={{
                height: '100%',
                 fontSize: "1rem",
                fontWeight: 400,
              }}>
                
                  <Box sx={{
                height: '100%',
                display: 'flex',
                    flexDirection: 'column',
                 alignItems: 'center'
              }}>
                    <Typography
                      variant='h5'
                      >

                  Select a message
                    </Typography>
                  <Box>
                    <Typography>
                    Choose from your existing conversations, start a new one, or
                    just keep swimming.
                    </Typography>
                  </Box>
                  {isOpen && <ModalNewChat />}
                  <Button
                    variant="contained"
                    margin="normal"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "1.3rem",
                      padding: "1.1rem 0",
                      borderRadius: "2rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      textTransform: "none",
                      backgroundColor: "#1DA1F2",
                    }}
                    onClick={handleOpenModal}
                    
                  >
                    New message
                  </Button>

                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default MessagePage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, CssBaseline, Button } from "@mui/material";
import Chats from "../../components/Chats/Chats";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import classNames from "classnames";
import styles from "./MessagePage.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message/Message";
import ModalNewChat from "../../components/ModalNewChat/ModalNewChat";
import { openChatModal } from "../../redux/slices/chatSlice";

function MessagePage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const isOpen = useSelector((state) => state.chat.modalProps.isOpenChat);

  const messages = useSelector((state) => state.chat.messages);

  const handleOpenModal = () => {
    dispatch(openChatModal());
  };

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

  return (
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
            <h1> Messages </h1>
            <div className={styles.messageIcon}>
              <span>
                {<SettingsOutlinedIcon fontSize="30px" />}{" "}
                {isOpen && <ModalNewChat />}{" "}
              </span>
              <span>
                {<MailOutlinedIcon fontSize="30px" onClick={handleOpenModal} />}
                {isOpen && <ModalNewChat />}{" "}
              </span>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Search Direct Messages"
              className={styles.searchInput}
            />
          </div>
          <div></div>
          {/* </Box>
        <Box> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            // justifyContent: 'space-between'
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
              <div className={styles.subLeftGrid}>
                <div className={styles.subLeft}>
                  <h2>Select a message </h2>

                  <p>
                    Choose from your existing conversations, start a new one, or
                    just keep swimming.
                  </p>

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
                    className={styles.newMessageBtn}
                  >
                    New message
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MessagePage;

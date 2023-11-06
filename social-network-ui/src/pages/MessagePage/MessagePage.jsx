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

function MessagePage() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const messages = useSelector((state) => state.chat.messages);

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
    <Box sx={{
          // display: 'flex',
        }}>
      <Box
        sx={{
          position: "relative",
          zIndex: 1300,
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className={styles.flex}>
            <h1> Messages </h1>
          <div className={styles.messageIcon}>
                  <span>{<SettingsOutlinedIcon fontSize="30px" />} </span>
                  <span>{<MailOutlinedIcon fontSize="30px" />} </span>
                </div>
          </div>
         <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Search Direct Messages"
                  className={styles.searchInput}
                />
              </div>
        {/* </Box>
        <Box> */}
            
        </Box>
        <Box sx={{
          display: 'flex',
          // justifyContent: 'space-between'
        }}>
 <Box sx={{
  display: 'flex',
  width:'50%',
  margin: '10px'
 }}>
          <Chats/>
        </Box>
        <Box >
          {messages ? (
            
                  <Message  />
             
              ) : (
              <ModalNewChat />)}
        </Box>
        </Box>
       
        {/* <div
          className={classNames({
            ChatActive: isMobile,
            messagesContainer: !isMobile,
          })}
        >
          <div className={classNames(styles.messagesContainer)}>
            <div className={classNames(styles.centerGridContainer)}>
              <header>
                <h1> Messages </h1>
                <div className={styles.messageIcon}>
                  <span>{<SettingsOutlinedIcon fontSize="30px" />} </span>
                  <span>{<MailOutlinedIcon fontSize="30px" />} </span>
                </div>
              </header>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Search Direct Messages"
                  className={styles.searchInput}
                />
              </div>
              {err && <p style={{ marginTop: 20 }}> Error USER NOT FOUND</p>}

              <Chats isMobile={isMobile} setIsMobile={setIsMobile} />
            </div>
            <div className={styles.leftGrid}>
              {messages ? (
                <div>
                  <Message  isMobile={isMobile} setIsMobile={setIsMobile} />
                </div>
              ) : (
                
<ModalNewChat /> */}


                {/* // <div className={styles.subLeftGrid}>
                //   <div className={styles.subLeft}>
                //     <h1>Select a message </h1>

                //     <p>
                //       Choose from your existing conversations, start a new one,
                //       or just keep swimming.
                //     </p>

                //     <Link>
                //       <button className={styles.newMessageBtn}>
                //         New message
                //       </button>
                //     </Link>
                //   </div>
                // </div> */}


              {/* )}
            </div>
          </div>
        </div> */}
      </Box>
    </Box>
  );
}

export default MessagePage;

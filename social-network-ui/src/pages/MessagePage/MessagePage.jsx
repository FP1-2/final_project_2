import React, {useState} from "react";
import Header from "../../components/Header/header";
import { Box, CssBaseline } from "@mui/material";
import Chats from '../../components/Chats/Chats';
import Chat from '../../components/Chat/Chat';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import classNames from 'classnames'
import styles from './MessagePage.module.scss';
import { Link } from "react-router-dom";




function MessagePage() {
   const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const [chatComponentActive, setChatComponentActive] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
  return (
  <Header >
    <Box sx={{
      position: 'relative',
      zIndex: 1300,
    }}>
{/* <div className={classNames[isMobile ? 'ChatActive' : "messagesContainer"]} > */}
<div className={classNames(styles.messagesContainer)} >
   
      <div className={classNames(styles.centerGridContainer)} >
        <header>
          <h1>Messages </h1>
          <div className={styles.messageIcon} >
            <span>{<SettingsOutlinedIcon fontSize='30px' opacity={0.3} />} </span>
            <span>{<MailOutlinedIcon  fontSize='30px' opacity={0.3} />} </span>
          </div>
        </header>
        <div className={styles.inputContainer} >
            <input type='text'  placeholder='Search Direct Messages' className={styles.searchInput} />
        
          </div>
          {err && <p style={{ marginTop: 20}} > Error USER NOT FOUND</p> }
          {user && <div onClick={handleSelect } className={styles.userChat}>
            <div style={{ backgroundImage: `url(${user.avatar})` }} className={styles.profilePic} > </div>
            <div>
              <span>{user?.username} </span>
              <span>{user?.usersAt} </span>
              <span></span>
            </div>
          </div>}
            <Chats />
          </div>
        <div className={styles.leftGrid} >
           {chatComponentActive ? <div ><Chat isMobile={isMobile} setIsMobile={setIsMobile} /></div> :
         
            <div className={styles.subLeftGrid} >
              <div  className={styles.subLeft}>
              <h1>Select a message </h1>
              <p>Choose from your existing conversations, start a new one, or just keep swimming. </p>
                <Link href="" ><button onClick={() => setChatComponentActive(true)} className={styles.newMessageBtn}>New message</button> </Link>
                </div>
            </div>}
        </div>
         
      </div>
    </Box>
    
  </Header>
   
  );
}

export default MessagePage;

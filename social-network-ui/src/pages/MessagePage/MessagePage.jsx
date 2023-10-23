import React, {useState} from "react";
import Header from "../../components/Header/header";
import { Avatar, Box, CssBaseline } from "@mui/material";
import Chats from '../../components/Chats/Chats';
import Chat from '../../components/Chat/Chat';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import classNames from 'classnames'
import styles from './MessagePage.module.scss';
import { Link } from "react-router-dom";
import axios from 'axios';



function MessagePage() {
   const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const [chatComponentActive, setChatComponentActive] = useState(false)
	const [isMobile, setIsMobile] = useState(false)


   const handleSearch = async () => {
    try {
      const response = await axios.get (`http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/user/info/1`);
      if (response === 200) {
        const data = await response.json();
        setUser(data);
        setErr(false);
      } else {
        setErr(true);
      }
    } catch (error) {
      setErr(true);
    }
  }


  const userId = {
	id: 50,
	username: 'Camel_wafas',
	firstName: 'Jack',
	lastName: 'Petrov',
	email: 'asda@gmail.com',
	birthday: '1992-04-04',
	avatar: null,
	address: 'Poltava',
	createdDate: '2023-10-16T10:59:39.842808',
	userDescribe: 'I am a good person',
	userLink: 't.me/adadsa',
	bgProfileImage: null,
	userTweetCount: 55,
	userFollowersCount: 12,
	userFollowingCount: 34,
}

  return (
  <Header >
    <Box sx={{
      position: 'relative',
      zIndex: 1300,
    }}>
<div className={classNames({ ChatActive: isMobile, messagesContainer: !isMobile })}>
<div className={classNames(styles.messagesContainer)} >
   
      <div className={classNames(styles.centerGridContainer)} >
        <header>
          <h1>Messages </h1>
          <div className={styles.messageIcon} >
            <span>{<SettingsOutlinedIcon fontSize='30px' />} </span>
            <span>{<MailOutlinedIcon  fontSize='30px' />} </span>
          </div>
        </header>
        <div className={styles.inputContainer} >
            <input type='text'  placeholder='Search Direct Messages' className={styles.searchInput} />
        
          </div>
          {err && <p style={{ marginTop: 20}} > Error USER NOT FOUND</p> }
          {userId && <div  className={styles.userChat}>
            <div style={{ backgroundImage: `url(${userId.avatar})` }}  >
              <Avatar />
               </div>
            <div>
              <span>{userId.firstName} </span>
              <span>{userId.username} </span>
              <span></span>
            </div>
          </div>}
            <Chats isMobile={isMobile} setIsMobile={setIsMobile} setChatComponentActive={setChatComponentActive}/>
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
      </div>
    </Box>
    
  </Header>
   
  );
}

export default MessagePage;

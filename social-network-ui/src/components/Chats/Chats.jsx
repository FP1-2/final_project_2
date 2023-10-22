import React,{useState} from 'react'
import styles from './Chats.module.scss';
function Chats() {

     const [chats, setChats] = useState([])
  return (
      <div className={styles.chatsContainer}>


      
  <div className={styles.allUsersChat} style={{ cursor: "pointer" }}  onClick={() => {}}>
    <div style={{ backgroundImage: `url: avatar` }} className={styles.profilePic}></div>
    <div className={styles.chatHeadingCon}>
      <h2>.userInfo.username</h2>
      <span>.userInfo?.usersAt</span>
      <p>.lastMessage?.texts?...</p>
    </div>
  </div>

              
    </div>
  )
}

export default Chats
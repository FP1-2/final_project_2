import React,{useState} from 'react'
import styles from './Chats.module.scss';
function Chats() {
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
     const [chats, setChats] = useState([])
  return (
      <div className={styles.chatsContainer}>


      
  <div className={styles.allUsersChat} style={{ cursor: "pointer" }}  onClick={() => {}}>
    <div style={{ backgroundImage: `url: avatar` }} className={styles.profilePic}></div>
    <div className={styles.chatHeadingCon}>
      <h2>{userId.firstName}</h2>
      <span>{userId.avatar}</span>
      <p>.lastMessage?.texts?...</p>
    </div>
  </div>

              
    </div>
  )
}

export default Chats
import React from 'react'
import { Link } from "react-router-dom";
import Message from '../Message/Message';
import styles from './Chat.module.scss'

function Chat() {
  return (
    <div className={styles.chatCon} >
                <div className={styles.subChatCon}>
                    <div className={styles.heading} >
                        <div className={styles.headingDetails}>
          <div className={styles.profileDp} style={{backgroundImage: `url`  }} ></div>
                            <Link href={'/users/' + data.user?.username } ><span className={styles.username}>{data.user?.username}</span></Link>
                        </div>
                       
                    </div>
                    <div className={styles.userObject} >
                        <Link href={'/users/' + userObject?.username } ><div style={{ backgroundImage: `url)` }} className={styles.profilePic}></div></Link>
                        <Link href={'/users/' + userObject?.username} ><h2>{userObject?.username} </h2></Link>
                        <p>{userObject?.usersAt} </p>
                    </div>
                <div  className={styles.mapContainer}>
                       
                        <div   >
                            <Message />
                        </div>
                 
                    </div>
                </div>
                <div className={styles.inputCon}>
                    <div className={styles.inputSpan}>
                    <label htmlFor="fileInputImage" style={{ cursor: "pointer", marginLeft: '10px' }}>
                 
                </label>
                <input type="file"  style={{ display: "none" }} />
                <label htmlFor="fileInputGif" style={{ cursor: "pointer" }}>
               
                </label>
                    <input type="file"  style={{ display: "none" }} />
                   
                        <input typeof="text" placeholder='Start a new message' className={styles.inputTextArea}/>
                      
                            
                           
                    </div>
                    </div>
            </div>
  )
}

export default Chat
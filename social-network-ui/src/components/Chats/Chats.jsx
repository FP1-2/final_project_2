import React,{useState, useEffect} from 'react'
import styles from './Chats.module.scss';
import { useDispatch,useSelector } from 'react-redux';
import getChatMembers from '../../api/getChatMembers'
import getUserData from '../../api/getUserInfo'
import {getMembers} from '../../redux/slices/chatSlice'
import UseUserToken from '../../hooks/useUserToken'
import ChatMembers from '../ChatMembers/ChatMembers';
function Chats() {
//  const {message} = useSelector((state) => state.chat.members)
  const {token} = UseUserToken()
     const [chats, setChats] = useState(null)
      // const dispatch = useDispatch()
       const [error, setError] = useState(null);
	 useEffect(() => {

     async function getChats() {
            try {
              console.log('data');
                const data = await getChatMembers(1,token);
                const chat = {
                  chatId: 1,
                  members: data,

                }
                // setChats( data);
                setChats( chats.push(chat));
                // console.log(chats);
                const data2 = await getChatMembers(2,token);
               const chat2 = {
                  chatId: 2,
                  members: data2,

                }
                setChats( chats.push(chat2));
                console.log(chats);
            } catch (error) {
                if (error.response) {
                    setError(`Error ${error.response?.status}: ${error.response?.data}`)
                }
                if (error.request) {
                    setError('Error: no response')
                }
                setError(`Error: ${error?.message}`)
            }
        }
      console.log('jgjgj');
    
        getChats();
          
    }, []);
		

  return (
      <div className={styles.chatsContainer} >

 <div onClick={() => {}}>
  {chats?.map(chatmembers =>  (<ChatMembers onClick={()=>{}} key={chatmembers.id} chatmembers={chatmembers}/>))}
 </div>

      


              
    </div>
  )
}

export default Chats
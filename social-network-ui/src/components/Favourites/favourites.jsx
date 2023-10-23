import React, {useState, useEffect} from 'react'
import styles from './favourites.module.scss'
import Post from '../Post/post'
import { useSelector } from 'react-redux'
import UseUserToken from '../../hooks/useUserToken'
import getLikedPosts from '../../api/getLikedPosts'
        
function Favourites() {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
    const [favourites, setFavourites] = useState([])
    const [error, setError] = useState(null);
    const { token } = UseUserToken()

    useEffect(() => {
        async function getPosts() {
            try {
                const data = await getLikedPosts(token);
                setFavourites(data);
                console.log(data);
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
        getPosts();
    }, []);

    if (isLoggedIn) {
        return (
            <div className={styles.wrapper}>
                {error ? (<h2>{error}</h2>) :
                favourites.map((post) => <Post key={post.id} post={post} />)}
      </div>)
    }
}

export default Favourites
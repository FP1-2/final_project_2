import React, {useState, useEffect} from 'react'
import styles from './favourites.module.scss'
import Post from '../Post/post'
import UseUserToken from '../../hooks/useUserToken'
import getLikedPosts from '../../api/getLikedPosts'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import getUserId from '../../utils/getUserId'
import ModalComment from '../ModalComment/ModalComment'
        
function Favourites() {
    const isLoggedIn = useIsAuthenticated();
    const userId = getUserId();
    const [favourites, setFavourites] = useState([])
    const [error, setError] = useState(null);
    const { token } = UseUserToken()
    const [commentedPost, setCommentedPost] = useState(null);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        async function getPosts() {
            try {
                const data = await getLikedPosts(token, userId);
                setFavourites(data);
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
                    favourites.reverse().map((post) => <Post key={post.id} post={post} setCommentedPost={setCommentedPost} setOpenModal={setOpenModal}/>)}
                {commentedPost ? <ModalComment post={commentedPost} open={openModal} setOpenModal={setOpenModal} /> : null}
            </div>)
    }
}

export default Favourites
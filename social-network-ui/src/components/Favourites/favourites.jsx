import React, {useState, useEffect} from 'react'
import styles from './favourites.module.scss'
import Post from '../Post/post'
import { useSelector } from 'react-redux'
import axios from 'axios'

// const posts = [{ id: 1, userId: 1, userName: 'John', content: 'text', isLiked: true, likes: 1, isReposted: true, reposts: 1 },
//         { id: 2, userId: 1, userName: 'John', content: 'text2', isLiked: true, likes: 2, reposts: 2 },
//     { id: 3, userId: 2, userName: 'Bob', content: 'text3', isLiked: true, likes: 3, reposts: 3 }]
        
function Favourites() {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
    const [favourites, setFavourites] = useState([])
    const [error, setError] = useState(null);
    useEffect(() => {
        async function getPosts() {
            try {
                const {data} = await axios.get('http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/all-posts', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnbG9yeW9uODdAZ21haWwuY29tIiwicm9sZXMiOiJVU0VSIiwiaXNzIjoiZmluYWxwcm9qZWN0IiwiZXhwIjoxNzAxMjM3NzE5LCJpYXQiOjE2OTc2Mzc3MTksImVtYWlsIjoiZ2xvcnlvbjg3QGdtYWlsLmNvbSIsImp0aSI6IjUxIn0.ziP2FhBhq4ZRSwGoVT_tZcO7jhNoIQ7fozEPHWAGoZs'
          }
        });
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
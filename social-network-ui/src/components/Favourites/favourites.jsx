import React from 'react'
import styles from './favourites.module.scss'
import Post from '../Post/post'

const posts = [{ id: 1, userId: 1, userName: 'John', content: 'text', isLiked: true, likes: 1 },
        { id: 2, userId: 1, userName: 'John', content: 'text2', isLiked: true, likes: 2 },
    { id: 3, userId: 2, userName: 'Bob', content: 'text3', isLiked: true, likes: 3 }]
        
function Favourites() {
  return (
      <div className={styles.wrapper}>
          {posts.map((post) => <Post key={post.id} post={post}/>)}
      </div>
  )
}

export default Favourites
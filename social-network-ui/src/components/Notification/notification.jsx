import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userPosts } from '../../redux/slices/userSlice';
import fetchPosts from './../../redux/thunks/userPostsThunk';

function Notification() {
 const dispatch = useDispatch();
  const posts = useSelector(userPosts);

  useEffect(() => {
    dispatch(fetchPosts()); 
  }, [dispatch]);

  return (
      <>
      {posts.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      </>
  )
}

export default Notification
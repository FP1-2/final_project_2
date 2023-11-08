import React, { useState, useEffect } from 'react';
import getLikedPosts from '../../api/getLikedPosts'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';
import AnotherPost from '../AnotherPost/AnotherPost'

function Favourites () {
  const isLoggedIn = useIsAuthenticated()
  const [favourites, setFavourites] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

  useEffect(() => {
    async function getPosts () {
      try {
        const data = await getLikedPosts()
        setFavourites(data)
        console.log(data);
      } catch (error) {
        if (error.response) {
          setError(`Error ${error.response?.status}: ${error.response?.data}`)
        }
        if (error.request) {
          setError('Error: no response')
        }
        setError(`Error: ${error?.message}`)
      } finally {
        setLoading(false)
      }
    }
    getPosts()
  }, [])

  if (isLoggedIn) {
    return (
      <>
        {loading && (
          <Box sx={style}>
            <CircularProgress />
          </Box>
        )}
        {error ? (
          <h2>{error}</h2>
        ) : (
          favourites
            .reverse()
            .map(post => (
              <AnotherPost
                key={post.id}
                post={post}
              />
            ))
        )}
      </>
    )
  }
}

export default Favourites

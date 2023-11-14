import React, { useState, useEffect } from 'react'
import getLikedPosts from '../../api/getLikedPosts'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import AnotherPost from '../AnotherPost/AnotherPost'
import { style } from '../../styles/circularProgressStyle'
import { useSelector } from 'react-redux'
import UseUserToken from '../../hooks/useUserToken'

function Favourites () {
  const [favourites, setFavourites] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const userId = useSelector(state => state.user.userId)
  const { token } = UseUserToken()
  const size = 10

  useEffect(() => {
    async function getPosts () {
      try {
        setLoading(true)
        const data = await getLikedPosts(token, userId, page, size)
        setFavourites(prev => [...prev, ...data.reverse()])
        setHasMore(data.length > 0)
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

    if (userId && hasMore) {
      getPosts()
    }
  }, [userId, page, hasMore])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight >= scrollHeight - 20) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box sx={{
        maxHeight: '100vh',
        overflowY: 'auto'
      }}>
      {error && <h2>{error}</h2>}

      {!error &&
        favourites.map(post => <AnotherPost key={post.id} post={post} />)}

      <Box sx={style}>
        {loading && <CircularProgress />}
      </Box>
    </Box>
  )
}

export default Favourites

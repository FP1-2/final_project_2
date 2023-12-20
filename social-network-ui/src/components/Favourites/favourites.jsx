import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// components
import AnotherPost from '../AnotherPost/AnotherPost'
// API
import getLikedPosts from '../../api/getLikedPosts'
// hooks
import UseUserToken from '../../hooks/useUserToken'
// other libraries
import { debounce } from 'lodash'
// MUI
import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
// styles
import { style } from '../../styles/circularProgressStyle'

function Favourites () {
  // states
  const [favourites, setFavourites] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  // states for pagination
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  // other hooks
  const userId = useSelector(state => state.user.userId)
  const { token } = UseUserToken()
  const containerRef = useRef()
  const navigate = useNavigate()
  // q-ty of posts on page for pagination
  const size = 5

  // getPosts
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
          // const forbidden =
          //   error.response?.status === 401 || error.response?.status === 403
          // forbidden && navigate('/')
        } else if (error.request) {
          setError('Error: no response')
        } else {
          setError(`Error: ${error?.message}`)
        }
      } finally {
        setLoading(false)
      }
    }

    if (userId && hasMore) {
      getPosts()
    }
  }, [userId, page, hasMore])

  // scroll effect for pagination
  useEffect(() => {
    // focus on main container for button scrolling
    const container = containerRef.current
    container.focus()

    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop
      const windowHeight = container.clientHeight
      const scrollHeight = container.scrollHeight

      if (scrollTop + windowHeight >= scrollHeight - 20) {
        setPage(prev => prev + 1)
      }
    }, 100)

    container.addEventListener('scroll', handleScroll)

    // scroll for pagination with buttons
    const handleKeyDown = event => {
      switch (event.key) {
        case 'PageDown':
          container.scrollTop += container.clientHeight
          break
        case 'PageUp':
          container.scrollTop -= container.clientHeight
          break
        case 'Home':
          container.scrollTop = 0
          break
        case 'End':
          container.scrollTop = container.scrollHeight
          break
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflowY: 'auto',
        outline: 'none',
        '&::-webkit-scrollbar': {
          width: '0'
        }
      }}
      ref={containerRef}
      tabIndex={0}
    >
      {error && <h2>{error}</h2>}

      {!error &&
        favourites.map(post => <AnotherPost key={post.id} post={post} />)}

      <Box sx={style}>
        {loading && <CircularProgress />}
        {!hasMore && (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '36px',
              color: 'gray',
              opacity: 0.5
            }}
          >
            No More Favourites
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Favourites

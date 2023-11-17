import React, { useState, useEffect, useRef } from 'react'
import getLikedPosts from '../../api/getLikedPosts'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import AnotherPost from '../AnotherPost/AnotherPost'
import { style } from '../../styles/circularProgressStyle'
import { useSelector } from 'react-redux'
import UseUserToken from '../../hooks/useUserToken'
import { debounce } from 'lodash'

function Favourites () {
  const [favourites, setFavourites] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const userId = useSelector(state => state.user.userId)
  const { token } = UseUserToken()
  const size = 5
  const containerRef = useRef()

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

      <Box sx={style}>{loading && <CircularProgress />}</Box>
    </Box>
  )
}

export default Favourites

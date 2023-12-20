import React, { useState, useEffect, useRef } from 'react'
// other libraries
import { debounce } from 'lodash'
// components
import TwitterWriteWindow from '../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow'
import PostWrapper from '../../components/HomePage/PostWrapper/PostWrapper'
// hooks
import UseUserToken from '../../hooks/useUserToken'
// api
import getAllPosts from './../../api/getAllPosts'
import getFollowingsPosts from './../../api/getFollowingsPosts'
// MUI
import { Button, Typography, Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
// styles
import { style } from '../../styles/circularProgressStyle'

const Home = () => {
  // states
  const [tweetPosts, setTweetPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAllPosts, setShowAllPosts] = useState(false)
  // states for pagination
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  // q-ty of posts on page for pagination
  const size = 5
  // other hooks
  const { token } = UseUserToken()
  const containerRef = useRef()
  // ref main container for button scrolling
  const container = containerRef.current

  // tabs selection AllPosts / Following
  const handleAllPosts = () => {
    !showAllPosts && setTweetPost([])
    setHasMore(true)
    setPage(0)
    setShowAllPosts(true)
    container.scrollTo(0, 0)
  }

  const handleFollowing = () => {
    showAllPosts && setTweetPost([])
    setHasMore(true)
    setPage(0)
    setShowAllPosts(false)
    container.scrollTo(0, 0)
  }

  // getPosts
  useEffect(() => {
    async function getPosts () {
      try {
        setError(null)
        setLoading(true)
        let data
        showAllPosts
          ? (data = await getAllPosts(token, page, size))
          : (data = await getFollowingsPosts(token, page, size))
        setTweetPost(prev => [...prev, ...data])
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
    hasMore && getPosts()
  }, [page, showAllPosts])

  // scroll effect for pagination
  useEffect(() => {
    // focus for button scrolling
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
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'RGBA(255, 255, 255, .95)',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}
      >
        <Button
          sx={{
            width: '100%',
            minHeight: '3.5rem',
            fontSize: '1rem',
            color: !showAllPosts ? 'grey' : null
          }}
          onClick={handleAllPosts}
        >
          <Typography
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              textTransform: 'capitalize',
              borderBottom: showAllPosts ? 'solid' : null
            }}
          >
            All posts
          </Typography>
        </Button>
        <Button
          sx={{
            width: '100%',
            minHeight: '3.5rem',
            fontSize: '1rem',
            textTransform: 'capitalize',
            color: showAllPosts ? 'grey' : null
          }}
          onClick={handleFollowing}
        >
          <Typography
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              borderBottom: !showAllPosts ? 'solid' : null
            }}
          >
            Following
          </Typography>
        </Button>
      </Box>
      <TwitterWriteWindow setTweetPost={setTweetPost} tweetPosts={tweetPosts} />
      {error && <h2>{error}</h2>}
      {!error && <PostWrapper tweets={tweetPosts} />}
      {loading && (
        <Box sx={style}>
          <CircularProgress />
        </Box>
      )}
      {!hasMore && (
        <Box sx={{textAlign: 'center'}}>
          {' '}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '36px',
              color: 'gray',
              opacity: 0.5
            }}
          >
            No More Posts
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Home

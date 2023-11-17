import React, { useState, useEffect, useRef } from 'react'
import TwitterWriteWindow from '../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow'
import PostWrapper from '../../components/HomePage/PostWrapper/PostWrapper'
import UseUserToken from '../../hooks/useUserToken'
import getAllPosts from './../../api/getAllPosts'
import getFollowingsPosts from './../../api/getFollowingsPosts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { style } from '../../styles/circularProgressStyle'
import { Button, Typography } from '@mui/material'
import { debounce } from 'lodash'

const Home = () => {
  const [tweetPosts, setTweetPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAllPosts, setShowAllPosts] = useState(false)
  // states for pagination
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  // q-ty of posts on page for pagination
  const size = 5

  const { token } = UseUserToken()
  const containerRef = useRef()
  const container = containerRef.current

  console.log(page)

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
    </Box>
  )
}

export default Home

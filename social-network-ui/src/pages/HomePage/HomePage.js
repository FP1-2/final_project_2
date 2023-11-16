import React, { useState, useEffect, useRef } from 'react'
import TwitterWriteWindow from '../../components/HomePage/TwitterWriteWindow/TwitterWriteWindow'
import PostWrapper from '../../components/HomePage/PostWrapper/PostWrapper'
import UseUserToken from '../../hooks/useUserToken'
import { useSelector } from 'react-redux'
import getAllPosts from './../../api/getAllPosts'
import getFollowingsPosts from './../../api/getFollowingsPosts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { style } from '../../styles/circularProgressStyle'
import { Button } from '@mui/material'

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
  const userData = useSelector(state => state.user.userData)
  const containerRef = useRef()

  const handleAllPosts = () => {
    !showAllPosts && setTweetPost([])
    setPage(0)
    setShowAllPosts(true)
  }

  const handleFollowing = () => {
    showAllPosts && setTweetPost([])
    setPage(0)
    setShowAllPosts(false)
  }

  useEffect(() => {
    async function getPosts () {
      console.log('effect')
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
  }, [page, hasMore, showAllPosts])

  useEffect(() => {
    const container = containerRef.current
    container.focus()

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const windowHeight = container.clientHeight
      const scrollHeight = container.scrollHeight

      if (scrollTop + windowHeight >= scrollHeight - 20) {
        setPage(prev => prev + 1)
      }
    }

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

  const userPhoto = userData ? userData.avatar : ''
  const firstName = userData ? userData.firstName : ''
  const lastName = userData ? userData.lastName : ''

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflowY: 'auto',
        outline: 'none'
      }}
      ref={containerRef}
      tabIndex={0}
    >
      <Box sx={{ display: 'flex' }}>
        <Button
          sx={{ width: '100%', color: !showAllPosts ? 'grey' : null }}
          onClick={handleAllPosts}
        >
          All posts
        </Button>
        <Button
          sx={{ width: '100%', color: showAllPosts ? 'grey' : null }}
          onClick={handleFollowing}
        >
          Following
        </Button>
      </Box>
      <TwitterWriteWindow
        setTweetPost={setTweetPost}
        tweetPosts={tweetPosts}
        userPhoto={userPhoto}
        firstName={firstName}
        lastName={lastName}
        token={token}
      />
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

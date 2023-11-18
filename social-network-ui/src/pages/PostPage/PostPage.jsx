import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
// components
import AnotherPost from '../../components/AnotherPost/AnotherPost'
// api
import getPost from '../../api/getPost'
import getComments from '../../api/getComments'
// hooks
import UseUserToken from '../../hooks/useUserToken'
// MUI
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
// styles
import { style } from '../../styles/circularProgressStyle'

function PostPage () {
  // states
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const [originalPost, setOriginalPost] = useState(null)
  const [comments, setComments] = useState([])
  const [deletedCommentsCount, setDeletedCommentsCount] = useState(0) // to update comments count on original post after deleting users comment
  const [isComment, setIsComment] = useState(false) // is this post a comment
  const [page, setPage] = useState(0) //for pagination
  // other hooks
  const params = useParams()
  const bottomRef = useRef()
  const containerRef = useRef()
  const { token } = UseUserToken()

  // comments per page
  const size = 5
  const moreComments = post?.countComments > comments.length

  // cleanup
  useEffect(() => {
    setComments([])
    setPage(0)
  }, [params.postId])

  // fetchOriginalPost
  useEffect(() => {
    async function fetchOriginalPost () {
      setLoading(true)
      try {
        let data
        post?.originalPost
          ? (data = await getPost(post.originalPost.id, token))
          : null
        setOriginalPost(data)
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
    isComment && fetchOriginalPost()
    return setOriginalPost(null)
  }, [post?.originalPost])

  // fetchPost
  useEffect(() => {
    async function fetchPost () {
      setLoading(true)
      try {
        const data = await getPost(params.postId, token)
        setPost(data)
        data.typePost === 'COMMENT' ? setIsComment(true) : setIsComment(false)
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
    fetchPost()
    return setPost(null)
  }, [params.postId])

  // fetchComments
  useEffect(() => {
    async function fetchComments () {
      try {
        setLoading(true)
        const commentsData = await getComments(params.postId, token, page, size)
        setComments(prev => [...prev, ...commentsData])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [params.postId, page])

  // scroll to post
  useEffect(() => {
    if (isComment) {
      const bottom = bottomRef.current
      setTimeout(() => {
        bottom.scrollIntoView({ behavior: 'smooth' })
      }, 1000)
      return setIsComment(false)
    }
  }, [params.postId, isComment])

  // focus on main container for scrolling with buttons
  useEffect(() => {
    let container = containerRef.current
    container?.focus()
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

      {post && (
        <>
          {originalPost && (
            <AnotherPost
              post={originalPost}
              deletedCommentsCount={deletedCommentsCount}
            />
          )}
          <AnotherPost
            post={post}
            setComments={setComments}
            hasCommentWriteWindow={true}
            deletedCommentsCount={deletedCommentsCount}
          />
        </>
      )}
      <div ref={bottomRef}></div>
      {comments.length > 0 &&
        comments.map(post => (
          <AnotherPost
            key={post.id}
            post={post}
            setDeletedCommentsCount={setDeletedCommentsCount}
          />
        ))}

      <Box sx={style}>
        {loading && <CircularProgress />}
        {!error && !loading && moreComments && (
          <Button onClick={() => setPage(prev => prev + 1)}>
            Show more comments
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default PostPage

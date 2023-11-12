import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import AnotherPost from '../../components/AnotherPost/AnotherPost'
import getPost from '../../api/getPost'
import getComments from '../../api/getComments'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { style } from '../../styles/circularProgressStyle'
import UseUserToken from '../../hooks/useUserToken'
import { Button } from '@mui/material'

function PostPage () {
  const params = useParams()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [deletedCommentsCount, setDeletedCommentsCount] = useState(0)
  const [isComment, setIsComment] = useState(false)
  const bottomRef = useRef()
  const { token } = UseUserToken()
  // comments page
  const [page, setPage] = useState(0)
  // comments per page
  const size = 5
  const moreComments = post?.countComments > comments.length

  useEffect(() => {
    async function fetchPost () {
      setLoading(true)
      try {
        const data = await getPost(params.postId, token)
        setPost(data)
        console.log(post);
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
  }, [params.postId])

  useEffect(() => {
    async function fetchComments () {
      try {
        const commentsData = await getComments(params.postId, token, page, size)
        console.log(commentsData);
        setComments((prev) => [...prev, ...commentsData])
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [params.postId, page])

  useEffect(() => {
    isComment && bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
  })

          console.log(comments);

  return (
    <>
      {loading && (
        <Box sx={style}>
          <CircularProgress />
        </Box>
      )}

      {error && <h2>{error}</h2>}

      {!error && !loading && (
        <>
          {isComment && (
            <AnotherPost
              post={post.originalPost}
              deletedCommentsCount={deletedCommentsCount}
            />
          )}
          <AnotherPost
            post={post}
            setComments={setComments}
            hasCommentWriteWindow={true}
            deletedCommentsCount={deletedCommentsCount}
          />
          <div ref={bottomRef}></div>
        </>
      )}
      {!error &&
        !loading &&
        comments.map(post => (
          <AnotherPost
            key={post.id}
            post={post}
            setDeletedCommentsCount={setDeletedCommentsCount}
          />
        ))}
      {!error && !loading && moreComments && (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={() => setPage((prev) => prev + 1)}>Show more comments</Button>
          </Box>
      )}
    </>
  )
}

export default PostPage

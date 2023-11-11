import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AnotherPost from '../../components/AnotherPost/AnotherPost'
import getPost from '../../api/getPost'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { style } from '../../styles/circularProgressStyle'

function PostPage () {
  const params = useParams()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [deletedCommentsCount, setDeletedCommentsCount] = useState(0)

  console.log(comments)

  useEffect(() => {
      async function fetchPost() {
        setLoading(true)
      try {
        const data = await getPost(params.postId)
          setPost(data)
          console.log(data);
        setComments(data.comments)
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
  }, [params])

  return (
    <>
      {loading && (
        <Box sx={style}>
          <CircularProgress />
        </Box>
      )}

      {error && <h2>{error}</h2>}

      {!error && !loading && (
        <AnotherPost
          post={post}
          setComments={setComments}
          hasCommentWriteWindow={true}
          deletedCommentsCount={deletedCommentsCount}
        />
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
    </>
  )
}

export default PostPage

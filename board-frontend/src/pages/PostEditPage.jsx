import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import { getBoardById, editBoard } from '../features/boardSlice'
import PostEdit from '../components/post/PostEdit'

const PostEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { currentBoard } = useSelector((state) => state.board)

   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [image, setImage] = useState(null)
   const [preview, setPreview] = useState(null)

   useEffect(() => {
      dispatch(getBoardById(id))
   }, [dispatch, id])

   useEffect(() => {
      if (currentBoard) {
         setTitle(currentBoard.title)
         setContent(currentBoard.content)
         setPreview(null) // 기존 이미지도 보여줄 거라 여기선 초기화만
      }
   }, [currentBoard])

   const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) formData.append('image', image)

      try {
         await dispatch(editBoard({ id, formData })).unwrap()
         alert('게시글이 수정되었습니다.')
         navigate('/')
      } catch (error) {
         console.error('게시글 수정 실패:', error)
         alert('게시글 수정 중 오류가 발생했습니다.')
      }
   }

   const currentImageUrl = currentBoard?.img
      ? `${import.meta.env.VITE_APP_API_URL}/uploads/${currentBoard.img}`
      : null

   return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
         <PostEdit
            handleSubmit={handleSubmit}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            image={image}
            setImage={setImage}
            preview={preview}
            setPreview={setPreview}
            currentImageUrl={currentImageUrl} // 전달
         />
      </Container>
   )
}

export default PostEditPage

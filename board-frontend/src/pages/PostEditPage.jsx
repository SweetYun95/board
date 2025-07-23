import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'

import PostEdit from '../components/post/PostEdit'
import { getBoardById, editBoard } from '../features/boardSlice'

const PostEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const currentBoard = useSelector((state) => state.board.currentBoard)

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

         // 기존 이미지 미리보기 설정
         if (currentBoard.img) {
            const imageUrl = `${import.meta.env.VITE_APP_API_URL}/uploads/${currentBoard.img}`
            setPreview(imageUrl)
         }
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

   return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
         <PostEdit handleSubmit={handleSubmit} title={title} setTitle={setTitle} content={content} setContent={setContent} image={image} setImage={setImage} preview={preview} setPreview={setPreview} />
      </Container>
   )
}

export default PostEditPage

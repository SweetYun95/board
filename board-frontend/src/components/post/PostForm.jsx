import { TextField, Button, Box, Typography, Stack, Paper } from '@mui/material'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addBoard } from '../../features/boardSlice'

const PostForm = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [image, setImage] = useState(null)
   const [preview, setPreview] = useState(null)

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      setImage(file)
      if (file) {
         setPreview(URL.createObjectURL(file)) // 이미지 미리보기 주소 생성
      } else {
         setPreview(null)
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) formData.append('image', image)

      dispatch(addBoard(formData))
         .unwrap()
         .then(() => {
            navigate('/') // 글 작성 성공 후 홈으로 이동
         })
         .catch((error) => {
            alert('글 작성 실패: ' + error.message)
         })

      setTitle('')
      setContent('')
      setImage(null)
      setPreview(null)
   }

   return (
      <Paper elevation={3} sx={{ p: 3 }}>
         <Typography variant="h6" gutterBottom>
            게시글 작성
         </Typography>
         <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack spacing={2}>
               <TextField label="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
               <TextField label="내용" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
               <Button variant="contained" component="label">
                  이미지 업로드
                  <input type="file" name="image" hidden accept="image/*" onChange={handleImageChange} />
               </Button>
               {preview && (
                  <Box sx={{ mt: 2 }}>
                     <img src={preview} alt="미리보기" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 8 }} />
                  </Box>
               )}
               <Button type="submit" variant="contained" color="primary">
                  등록
               </Button>
            </Stack>
         </Box>
      </Paper>
   )
}

export default PostForm
